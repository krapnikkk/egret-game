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
var EnemyFactory = (function (_super) {
    __extends(EnemyFactory, _super);
    function EnemyFactory() {
        var _this = _super.call(this) || this;
        _this.enemyFactory = [];
        return _this;
    }
    EnemyFactory.Shared = function () {
        if (EnemyFactory.shared == null) {
            EnemyFactory.shared = new EnemyFactory();
        }
        return EnemyFactory.shared;
    };
    EnemyFactory.prototype.initPool = function (root) {
        var _this = this;
        this.root = root;
        for (var i = 0; i < 10; i++) {
            var s = new SmallEnemy(root), b = new LargeEnemy(root), l = new LittleEnemy(root);
            this.enemyFactory.push(s); //存放至对象池
            this.enemyFactory.push(b);
            this.enemyFactory.push(l);
        }
        //定时器
        this.timer = new egret.Timer(3000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timeFunc, this);
        this.timer.start();
        //释放敌人
        this.release = new Release(Release.EventString);
        this.addEventListener(Release.EventString, function (e) {
            var random = Math.ceil(Math.random() * 3);
            var enemy;
            switch (random) {
                case 1:
                    enemy = _this.getEnemy(EnemyType.LARGE);
                    break;
                case 2:
                    enemy = _this.getEnemy(EnemyType.SMALL);
                    break;
                case 3:
                    enemy = _this.getEnemy(EnemyType.LITTLE);
                    break;
                default:
                    console.log('switch default');
            }
            enemy.createEnemy();
        }, this);
    };
    //获取未被使用的Enemy
    EnemyFactory.prototype.getEnemy = function (type) {
        for (var i = 0; i < this.enemyFactory.length; i++) {
            if (!this.enemyFactory[i].isUse && this.enemyFactory[i].enemyType == type) {
                return this.enemyFactory[i];
            }
        }
    };
    //获取正在使用的Enemy
    EnemyFactory.prototype.getIsUseEnemy = function () {
        var enemys = [];
        for (var i = 0; i < this.enemyFactory.length; i++) {
            if (this.enemyFactory[i].isUse) {
                enemys.push(this.enemyFactory[i]);
            }
        }
        return enemys;
    };
    //定时器方法
    EnemyFactory.prototype.timeFunc = function () {
        this.dispatchEvent(this.release);
    };
    //停止生成
    EnemyFactory.prototype.stop = function () {
        this.timer.stop();
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timeFunc, this);
    };
    //碰撞检测
    EnemyFactory.prototype.isHit = function (e) {
        var isHit = false;
        var hit = new Hit(Hit.EventString);
        for (var i = 0; i < this.enemyFactory.length; i++) {
            if (this.enemyFactory[i].isUse == true) {
                if (this.enemyFactory[i].bulletType == IdentityType.ENEMY) {
                    isHit = Util.hitTest(e, this.enemyFactory[i]);
                    hit.hitType = HitType.OTHER;
                    if (isHit) {
                        console.log('我撞到敌机啦');
                    }
                }
                if (isHit) {
                    this.dispatchEvent(hit);
                    this.enemyFactory[i].recycle();
                }
            }
        }
        return isHit;
    };
    return EnemyFactory;
}(egret.Sprite));
__reflect(EnemyFactory.prototype, "EnemyFactory");
