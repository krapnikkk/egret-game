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
var GameUI = (function (_super) {
    __extends(GameUI, _super);
    function GameUI() {
        var _this = _super.call(this) || this;
        _this.mcFactory = null;
        _this.skinName = "src/GameUISkin.exml";
        _this.width = Util.getStageWidth();
        _this.height = Util.getStageHeight();
        _this.btn_replay.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClickReplay, _this);
        _this.onClickReplay();
        _this.Time = 0;
        return _this;
    }
    GameUI.prototype.onClickReplay = function () {
        this.group_over.visible = false;
        this.Score = 0;
        this.Time = 30000;
    };
    Object.defineProperty(GameUI.prototype, "Score", {
        get: function () {
            return parseInt(this.lb_score.text);
        },
        set: function (value) {
            this.lb_score.text = value.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameUI.prototype, "Time", {
        get: function () {
            return this._time;
        },
        set: function (value) {
            this._time = value;
            if (this._time <= 0) {
                this._time = 0;
                this.ShowOver();
            }
            var s = Math.floor(this._time / 1000), m = this._time % 1000;
            this.lb_time.text = s + "." + m;
        },
        enumerable: true,
        configurable: true
    });
    GameUI.prototype.ShowOver = function () {
        this.group_over.visible = true;
        this.lb_over_score.text = this.Score.toString();
        if (this.Score > this.getBestScore()) {
            this.setBestScore(this.Score);
        }
        this.setBestScore(this.Score);
        this.lb_best_score.text = this.getBestScore().toString();
    };
    GameUI.prototype.getBestScore = function () {
        var str = egret.localStorage.getItem('best_score');
        if (str == null) {
            return 0;
        }
        else {
            return parseInt(str);
        }
    };
    GameUI.prototype.setBestScore = function (value) {
        egret.localStorage.setItem('best_score', value.toString());
    };
    GameUI.prototype.addSocreEffect = function (x, y, score) {
        var eff = new eui.Label();
        eff.text = score.toString();
        eff.x = x;
        eff.y = y;
        eff.stroke = 3;
        this.group_effect.addChild(eff);
        var tx = this.lb_score.x + this.lb_score.width, ty = this.lb_score.y;
        egret.Tween.get(eff)
            .to({ "x": tx, "y": ty }, 500, egret.Ease.circInOut)
            .call(this.addScore, this, [score])
            .call(this.removeEffectFromGroup, this, [eff]);
    };
    GameUI.prototype.addScore = function (score) {
        this.Score += score;
    };
    GameUI.prototype.removeEffectFromGroup = function (eff) {
        this.group_effect.removeChild(eff);
    };
    GameUI.prototype.addHurtEffect = function (x, y) {
        if (this.mcFactory == null) {
            this.mcFactory = new egret.MovieClipDataFactory(RES.getRes("hurteffect_json"), RES.getRes("hurteffect_png"));
        }
        var mc = new egret.MovieClip(this.mcFactory.generateMovieClipData('eff_hurt_0'));
        mc.x = x;
        mc.y = y;
        mc.gotoAndPlay("play", 1);
        this.group_effect.addChild(mc);
        egret.Tween.get(this).wait(200).call(this.removeEffectFromGroup, this, [mc]);
    };
    return GameUI;
}(eui.Component));
__reflect(GameUI.prototype, "GameUI");
