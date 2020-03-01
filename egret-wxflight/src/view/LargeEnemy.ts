// TypeScript file
class LargeEnemy extends Enemy{
    private explodetTimer:egret.Timer = new egret.Timer(1000/10);
    private timer:egret.Timer = new egret.Timer(1000/10);
    private index:number = 0;
    public constructor(root:GameScene){
        super(root,EnemyType.LARGE);
            this.life = 3;
            this.width = 165;
            this.height = 246;
            this.shotAni();

    }

    //发射动效
    public shotAni(){
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.enterFrame,this);
        this.timer.start();
    }

    public enterFrame(){

        if(this.index){
            this.enemy.texture = RES.getRes('enemy3_n1_png');
            this.index = 0;
        }else{
            this.enemy.texture = RES.getRes('enemy3_n2_png');
            this.index++;
        }

    }

    //爆炸特效
    public explode(){
        this.timer.removeEventListener(egret.TimerEvent.TIMER,this.enterFrame,this);
        this.timer.stop();
        this.index = 0;
        this.explodetTimer.addEventListener(egret.TimerEvent.TIMER,this.enterFrameHandler,this);
        this.explodetTimer.start();
    }

    //TimerEvent制作帧动画
    private enterFrameHandler(e:egret.TimerEvent){
        this.index ++;
        this.enemy.texture = RES.getRes(`enemy3_down${this.index+''}_png`);
        if(this.index>4){
            this.explodetTimer.stop();
            this.explodetTimer.removeEventListener(egret.TimerEvent.TIMER,this.enterFrameHandler,this);
            this.index = 0;
        }

    }




}