// TypeScript file
class Enemy extends egret.Sprite{
    public enemy:egret.Bitmap;
    private moveTimer:egret.Timer;
    private speed:number = 5;
    private enemyType:EnemyType;
    public isUse:boolean = false;
    private root:GameScene;

    //发射子弹
    private shot:Shot;
    private shotTime:number = 500;
    private shotTimer:egret.Timer;

    //血量
    public life:number;
    public hitCount:number = 0;


    public constructor(root:GameScene,type:EnemyType){
        super();
        this.root = root;
        this.enemyType = type;
        this.enemy = new egret.Bitmap();
        this.addChild(this.enemy);
        
    }

    public createEnemy() {
        this.isUse = true;
        this.x = Math.random()*(Util.getStageWidth() - this.width);
        this.y = - this.height;
        this.root.addChildAt(this, 10)
        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);

        //发射子弹
        this.shot = new Shot(Shot.EventString);
        this.shot.bulletType = IdentityType.ENEMY;
        this.addEventListener(Shot.EventString, (e: Shot) => {
            let bullet = BulletFactory.Shared().getBullet();
            if (bullet == undefined) {
                console.log("对象池中没有对象");
                return;
            }
            let x = this.x + this.width / 2 - 5;
            let y = this.y + this.height + 10;
            bullet.createBullet(e.bulletType, x, y);
        }, this);

        this.shotTimer = new egret.Timer(this.shotTime);
        this.shotTimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.shotTimer.addEventListener(egret.TimerEvent.COMPLETE, ()=>{}, this);
        this.shotTimer.start();

    }

    //移动
    public onFrame(){
        if (this.isUse) {
            this.y += this.speed;
            if (this.y >= Util.getStageHeight()) {
                //从父节点中移除
                if (this.parent) {
                    this.parent.removeChild(this);
                    this.recycle();
                }
            }
        }
    }

    public recycle(){
        // console.log("敌机回收")
        this.isUse = false;
        this.hitCount = 0;
        if (this.parent){
            this.parent.removeChild(this);
        }

        this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this)
    }

    
    public timerFunc(e: egret.TimerEvent) {
        if(this.isUse){
            this.dispatchEvent(this.shot);
        }
        
    }

}

enum EnemyType{
    LARGE,
    SMALL,
    LITTLE
}