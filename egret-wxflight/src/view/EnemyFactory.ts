// TypeScript file
class EnemyFactory extends egret.Sprite{
    private enemyFactory:Array<any> = [];
    private root:GameScene;

    private timer: egret.Timer;
    private release:Release;

    private static shared:EnemyFactory;
    public static Shared(){
        if(EnemyFactory.shared == null){
            EnemyFactory.shared = new EnemyFactory();
        }
        return EnemyFactory.shared;
    }

    public constructor() {
        super();
    }

    public initPool(root: GameScene) {
        this.root = root;
        for(let i =0;i<10;i++){
            let s =  new SmallEnemy(root),
                b = new LargeEnemy(root),
                l = new LittleEnemy(root);
            this.enemyFactory.push(s);//存放至对象池
            this.enemyFactory.push(b);
            this.enemyFactory.push(l);
        }
        //定时器
        this.timer = new egret.Timer(3000);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.timeFunc,this);
        this.timer.start();

        //释放敌人
        this.release = new Release(Release.EventString);
        this.addEventListener(Release.EventString,(e:Release)=>{
        let random:number = Math.ceil(Math.random()*3);
        let enemy:Enemy;
            switch (random){
                case 1:
                 enemy = this.getEnemy(EnemyType.LARGE);
                    break;
                case 2:
                enemy = this.getEnemy(EnemyType.SMALL);
                    break;
                case 3:
                enemy = this.getEnemy(EnemyType.LITTLE);
                    break;
                default:
                    console.log('switch default');
            }
            enemy.createEnemy();
        },this);
    }

    //获取未被使用的Enemy
    public getEnemy(type: EnemyType){
        for (let i = 0; i < this.enemyFactory.length; i++) {
            if (!this.enemyFactory[i].isUse && this.enemyFactory[i].enemyType == type) {//未被使用且对应类型的emeny
                return this.enemyFactory[i];
            }
        }
    }

    //获取正在使用的Enemy
    public getIsUseEnemy(): Enemy[] {
        let enemys = [];
        for (var i = 0; i < this.enemyFactory.length; i++) {
            if (this.enemyFactory[i].isUse) {
                enemys.push(this.enemyFactory[i])

            }
        }
        return enemys;
    }

    //定时器方法
    public timeFunc(){
        this.dispatchEvent(this.release);
    }

    //停止生成
    public stop(){
        this.timer.stop();
        this.timer.removeEventListener(egret.TimerEvent.TIMER,this.timeFunc,this);

    }

    //碰撞检测
    public isHit(e: egret.Sprite): boolean{
        let isHit = false;
        let hit = new Hit(Hit.EventString);
        for (var i = 0; i < this.enemyFactory.length; i++) {
            if (this.enemyFactory[i].isUse == true) {  //遍历敌机对象池
                if (this.enemyFactory[i].bulletType == IdentityType.ENEMY) {  //和主机碰撞检测
                    isHit = Util.hitTest(e, this.enemyFactory[i]);
                    hit.hitType = HitType.OTHER;  
                    if(isHit){
                        console.log('我撞到敌机啦')
                    }
                }

                if (isHit) {  //如果碰撞检测为true，那么触发HitEvent事件，并传递检测结果，并手动调用子弹的回收方法
                    this.dispatchEvent(hit);
                    this.enemyFactory[i].recycle();
                }
            }
        }
        return isHit;
    }


}