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
var Hit = (function (_super) {
    __extends(Hit, _super);
    function Hit(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.hitType = HitType.OTHER;
        _this.enemy = null;
        return _this;
    }
    Hit.EventString = "hit";
    return Hit;
}(egret.Event));
__reflect(Hit.prototype, "Hit");
var HitType;
(function (HitType) {
    HitType[HitType["PLAYER_TO_ENEMY"] = 0] = "PLAYER_TO_ENEMY";
    HitType[HitType["ENEMY_TO_PLAYER"] = 1] = "ENEMY_TO_PLAYER";
    HitType[HitType["OTHER"] = 2] = "OTHER";
})(HitType || (HitType = {}));
