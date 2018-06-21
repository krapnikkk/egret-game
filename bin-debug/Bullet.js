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
    function Bullet() {
        var _this = _super.call(this) || this;
        _this._speed = 1500;
        _this._vector = null; //向量
        _this._bullet = new egret.Bitmap(RES.getRes('bullet_95m_png'));
        _this.addChild(_this._bullet);
        _this.anchorOffsetX = _this.width / 2;
        return _this;
    }
    Bullet.prototype.onUpdate = function (span) {
        if (this._vector != null) {
            this.x += this._vector.x * this._speed * (span / 1000);
            this.y += this._vector.y * this._speed * (span / 1000);
            if (this.y <= -this.height) {
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            }
        }
    };
    return Bullet;
}(egret.Sprite));
__reflect(Bullet.prototype, "Bullet");
