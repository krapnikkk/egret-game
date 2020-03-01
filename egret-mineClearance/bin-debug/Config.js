var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var Config = (function () {
    function Config() {
    }
    Config.getStageWidth = function () {
        return egret.MainContext.instance.stage.stageWidth;
    };
    Config.getStageHeight = function () {
        return egret.MainContext.instance.stage.stageHeight;
    };
    Config.row = 10;
    Config.column = 10;
    Config.count = 10;
    return Config;
}());
__reflect(Config.prototype, "Config");
