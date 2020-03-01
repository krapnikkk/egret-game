// TypeScript file
class Player extends egret.Sprite{
    private timer:egret.Timer = new egret.Timer(1000/10);
    private list:egret.Bitmap[] = [];
    private currentframe:number = 0;

    private shot:Shot;
    private shotTime:number = 500;
    private shotTimer:egret.Timer;

    public constructor(){
        super();
        for(let i:number=1;i<3;i++){
            let bitmap:egret.Bitmap = new egret.Bitmap();
            bitmap.texture = RES.getRes(`hero${i+''}_png`);
            this.list.push(bitmap);
            this.addChild(bitmap);
            bitmap.visible = false;
        }
        this.list[0].visible = true;
        this.currentframe = 0;
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this)
    }

    //TimerEvent制作帧动画
    private enterFrameHandler(e:egret.TimerEvent){
        this.list[this.currentframe].visible =false;
        this.currentframe < this.list.length -1 ? this.currentframe += 1 :this.currentframe = 0;
        this.list[this.currentframe].visible = true;
    }

    public move(x: number, y: number) {
        if(x>=Util.getStageWidth()-this.width/2){
            this.x = Util.getStageWidth()-this.width/2;
        }else if(x<=this.width/2){
            this.x = this.width/2;
        }else{
            this.x = x;
        }

        if(y>=Util.getStageHeight()-this.height/2){
            this.y = Util.getStageHeight()-this.height/2;
        }else if(y<=this.height/2){
            this.y = this.height/2;
        }else{
		    this.y = y;
        }
	}

    private onAddToStage(){
        //创建系列动画
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.enterFrameHandler,this);
        this.timer.start();
        //发射子弹
        this.shot = new Shot(Shot.EventString);
        this.shot.bulletType = IdentityType.PLAYER;
        this.addEventListener(Shot.EventString, (e: Shot) => {
            let bullet = BulletFactory.Shared().getBullet();
            if (bullet == undefined) {
                console.log("对象池中没有对象");
                return;
            }
            let x = this.x - 5;
            let y = this.y - this.height/2 - 18;
            bullet.createBullet(e.bulletType, x, y);
        }, this);

        this.shotTimer = new egret.Timer(this.shotTime);
        this.shotTimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.shotTimer.addEventListener(egret.TimerEvent.COMPLETE, ()=>{}, this);
        this.shotTimer.start();


    }

    public timerFunc(e: egret.TimerEvent) {
        this.dispatchEvent(this.shot);
    }




}