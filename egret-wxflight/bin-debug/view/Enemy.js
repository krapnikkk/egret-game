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
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(root, type) {
        var _this = _super.call(this) || this;
        _this.speed = 5;
        _this.isUse = false;
        _this.shotTime = 500;
        _this.hitCount = 0;
        _this.root = root;
        _this.enemyType = type;
        _this.enemy = new egret.Bitmap();
        _this.addChild(_this.enemy);
        return _this;
    }
    Enemy.prototype.createEnemy = function () {
        var _this = this;
        this.isUse = true;
        this.x = Math.random() * (Util.getStageWidth() - this.width);
        this.y = -this.height;
        this.root.addChildAt(this, 10);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        //发射子弹
        this.shot = new Shot(Shot.EventString);
        this.shot.bulletType = IdentityType.ENEMY;
        this.addEventListener(Shot.EventString, function (e) {
            var bullet = BulletFactory.Shared().getBullet();
            if (bullet == undefined) {
                console.log("对象池中没有对象");
                return;
            }
            var x = _this.x + _this.width / 2 - 5;
            var y = _this.y + _this.height + 10;
            bullet.createBullet(e.bulletType, x, y);
        }, this);
        this.shotTimer = new egret.Timer(this.shotTime);
        this.shotTimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.shotTimer.addEventListener(egret.TimerEvent.COMPLETE, function () { }, this);
        this.shotTimer.start();
    };
    //移动
    Enemy.prototype.onFrame = function () {
        if (this.isUse) {
            this.y += this.speed;
            if (this.y >= Util.getStageHeight()) {
                //从父节点中移除
                if (this.parent) {
                    this.parent.removeChild(this);
                    this.recycle();
                }
            }
        }
    };
    Enemy.prototype.recycle = function () {
        // console.log("敌机回收")
        this.isUse = false;
        this.hitCount = 0;
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
    };
    Enemy.prototype.timerFunc = function (e) {
        if (this.isUse) {
            this.dispatchEvent(this.shot);
        }
    };
    return Enemy;
}(egret.Sprite));
__reflect(Enemy.prototype, "Enemy");
var EnemyType;
(function (EnemyType) {
    EnemyType[EnemyType["LARGE"] = 0] = "LARGE";
    EnemyType[EnemyType["SMALL"] = 1] = "SMALL";
    EnemyType[EnemyType["LITTLE"] = 2] = "LITTLE";
})(EnemyType || (EnemyType = {}));
