// TypeScript file
class BulletFactory extends egret.Sprite{
    private bulletFactory:Array<any> = [];
	private _enemyPlanes:Array<any> = [];
    private root:GameScene;

	public constructor() {
		super();
	}

    private static shared:BulletFactory;
    public static Shared(){
        if(BulletFactory.shared == null){
            BulletFactory.shared = new BulletFactory();
        }
        return BulletFactory.shared;
    }

    /**
     * 初始化对象池
     */
	public initPool(root: GameScene) {
		this.root = root;
		for (var i = 0; i < 100; i++) {
			var bullet = new Bullet(root);
			this.bulletFactory.push(bullet);
		}

	}

    public getBullet(): Bullet {
        for (var i = 0; i < this.bulletFactory.length; i++) {
            if (this.bulletFactory[i].isUse == false) {
                return this.bulletFactory[i];
            }
        }
        console.log("对象池已经用光了，可能是没有回收")
    }

        //子弹的碰撞检测
     public isHit(e: egret.Sprite): boolean {

        let enemys = EnemyFactory.Shared().getIsUseEnemy(); //正在使用的敌机

        let isHit = false;
        let hit = new Hit(Hit.EventString);
        for (var i = 0; i < this.bulletFactory.length; i++) {
            if (this.bulletFactory[i].isUse == true) {  //遍历子弹对象池
                if (this.bulletFactory[i].bulletType == IdentityType.ENEMY) {  //敌机发射，和主机碰撞检测
                    isHit = Util.hitTest(e, this.bulletFactory[i]);
                    hit.hitType = HitType.ENEMY_TO_PLAYER;  
                    if(isHit){
                        console.log('我中弹啦')
                    }
                }

                if (this.bulletFactory[i].bulletType == IdentityType.PLAYER) { //主角发射,和敌机碰撞检测
                    for (var j = 0; j < enemys.length; j++) {
                        if (enemys[j].isUse) {
                            isHit = Util.hitTest(enemys[j], this.bulletFactory[i])
                            hit.enemy = enemys[j];
                            hit.hitType = HitType.PLAYER_TO_ENEMY;
                            if(isHit){
                                hit.enemy.hitCount++;
                                if(hit.enemy.hitCount>=hit.enemy.life){
                                    hit.enemy.recycle();
                                }
                            }
                        }
                    }
                }
                if (isHit) {  //如果碰撞检测为true，那么触发HitEvent事件，并传递检测结果，并手动调用子弹的回收方法
                    this.dispatchEvent(hit);
                    this.bulletFactory[i].recycle();
                }
            }
        }
        return isHit;

    }

}