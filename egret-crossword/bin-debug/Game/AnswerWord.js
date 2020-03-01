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
var AnswerWord = (function (_super) {
    __extends(AnswerWord, _super);
    function AnswerWord() {
        var _this = _super.call(this) || this;
        _this.SelectWord = null;
        return _this;
    }
    AnswerWord.prototype.onclick_tap = function () {
        if (this.SelectWord != null) {
            this.SelectWord.visible = true; //不可见
            this.SelectWord = null;
            this.setWordText("");
        }
    };
    //当一个问题字被选择添加到回答时候，设置不可见，并保存到本对象中以后使用
    AnswerWord.prototype.SetSelectWord = function (word) {
        if (word != null) {
            word.visible = false;
            this.setWordText(word.getWordText());
            this.SelectWord = null;
        }
        else {
            this.setWordText("");
            this.SelectWord = null;
        }
        this.SelectWord = word;
    };
    return AnswerWord;
}(Word));
__reflect(AnswerWord.prototype, "AnswerWord");
