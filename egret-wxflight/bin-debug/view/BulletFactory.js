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
var BulletFactory = (function (_super) {
    __extends(BulletFactory, _super);
    function BulletFactory() {
        var _this = _super.call(this) || this;
        _this.bulletFactory = [];
        _this._enemyPlanes = [];
        return _this;
    }
    BulletFactory.Shared = function () {
        if (BulletFactory.shared == null) {
            BulletFactory.shared = new BulletFactory();
        }
        return BulletFactory.shared;
    };
    /**
     * 初始化对象池
     */
    BulletFactory.prototype.initPool = function (root) {
        this.root = root;
        for (var i = 0; i < 100; i++) {
            var bullet = new Bullet(root);
            this.bulletFactory.push(bullet);
        }
    };
    BulletFactory.prototype.getBullet = function () {
        for (var i = 0; i < this.bulletFactory.length; i++) {
            if (this.bulletFactory[i].isUse == false) {
                return this.bulletFactory[i];
            }
        }
        console.log("对象池已经用光了，可能是没有回收");
    };
    //子弹的碰撞检测
    BulletFactory.prototype.isHit = function (e) {
        var enemys = EnemyFactory.Shared().getIsUseEnemy(); //正在使用的敌机
        var isHit = false;
        var hit = new Hit(Hit.EventString);
        for (var i = 0; i < this.bulletFactory.length; i++) {
            if (this.bulletFactory[i].isUse == true) {
                if (this.bulletFactory[i].bulletType == IdentityType.ENEMY) {
                    isHit = Util.hitTest(e, this.bulletFactory[i]);
                    hit.hitType = HitType.ENEMY_TO_PLAYER;
                    if (isHit) {
                        console.log('我中弹啦');
                    }
                }
                if (this.bulletFactory[i].bulletType == IdentityType.PLAYER) {
                    for (var j = 0; j < enemys.length; j++) {
                        if (enemys[j].isUse) {
                            isHit = Util.hitTest(enemys[j], this.bulletFactory[i]);
                            hit.enemy = enemys[j];
                            hit.hitType = HitType.PLAYER_TO_ENEMY;
                            if (isHit) {
                                hit.enemy.hitCount++;
                                if (hit.enemy.hitCount >= hit.enemy.life) {
                                    hit.enemy.recycle();
                                }
                            }
                        }
                    }
                }
                if (isHit) {
                    this.dispatchEvent(hit);
                    this.bulletFactory[i].recycle();
                }
            }
        }
        return isHit;
    };
    return BulletFactory;
}(egret.Sprite));
__reflect(BulletFactory.prototype, "BulletFactory");
