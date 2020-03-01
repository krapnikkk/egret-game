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
var StartUI = (function (_super) {
    __extends(StartUI, _super);
    function StartUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "src/StartUISkin.exml";
        _this.width = Util.getStageWidth();
        _this.height = Util.getStageHeight();
        _this.btn_start.touchEnabled = true;
        _this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onStart, _this);
        return _this;
    }
    StartUI.prototype.onStart = function () {
        this.parent.addChild(GameSence.getInstance());
        GameSence.getInstance().beginGame();
        this.parent.removeChild(this);
    };
    return StartUI;
}(eui.Component));
__reflect(StartUI.prototype, "StartUI");
