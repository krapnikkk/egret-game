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
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this.timer = new egret.Timer(1000 / 10);
        _this.list = [];
        _this.currentframe = 0;
        _this.shotTime = 500;
        for (var i = 1; i < 3; i++) {
            var bitmap = new egret.Bitmap();
            bitmap.texture = RES.getRes("hero" + (i + '') + "_png");
            _this.list.push(bitmap);
            _this.addChild(bitmap);
            bitmap.visible = false;
        }
        _this.list[0].visible = true;
        _this.currentframe = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    //TimerEvent制作帧动画
    Player.prototype.enterFrameHandler = function (e) {
        this.list[this.currentframe].visible = false;
        this.currentframe < this.list.length - 1 ? this.currentframe += 1 : this.currentframe = 0;
        this.list[this.currentframe].visible = true;
    };
    Player.prototype.move = function (x, y) {
        if (x >= Util.getStageWidth() - this.width / 2) {
            this.x = Util.getStageWidth() - this.width / 2;
        }
        else if (x <= this.width / 2) {
            this.x = this.width / 2;
        }
        else {
            this.x = x;
        }
        if (y >= Util.getStageHeight() - this.height / 2) {
            this.y = Util.getStageHeight() - this.height / 2;
        }
        else if (y <= this.height / 2) {
            this.y = this.height / 2;
        }
        else {
            this.y = y;
        }
    };
    Player.prototype.onAddToStage = function () {
        var _this = this;
        //创建系列动画
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.enterFrameHandler, this);
        this.timer.start();
        //发射子弹
        this.shot = new Shot(Shot.EventString);
        this.shot.bulletType = IdentityType.PLAYER;
        this.addEventListener(Shot.EventString, function (e) {
            var bullet = BulletFactory.Shared().getBullet();
            if (bullet == undefined) {
                console.log("对象池中没有对象");
                return;
            }
            var x = _this.x - 5;
            var y = _this.y - _this.height / 2 - 18;
            bullet.createBullet(e.bulletType, x, y);
        }, this);
        this.shotTimer = new egret.Timer(this.shotTime);
        this.shotTimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.shotTimer.addEventListener(egret.TimerEvent.COMPLETE, function () { }, this);
        this.shotTimer.start();
    };
    Player.prototype.timerFunc = function (e) {
        this.dispatchEvent(this.shot);
    };
    return Player;
}(egret.Sprite));
__reflect(Player.prototype, "Player");
