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
var SceneLevels = (function (_super) {
    __extends(SceneLevels, _super);
    function SceneLevels() {
        var _this = _super.call(this) || this;
        _this.arrow_tw = false;
        _this.LevelIcons = []; //关卡图片数组
        _this.sel_level = 0;
        _this.skinName = "src/Game/SceneLevelsSkin.exml";
        _this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_back, _this);
        _this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_setting, _this);
        var group = new eui.Group(); //地图背景
        group.width = GameConfig.stage_width;
        group.height = GameConfig.map_spany * GameConfig.level_amount; //算出最大高度
        //开启位图缓存模式
        // group.cacheAsBitmap = true;
        var group_count = group.height / GameConfig.stage_height;
        //填充地图图片
        for (var i = 0; i < group_count; i++) {
            var level_img = new eui.Image();
            level_img.source = RES.getRes("GameBG2_jpg");
            level_img.y = i * GameConfig.stage_height;
            level_img.touchEnabled = false;
            _this.group_levels.addChildAt(level_img, 0);
        }
        var milestone = LevelDataManager.Shared().Milestone;
        //以正弦曲线绘制关卡图标的路径
        for (var i = 0; i < GameConfig.level_amount; i++) {
            var icon = new LevelIcon();
            icon.Level = i + 1;
            icon.y = GameConfig.map_spany * i / 2;
            icon.x = Math.sin(icon.y / 180 * Math.PI) * 200 + group.width / 2;
            icon.y += GameConfig.map_spany * i / 2;
            icon.y = group.height - icon.y - GameConfig.map_spany;
            icon.width = 77;
            icon.height = 77;
            group.addChild(icon);
            //依据进度设置关卡显示
            icon.enabled = i < milestone;
            _this.LevelIcons.push(icon);
            icon.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_level, _this);
        }
        _this.group_levels.addChild(group); //填充到eui
        //卷到最底层
        _this.group_levels.scrollV = group.height - 1100; //Scroller滚动到指定坐标scrollV
        //跟踪箭头
        _this.img_arrow = new eui.Image();
        _this.img_arrow.source = RES.getRes("PageDownBtn_png");
        _this.img_arrow.touchEnabled = false;
        _this.img_arrow.width = 124;
        _this.img_arrow.height = 76;
        _this.img_arrow_pos(group.getChildAt(0).x - _this.img_arrow.width / 2 + group.getChildAt(0).width / 2, group.getChildAt(0).y - _this.img_arrow.height - 20);
        group.addChild(_this.img_arrow);
        return _this;
    }
    SceneLevels.Shared = function () {
        if (SceneLevels.shared == null) {
            SceneLevels.shared = new SceneLevels();
        }
        return SceneLevels.shared;
    };
    SceneLevels.prototype.onclick_level = function (e) {
        SoundManager.Shared().PlayClick();
        var icon = e.currentTarget;
        if (this.sel_level != icon.Level) {
            this.sel_level = icon.Level;
            this.img_arrow_pos(icon.x - this.img_arrow.width / 2 + icon.width / 2, icon.y - this.img_arrow.height - 20);
        }
        else {
            //进入并开始游戏
            this.parent.addChild(SceneGame.Shared());
            SceneGame.Shared().InitLevel(icon.Level);
            this.parent.removeChild(this);
        }
    };
    SceneLevels.prototype.img_arrow_pos = function (posX, posY) {
        this.img_arrow.x = posX;
        this.img_arrow.y = posY;
        if (this.arrow_tw) {
            egret.Tween.removeTweens(this.img_arrow);
        }
        var tw = egret.Tween.get(this.img_arrow, { loop: true });
        tw.to({ y: this.img_arrow.y + 10 }, 500);
        this.arrow_tw = true;
    };
    SceneLevels.prototype.onclick_back = function () {
        console.log("back");
        SoundManager.Shared().PlayClick();
        this.parent.addChild(SceneBegin.Shared());
        this.parent.removeChild(this);
    };
    //打开指定的关卡，如果大于最远关卡，则保存数据也跟着调整
    SceneLevels.prototype.OpenLevel = function (level) {
        var icon = this.LevelIcons[level - 1];
        icon.enabled = true;
        if (level > LevelDataManager.Shared().Milestone) {
            LevelDataManager.Shared().Milestone = level;
            //同时将选定
            this.img_arrow_pos(icon.x, icon.y);
            this.sel_level = icon.Level;
        }
    };
    SceneLevels.prototype.onclick_setting = function () {
        SoundManager.Shared().PlayClick();
        this.addChild(GameSetting.Shared());
    };
    return SceneLevels;
}(eui.Component));
__reflect(SceneLevels.prototype, "SceneLevels");
