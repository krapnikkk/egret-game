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
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(root) {
        var _this = _super.call(this) || this;
        _this.isUse = false; //是否正在使用
        _this.speed = 5; //子弹速度
        _this.root = root;
        _this.bullet = new egret.Bitmap();
        _this.addChild(_this.bullet);
        return _this;
    }
    Bullet.prototype.createBullet = function (type, x, y) {
        this.isUse = true;
        this.x = x;
        this.y = y;
        this.bulletType = type;
        if (type == IdentityType.ENEMY) {
            this.bullet.texture = RES.getRes("bullet1_png");
        }
        else {
            this.bullet.texture = RES.getRes("bullet2_png");
        }
        this.root.addChildAt(this, 10);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
    };
    Bullet.prototype.onFrame = function () {
        if (this.isUse) {
            if (this.bulletType == IdentityType.ENEMY) {
                this.y += this.speed * 2;
                if (this.y >= Util.getStageHeight()) {
                    this.recycle();
                }
            }
            else {
                this.y -= this.speed;
                if (this.y <= 0) {
                    this.recycle();
                }
            }
        }
    };
    Bullet.prototype.recycle = function () {
        this.parent.removeChild(this);
        this.isUse = false;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
    };
    return Bullet;
}(egret.Sprite));
__reflect(Bullet.prototype, "Bullet");
/**
 * 子弹类型
 */
var IdentityType;
(function (IdentityType) {
    /**
     * 敌人
     */
    IdentityType[IdentityType["ENEMY"] = 0] = "ENEMY";
    /**
     * 玩家
     */
    IdentityType[IdentityType["PLAYER"] = 1] = "PLAYER";
})(IdentityType || (IdentityType = {}));
