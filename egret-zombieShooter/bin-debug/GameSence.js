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
var GameSence = (function (_super) {
    __extends(GameSence, _super);
    function GameSence() {
        var _this = _super.call(this) || this;
        _this._gameUI = new GameUI();
        _this._lastTimestamp = 0;
        _this._brithtime = 0;
        _this._guncd = 0;
        _this._shot_vector = null;
        var bg = new egret.Bitmap();
        bg.width = Util.getStageWidth();
        bg.height = Util.getStageHeight();
        bg.texture = RES.getRes('bg_png');
        _this.addChild(bg);
        _this._zombies_layer = new egret.Sprite();
        _this.addChild(_this._zombies_layer);
        _this._bullets_layer = new egret.Sprite();
        _this.addChild(_this._bullets_layer);
        _this._gun = new egret.Bitmap(RES.getRes('gun_gatling_1_png'));
        _this._gun.x = Util.getStageWidth() / 2;
        _this._gun.y = Util.getStageHeight() - _this._gun.height / 2;
        Util.setAnchorCenter(_this._gun, 0, 0);
        _this.addChild(_this._gun);
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.onTouchMove, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onTouchEnd, _this);
        egret.startTick(_this.onUpdate, _this);
        _this.addChild(_this._gameUI);
        var bgm = RES.getRes('music_gaming_mp3');
        var bgmchannel = bgm.play(0, 0);
        bgmchannel.volume = 0.3;
        _this._gunsound = RES.getRes('machine_gun_mp3');
        return _this;
    }
    GameSence.getInstance = function () {
        if (GameSence._instance == null) {
            GameSence._instance = new GameSence();
        }
        return GameSence._instance;
    };
    GameSence.prototype.onUpdate = function (timestamp) {
        var span = timestamp - this._lastTimestamp; //间隔时间
        this._lastTimestamp = timestamp;
        this._gameUI.Time -= span;
        //生成僵尸
        this._brithtime += span;
        if (this._brithtime >= 500) {
            this._brithtime = 0;
            var zombie = void 0;
            if (Math.random() < 0.3) {
                zombie = new Zombie1();
            }
            else {
                zombie = new Zombie();
            }
            zombie.x = zombie.width + Math.random() * (Util.getStageWidth() - zombie.width);
            zombie.y = -zombie.height;
            this._zombies_layer.addChild(zombie);
        }
        //遍历僵尸
        for (var i = this._zombies_layer.numChildren - 1; i >= 0; i--) {
            var zombie = this._zombies_layer.getChildAt(i);
            zombie.onUpdate(span);
            if (zombie.parent == null) {
                this._gameUI.Time -= 1000;
            }
        }
        if (this._gameUI.Time <= 0) {
            this._zombies_layer.removeChildren();
            this._bullets_layer.removeChildren();
            return;
        }
        //生成子弹
        if (this._shot_vector != null) {
            this._guncd += span;
            if (this._guncd >= 150) {
                this._guncd = 0;
                this.addBullet();
            }
        }
        //遍历子弹
        for (var i = this._bullets_layer.numChildren - 1; i >= 0; i--) {
            var bullet = this._bullets_layer.getChildAt(i);
            bullet.onUpdate(span);
            //碰撞检测
            var point = new egret.Point(bullet.x, bullet.y);
            for (var j = 0, len = this._zombies_layer.numChildren; j < len; j++) {
                var zombie = this._zombies_layer.getChildAt(j);
                if (zombie.zombieState == ZombieState.Dead) {
                    continue; //僵尸死亡後消失過程防止被鞭尸
                }
                if (zombie.getBlock().containsPoint(point)) {
                    zombie.HP -= 1;
                    if (zombie.HP <= 0) {
                        this._gameUI.addSocreEffect(zombie.x, zombie.y, zombie.Score);
                        this._gameUI.addHurtEffect(zombie.x, zombie.y);
                        zombie.dead();
                    }
                    this._bullets_layer.removeChild(bullet);
                    break;
                }
            }
        }
        return false;
    };
    GameSence.prototype.onTouchBegin = function (e) {
        var vx = e.stageX - this._gun.x, vy = e.stageY - this._gun.y;
        this._gun.rotation = Math.atan2(vy, vx) * 180 / Math.PI + 90;
        this._shot_vector = new egret.Point(vx, vy);
        this._shot_vector.normalize(1); //向量标准化
    };
    GameSence.prototype.onTouchMove = function (e) {
        var vx = e.stageX - this._gun.x, vy = e.stageY - this._gun.y;
        this._gun.rotation = Math.atan2(vy, vx) * 180 / Math.PI + 90;
        this._shot_vector = new egret.Point(vx, vy);
        this._shot_vector.normalize(1); //向量标准化
    };
    GameSence.prototype.onTouchEnd = function (e) {
        this._shot_vector = null;
    };
    GameSence.prototype.addBullet = function () {
        this._gunsound.play(0, 1);
        var bullet = new Bullet();
        bullet._vector = this._shot_vector;
        bullet.rotation = Math.atan2(this._shot_vector.y, this._shot_vector.x) * 180 / Math.PI + 90;
        bullet.x = this._gun.x - 10;
        bullet.y = this._gun.y;
        this._bullets_layer.addChild(bullet);
    };
    GameSence.prototype.beginGame = function () {
        this._gameUI.onClickReplay();
    };
    return GameSence;
}(egret.DisplayObjectContainer));
__reflect(GameSence.prototype, "GameSence");
