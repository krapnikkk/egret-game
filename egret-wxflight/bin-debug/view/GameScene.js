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
        /**控制滚动速度*/
        _this.speed = 6;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.Init, _this);
        return _this;
    }
    GameScene.prototype.Init = function () {
        //背景图
        this.textureHeight = Util.getStageHeight(); //保留原始纹理的高度，用于后续的计算
        this.rowCount = Math.ceil(Util.getStageHeight() / this.textureHeight) + 1; //计算在当前屏幕中，需要的图片数量
        this.bgArr = [];
        //创建这些图片，并设置y坐标，让它们连接起来
        var bg = RES.getRes("background_png");
        for (var i = 0; i < this.rowCount; i++) {
            var bgBitmap = new egret.Bitmap(bg);
            bgBitmap.width = Util.getStageWidth();
            bgBitmap.height = Util.getStageHeight();
            bgBitmap.y = this.textureHeight * i - (this.textureHeight * this.rowCount - Util.getStageHeight());
            this.bgArr.push(bgBitmap);
            this.addChild(bgBitmap);
        }
        this.start();
        //开始按钮
        this.btn_start = new egret.Bitmap();
        this.btn_start.texture = RES.getRes('btn_start_png');
        Util.centerPoint(this.btn_start, 0, -200, false);
        this.addChild(this.btn_start);
        this.btn_start.touchEnabled = true;
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
        //标题
        this.title = new egret.Bitmap();
        this.title.texture = RES.getRes('shoot_copyright_png');
        Util.centerPoint(this.title, 0, 200, true);
        Util.setAnchorCenter(this.title, 0, 0);
        this.addChild(this.title);
        egret.Tween.get(this.title, { loop: true }).to({ scaleX: 1.2, scaleY: 1.2 }, 2000, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, 2000, egret.Ease.sineIn);
    };
    //创建bitmap
    GameScene.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**逐帧运动*/
    GameScene.prototype.enterFrameHandler = function (event) {
        for (var i = 0; i < this.rowCount; i++) {
            var bgBitmap = this.bgArr[i];
            bgBitmap.y += this.speed;
            //判断超出屏幕后，回到队首，这样来实现循环反复
            if (bgBitmap.y > Util.getStageHeight()) {
                bgBitmap.y = this.bgArr[0].y - this.textureHeight;
                this.bgArr.pop();
                //把一个元素添加到数组的开头，并返回数组的新长度
                this.bgArr.unshift(bgBitmap);
            }
        }
    };
    /**开始滚动*/
    GameScene.prototype.start = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    GameScene.prototype.onStart = function (e) {
        var _this = this;
        this.removeChild(e.target);
        this.removeChild(this.title);
        //创造主机
        this.createPlayer();
        //创建子弹池单例
        this.bulletFactory = BulletFactory.Shared();
        this.bulletFactory.initPool(this);
        //创建敌机
        this.enemyFactory = EnemyFactory.Shared();
        this.enemyFactory.initPool(this);
        this.addEventListener(egret.Event.ENTER_FRAME, function (e) {
            //判断Enemy子弹是否和主角碰撞,碰撞则改变自身的事件
            var isHit = _this.bulletFactory.isHit(_this.player);
            //判断Enemy是否和主角碰撞
        }, this);
        this.bulletFactory.addEventListener(Hit.EventString, function (e) {
            // console.log("子弹碰撞事件触发：" + e.hitType)
            if (e.hitType == HitType.ENEMY_TO_PLAYER) {
                //Hero被击中
            }
            if (e.hitType == HitType.PLAYER_TO_ENEMY) {
                //Enemy被击中
                // this._Score += 1;
                // console.log("当前分数:" + this._Score);
            }
        }, this);
    };
    //创建飞机
    GameScene.prototype.createPlayer = function () {
        this.player = new Player();
        Util.setAnchorCenter(this.player, 0, 0);
        Util.centerPoint(this.player, 0, 0, true);
        this.addChild(this.player);
        this.player.touchEnabled = true;
        this.player.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onPlayerTouch, this);
    };
    GameScene.prototype.onPlayerTouch = function (e) {
        this.player.move(e.stageX, e.stageY);
    };
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene");
