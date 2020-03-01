var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//单个问题关卡的数据结构
var LevelDataItem = (function () {
    function LevelDataItem() {
    }
    return LevelDataItem;
}());
__reflect(LevelDataItem.prototype, "LevelDataItem");
//关卡数据管理器
var LevelDataManager = (function () {
    function LevelDataManager() {
        //一个关卡的保存数据组
        this.items = [];
        this.items = RES.getRes("questions_json");
    }
    LevelDataManager.Shared = function () {
        if (LevelDataManager.shared == null) {
            LevelDataManager.shared = new LevelDataManager();
        }
        return LevelDataManager.shared;
    };
    //通过关卡号获取关卡数据
    LevelDataManager.prototype.GetLevel = function (level) {
        if (level < 0) {
            level = 0;
        }
        else if (level >= this.items.length) {
            level = this.items.length - 1;
        }
        return this.items[level];
    };
    Object.defineProperty(LevelDataManager.prototype, "Milestone", {
        //获取当前游戏的答题进度
        get: function () {
            var milestone = egret.localStorage.getItem("crossword_milestone");
            if (milestone === "" || milestone === null) {
                milestone = "1";
            }
            return parseInt(milestone);
        },
        //设置当前游戏的答题进度
        set: function (value) {
            egret.localStorage.setItem("crossword_milestone", value.toString());
        },
        enumerable: true,
        configurable: true
    });
    return LevelDataManager;
}());
__reflect(LevelDataManager.prototype, "LevelDataManager");
