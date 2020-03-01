var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundManager = (function () {
    function SoundManager() {
        this._click = new egret.Sound();
        this._click.load("resource/assets/sound/buttonclick.mp3");
        this._bgm = new egret.Sound();
        this._bgm.load("resource/assets/sound/Music.mp3");
        this._right = new egret.Sound();
        this._right.load("resource/assets/sound/right.mp3");
        this._wrong = new egret.Sound();
        this._wrong.load("resource/assets/sound/wrong.mp3");
        this._word = new egret.Sound();
        this._word.load("resource/assets/sound/type_word.mp3");
    }
    SoundManager.Shared = function () {
        if (SoundManager.shared == null) {
            SoundManager.shared = new SoundManager();
        }
        return SoundManager.shared;
    };
    Object.defineProperty(SoundManager.prototype, "IsMusic", {
        get: function () {
            var b = egret.localStorage.getItem('ismusic');
            if (b == null || b == "") {
                return true;
            }
            else {
                return b == "1";
            }
        },
        //根据localstorage储存音效&音乐开启情况
        //音乐是否播放，保存设置
        set: function (value) {
            if (!value) {
                egret.localStorage.setItem("ismusic", "0");
                this.StopBGM();
            }
            else {
                egret.localStorage.setItem("ismusic", "1");
                this.PlayBGM();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager.prototype, "IsSound", {
        get: function () {
            var b = egret.localStorage.getItem('isSound');
            if (b == null || b == "") {
                return true;
            }
            else {
                return b == "1";
            }
        },
        //音效是否播放，保存设置
        set: function (value) {
            if (!value) {
                egret.localStorage.setItem("isSound", "0");
            }
            else {
                egret.localStorage.setItem("isSound", "1");
            }
        },
        enumerable: true,
        configurable: true
    });
    SoundManager.prototype.PlayBGM = function () {
        if (this.IsMusic) {
            this._bgm_channel = this._bgm.play(0, 0);
        }
    };
    SoundManager.prototype.StopBGM = function () {
        if (this._bgm_channel != null) {
            this._bgm_channel.stop();
        }
    };
    SoundManager.prototype.PlayClick = function () {
        if (this.IsSound) {
            this._click.play(0, 1);
        }
    };
    SoundManager.prototype.PlayWord = function () {
        if (this.IsSound) {
            this._word.play(0, 1);
        }
    };
    SoundManager.prototype.PlayRight = function () {
        if (this.IsSound) {
            this._right.play(0, 1);
        }
    };
    SoundManager.prototype.PlayWrong = function () {
        if (this.IsSound) {
            this._wrong.play(0, 1);
        }
    };
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
