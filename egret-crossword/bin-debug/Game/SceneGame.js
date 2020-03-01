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
var SceneGame = (function (_super) {
    __extends(SceneGame, _super);
    function SceneGame() {
        var _this = _super.call(this) || this;
        _this.skinName = "src/Game/SceneGameSkin.exml";
        _this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_back, _this);
        _this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_setting, _this);
        _this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_next, _this);
        _this.group_word_length = _this.group_word.numChildren;
        _this.group_answer_length = _this.group_answer.numChildren;
        return _this;
    }
    SceneGame.Shared = function () {
        if (SceneGame.shared == null) {
            console.log(1);
            SceneGame.shared = new SceneGame();
        }
        return SceneGame.shared;
    };
    //初始化关卡
    SceneGame.prototype.InitLevel = function (level) {
        this.levelIndex = level;
        var leveldata = LevelDataManager.Shared().GetLevel(level);
        //字段拼接
        var words = leveldata.answer + leveldata.word;
        //随机将一个其他题目的字段混进本题目
        while (words.length == 10) {
            var i = Math.floor(Math.random() * GameConfig.level_amount);
            if (i != level) {
                var temp = LevelDataManager.Shared().GetLevel(i);
                words += temp.answer + temp.word;
            }
        }
        //字段重排
        var wordlist = [];
        for (var i = 0; i < words.length; i++) {
            wordlist.push(words.charAt(i)); //charAt() 方法可返回指定位置的字符。
        }
        wordlist = this.randomlist(wordlist);
        //赋值
        for (var i = 0; i < this.group_word_length; i++) {
            var wordrect = this.group_word.getChildAt(i);
            wordrect.setWordText(wordlist[i]);
            wordrect.visible = true;
        }
        for (var i = 0; i < this.group_answer_length; i++) {
            var answerrect = this.group_answer.getChildAt(i);
            answerrect.SetSelectWord(null); //显示文字为空
            answerrect.visible = true;
            answerrect.SelectWord = null; //还原未选择任何字
        }
        this.img_question.source = "../resource/assets/" + leveldata.img;
    };
    //数组打乱
    SceneGame.prototype.randomlist = function (arr) {
        var array = [];
        while (arr.length > 0) {
            var i = Math.floor(Math.random() * arr.length);
            array.push(arr[i]);
            arr.splice(i, 1);
        }
        return array;
    };
    //当字点击的时候，由word类抛出事件，类似事件委托
    SceneGame.prototype.onclick_word = function (word) {
        SoundManager.Shared().PlayWord();
        //找到一个合适的位置添加进答案内容
        var sel = null;
        for (var i = 0; i < this.group_answer_length; i++) {
            //轮询answer是否已填字
            var answer = this.group_answer.getChildAt(i);
            if (answer.SelectWord == null) {
                sel = answer;
                break;
            }
        }
        //存在合适位置时将字填充，并且判断是否完成填字
        if (sel != null) {
            sel.SetSelectWord(word); //填充
            var check_str = "";
            for (var i = 0; i < this.group_answer_length; i++) {
                var answer = this.group_answer.getChildAt(i);
                check_str += answer.getWordText();
            }
            if (check_str == LevelDataManager.Shared().GetLevel(this.levelIndex).answer) {
                console.log("win!");
                this.showWin();
            }
            else {
                if (check_str.length == 4) {
                    SoundManager.Shared().PlayWrong();
                }
            }
        }
    };
    SceneGame.prototype.onclick_back = function () {
        SoundManager.Shared().PlayClick();
        this.parent.addChild(SceneLevels.Shared());
        this.parent.removeChild(this);
    };
    SceneGame.prototype.onclick_setting = function () {
        SoundManager.Shared().PlayClick();
        this.addChild(GameSetting.Shared());
    };
    SceneGame.prototype.showWin = function () {
        SoundManager.Shared().PlayRight();
        this.group_win.visible = true;
        var leveldata = LevelDataManager.Shared().GetLevel(this.levelIndex);
        this.lb_from.text = leveldata.tip;
        this.lb_explain.text = leveldata.content;
    };
    SceneGame.prototype.onclick_next = function () {
        //下一个题目
        SoundManager.Shared().PlayClick();
        this.group_win.visible = false;
        SceneLevels.Shared().OpenLevel(this.levelIndex + 1);
        this.InitLevel(this.levelIndex + 1);
    };
    return SceneGame;
}(eui.Component));
__reflect(SceneGame.prototype, "SceneGame");
