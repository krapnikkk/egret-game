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
var Zombie = (function (_super) {
    __extends(Zombie, _super);
    function Zombie() {
        var _this = _super.call(this) || this;
        _this._speed = 250;
        _this._framesindex = 0;
        _this._frametimer = 0;
        _this._frames = [];
        _this._frames_die = [];
        //状态
        _this.zombieState = ZombieState.Run;
        _this.HP = 2;
        _this.Score = 100;
        _this._zombie = new egret.Bitmap(RES.getRes('enemy_05_walk_front_00_png'));
        _this.addChild(_this._zombie);
        _this.initZombie();
        for (var i = 0; i < 6; i++) {
            _this._frames_die.push(RES.getRes("enemy_dead_01_0" + i + "_png"));
        }
        return _this;
    }
    Zombie.prototype.initZombie = function () {
        for (var i = 0; i < 7; i++) {
            this._frames.push(RES.getRes("enemy_05_walk_front_0" + i + "_png"));
        }
    };
    Zombie.prototype.onUpdate = function (span) {
        if (this.zombieState == ZombieState.Run) {
            this.y += this._speed * (span / 1000);
        }
        if (this.y >= Util.getStageHeight() - 50) {
            this.parent.removeChild(this);
        }
        this._frametimer += span;
        if (this._frametimer > 60) {
            this._frametimer = 0;
            if (this.zombieState == ZombieState.Run) {
                this._zombie.texture = this._frames[this._framesindex];
                this._framesindex < this._frames.length - 1 ? this._framesindex++ : this._framesindex = 0;
            }
            else {
                if (this._framesindex < this._frames_die.length) {
                    this._zombie.texture = this._frames_die[this._framesindex];
                    this._framesindex++;
                }
                this.alpha <= 0 ? this.parent.removeChild(this) : this.alpha -= 0.05; //播放死亡动画后移除
            }
        }
    };
    Zombie.prototype.dead = function () {
        this.zombieState = ZombieState.Dead;
        this._framesindex = 0;
    };
    Zombie.prototype.getBlock = function () {
        return new egret.Rectangle(this.x + 10, this.y + 10, this.width - 10, this.height - 10);
    };
    return Zombie;
}(egret.Sprite));
__reflect(Zombie.prototype, "Zombie");
var ZombieState;
(function (ZombieState) {
    ZombieState[ZombieState["Run"] = 0] = "Run";
    ZombieState[ZombieState["Dead"] = 1] = "Dead";
})(ZombieState || (ZombieState = {}));
var Zombie1 = (function (_super) {
    __extends(Zombie1, _super);
    function Zombie1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Zombie1.prototype.initZombie = function () {
        this.HP = 4;
        this.Score = 400;
        this._speed = 300;
        for (var i = 0; i < 7; i++) {
            this._frames.push(RES.getRes("enemy_08_walk_front_0" + i + "_png"));
        }
    };
    return Zombie1;
}(Zombie));
__reflect(Zombie1.prototype, "Zombie1");
