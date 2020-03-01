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
var LargeEnemy = (function (_super) {
    __extends(LargeEnemy, _super);
    function LargeEnemy(root) {
        var _this = _super.call(this, root, EnemyType.LARGE) || this;
        _this.explodetTimer = new egret.Timer(1000 / 10);
        _this.timer = new egret.Timer(1000 / 10);
        _this.index = 0;
        _this.life = 3;
        _this.width = 165;
        _this.height = 246;
        _this.shotAni();
        return _this;
    }
    //发射动效
    LargeEnemy.prototype.shotAni = function () {
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.enterFrame, this);
        this.timer.start();
    };
    LargeEnemy.prototype.enterFrame = function () {
        if (this.index) {
            this.enemy.texture = RES.getRes('enemy3_n1_png');
            this.index = 0;
        }
        else {
            this.enemy.texture = RES.getRes('enemy3_n2_png');
            this.index++;
        }
    };
    //爆炸特效
    LargeEnemy.prototype.explode = function () {
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.enterFrame, this);
        this.timer.stop();
        this.index = 0;
        this.explodetTimer.addEventListener(egret.TimerEvent.TIMER, this.enterFrameHandler, this);
        this.explodetTimer.start();
    };
    //TimerEvent制作帧动画
    LargeEnemy.prototype.enterFrameHandler = function (e) {
        this.index++;
        this.enemy.texture = RES.getRes("enemy3_down" + (this.index + '') + "_png");
        if (this.index > 4) {
            this.explodetTimer.stop();
            this.explodetTimer.removeEventListener(egret.TimerEvent.TIMER, this.enterFrameHandler, this);
            this.index = 0;
        }
    };
    return LargeEnemy;
}(Enemy));
__reflect(LargeEnemy.prototype, "LargeEnemy");
