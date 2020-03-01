// TypeScript file
class LittleEnemy extends Enemy{
    private timer:egret.Timer = new egret.Timer(1000/10);
    private index:number = 0;
    public constructor(root:GameScene){
        super(root,EnemyType.LITTLE);
            this.width = 51;
            this.height = 39;
            this.life = 1;
            this.enemy.texture = RES.getRes('enemy1_png');
            
    }

    //爆炸特效
    public explode(){
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.enterFrameHandler,this);
        this.timer.start();
    }

    //TimerEvent制作帧动画
    private enterFrameHandler(e:egret.TimerEvent){
        this.index ++;
        this.enemy.texture = RES.getRes(`enemy1_down${this.index+''}_png`);
        if(this.index>4){
            this.timer.stop();
            this.index = 0;
        }
    }


}