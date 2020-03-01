var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
// TypeScript file
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this._gameScene = new egret.Sprite();
        _this.grid = Grid.Shared();
        _this.toolBar = new egret.TextField();
        _this.modeText = new egret.TextField();
        _this.isEnd = false;
        _this._gameMode = false; //默认扫雷模式
        _this._signCount = 0; //标记数目
        return _this;
    }
    GameScene.Shared = function () {
        if (GameScene.shared == null) {
            GameScene.shared = new GameScene();
        }
        return GameScene.shared;
    };
    //游戏入口
    GameScene.prototype.init = function () {
        this.isEnd = false;
        this._gameMode = false;
        this._signCount = 0;
        this.grid.mineField = []; //地雷地图
        this.grid.signArray = []; //标记地图
        this.grid.initData();
        this.addChild(this._gameScene);
        this.toolBar.width = this.modeText.width = 200;
        this.toolBar.bold = this.modeText.bold = true;
        this.toolBar.x = this.modeText.x = Config.getStageWidth() / 2 - 100;
        this.modeText.y = Config.getStageHeight() - 200;
        this.toolBar.y = Config.getStageHeight() - 100;
        this.toolBar.text = '游戏进行中';
        this.modeText.text = "扫雷模式";
        this.addChild(this.toolBar);
        this.addChild(this.modeText);
        this.createButton();
        this.createMap();
    };
    GameScene.prototype.createButton = function () {
        var btn_mode = new egret.Sprite();
        btn_mode.graphics.beginFill(0x218868);
        btn_mode.graphics.drawRect(0, 0, 200, 50);
        btn_mode.x = Config.getStageWidth() / 2 - 125;
        btn_mode.y = Config.getStageHeight() - 160;
        var btn_mode_msg = new egret.TextField();
        btn_mode_msg.text = "点击切换模式";
        btn_mode_msg.x = btn_mode_msg.y = 10;
        btn_mode.addChild(btn_mode_msg);
        this.addChild(btn_mode);
        btn_mode.touchEnabled = true;
        btn_mode.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeMode, this);
        var btn_replay = new egret.Sprite();
        btn_replay.graphics.beginFill(0x218868);
        btn_replay.graphics.drawRect(0, 0, 200, 50);
        btn_replay.x = Config.getStageWidth() / 2 - 125;
        btn_replay.y = Config.getStageHeight() - 60;
        var btn_replay_msg = new egret.TextField();
        btn_replay_msg.text = "点击重新开始";
        btn_replay_msg.x = btn_replay_msg.y = 10;
        btn_replay.addChild(btn_replay_msg);
        this.addChild(btn_replay);
        btn_replay.touchEnabled = true;
        btn_replay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.replay, this);
    };
    //更改当前游戏模式
    GameScene.prototype.changeMode = function () {
        this._gameMode = !this._gameMode;
        if (this._gameMode) {
            this.modeText.text = "标记模式";
        }
        else {
            this.modeText.text = "扫雷模式";
        }
    };
    GameScene.prototype.createMap = function () {
        var tile;
        for (var i = 0; i < Config.row; i++) {
            for (var j = 0; j < Config.column; j++) {
                tile = new egret.Bitmap();
                tile.texture = RES.getRes('0_png');
                tile.width = tile.height = this.grid.gridRect;
                tile.x = j * this.grid.gridRect;
                tile.y = i * this.grid.gridRect;
                tile.name = "tile_" + i + "_" + j;
                tile.$touchEnabled = true;
                tile.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTileTouch, this);
                this._gameScene.addChild(tile);
            }
        }
    };
    GameScene.prototype.onTileTouch = function (event) {
        if (!this.isEnd) {
            var tile = event.target;
            var tileName = tile.name.split("_");
            var row = Number(tileName[1]);
            var col = Number(tileName[2]);
            var val = this.grid.mineField[row][col];
            var idx = +("" + (row + '') + (col + ''));
            if (this._gameMode) {
                if (!this.grid.checkSign(row, col)) {
                    if (this._signCount <= this.grid.mines) {
                        tile.texture = RES.getRes('flag_png');
                        // this.grid.signArray.push([row,col]);
                        this.grid.signArray[idx] = [row, col];
                        this._signCount++;
                        if (this.isWin()) {
                            this.isEnd = true;
                            this.toolBar.text = "清除完毕，游戏结束！";
                            alert('清除完毕，游戏结束！');
                        }
                    }
                    else {
                        alert('标记已经达到上限!');
                    }
                }
                else {
                    this._signCount--;
                    tile.texture = RES.getRes('0_png');
                    this.grid.signArray[idx] = undefined;
                }
            }
            else {
                if (!this.grid.checkSign(row, col)) {
                    if (val == 0) {
                        this.fioodFill(row, col);
                    }
                    else if (val < 9) {
                        tile.texture = RES.getRes(val + "_png");
                    }
                    else if (val == 9) {
                        tile.texture = RES.getRes("bomb_png");
                        this.toolBar.text = '游戏失败';
                        this.isEnd = true;
                        alert('扫雷失败，游戏结束！');
                    }
                }
                else {
                    alert('该位置已经被标记过啦,点击取消标记！');
                }
            }
        }
    };
    GameScene.prototype.fioodFill = function (row, col) {
        var tile = this._gameScene.getChildByName("tile_" + row + "_" + col);
        tile.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTileTouch, this);
        tile.touchEnabled = false;
        tile.texture = RES.getRes("fail_png");
        this.grid.mineField[row][col] = -1;
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if ((i != 0 || j != 0) && (i == 0 || j == 0)) {
                    if (this.grid.tileValue(row + i, col + j) == 0) {
                        this.fioodFill(row + i, col + j);
                    }
                }
            }
        }
    };
    GameScene.prototype.isWin = function () {
        var num = 0;
        for (var i = 0; i < this.grid.signArray.length; i++) {
            var sign = this.grid.signArray[i];
            if (sign != undefined && this.grid.mineField[sign[0]][sign[1]] == 9) {
                num += 9;
            }
        }
        console.log("\u5F53\u524D\u5F97\u5206=" + num);
        if (num == this.grid.mines * 9) {
            return true;
        }
        else {
            return false;
        }
    };
    GameScene.prototype.replay = function () {
        var root = this.parent;
        root.removeChild(GameScene.Shared());
        GameScene.shared = null;
        root.addChild(GameScene.Shared());
        GameScene.Shared().init();
    };
    return GameScene;
}(egret.Sprite));
__reflect(GameScene.prototype, "GameScene");
