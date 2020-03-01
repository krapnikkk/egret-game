var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Util = (function () {
    function Util() {
    }
    Util.getStageWidth = function () {
        return egret.MainContext.instance.stage.stageWidth;
    };
    Util.getStageHeight = function () {
        return egret.MainContext.instance.stage.stageHeight;
    };
    //设置对象的中心点，x,y为偏差值
    Util.centerPoint = function (obj, x, y, bool) {
        var offsetX = x || 0, offsetY = y || 0, offsetW = bool ? 0 : obj.width, offsetH = bool ? 0 : obj.height;
        obj.x = (this.getStageWidth() - offsetW) / 2 - offsetX;
        obj.y = (this.getStageHeight() - offsetH) / 2 - offsetY;
    };
    //锚点转移
    Util.setAnchorCenter = function (obj, x, y) {
        var offsetX = x || 0, offsetY = y || 0;
        obj.anchorOffsetX = obj.width / 2 - offsetX;
        obj.anchorOffsetY = obj.height / 2 - offsetY;
    };
    //基于矩形的碰撞检测
    Util.hitTest = function (obj1, obj2) {
        if (obj1 == undefined) {
            return false;
        }
        if (obj2 == undefined) {
            return false;
        }
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        return rect1.intersects(rect2);
    };
    return Util;
}());
__reflect(Util.prototype, "Util");
