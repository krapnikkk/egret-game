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
var LittleEnemy = (function (_super) {
    __extends(LittleEnemy, _super);
    function LittleEnemy(root) {
        var _this = _super.call(this, root, EnemyType.LITTLE) || this;
        _this.timer = new egret.Timer(1000 / 10);
        _this.index = 0;
        _this.width = 51;
        _this.height = 39;
        _this.life = 1;
        _this.enemy.texture = RES.getRes('enemy1_png');
        return _this;
    }
    //爆炸特效
    LittleEnemy.prototype.explode = function () {
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.enterFrameHandler, this);
        this.timer.start();
    };
    //TimerEvent制作帧动画
    LittleEnemy.prototype.enterFrameHandler = function (e) {
        this.index++;
        this.enemy.texture = RES.getRes("enemy1_down" + (this.index + '') + "_png");
        if (this.index > 4) {
            this.timer.stop();
            this.index = 0;
        }
    };
    return LittleEnemy;
}(Enemy));
__reflect(LittleEnemy.prototype, "LittleEnemy");
