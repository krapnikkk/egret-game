var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConfig = (function () {
    function GameConfig() {
    }
    GameConfig.stage_width = 720;
    GameConfig.stage_height = 1136;
    GameConfig.map_row = 15;
    GameConfig.map_col = 10;
    GameConfig.map_spanx = GameConfig.stage_width / GameConfig.map_col;
    GameConfig.map_spany = GameConfig.stage_height / GameConfig.map_row;
    GameConfig.level_amount = 400;
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
