// TypeScript file
class GameSence extends egret.DisplayObjectContainer{
    private static _instance:GameSence;
    public static getInstance(){
        if(GameSence._instance== null){
            GameSence._instance= new GameSence();
        }
        return GameSence._instance;
    }

    private _gun:egret.Bitmap;
    private _zombies_layer:egret.Sprite;
    private _bullets_layer:egret.Sprite;

    private _gameUI:GameUI = new GameUI();
    public constructor(){
        super();
        let bg = new egret.Bitmap();
       bg.width = Util.getStageWidth();
       bg.height = Util.getStageHeight();
       bg.texture = RES.getRes('bg_png');
       this.addChild(bg);

       this._zombies_layer = new egret.Sprite();
       this.addChild(this._zombies_layer);
       this._bullets_layer = new egret.Sprite();
       this.addChild(this._bullets_layer);

       this._gun = new egret.Bitmap(RES.getRes('gun_gatling_1_png'));
       this._gun.x = Util.getStageWidth()/2;
       this._gun.y = Util.getStageHeight() - this._gun.height/2;    
       Util.setAnchorCenter(this._gun,0,0);

       this.addChild(this._gun);
       this.touchEnabled = true;
       this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
       this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
       this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);

       egret.startTick(this.onUpdate,this);
       this.addChild(this._gameUI);

        let bgm:egret.Sound =  RES.getRes('music_gaming_mp3');
        let bgmchannel = bgm.play(0,0);
        bgmchannel.volume = 0.3;
        this._gunsound =  RES.getRes('machine_gun_mp3');
    }

    private _gunsound:egret.Sound;
    private _lastTimestamp:number = 0;
    private _brithtime:number = 0;

    private _guncd:number = 0;
    private _shot_vector:egret.Point = null;
    private onUpdate(timestamp:number):boolean{
        let span = timestamp - this._lastTimestamp;//间隔时间
        this._lastTimestamp = timestamp;
        this._gameUI.Time -= span;


        //生成僵尸
        this._brithtime +=span;
        if(this._brithtime >= 500){
            this._brithtime = 0;
            let zombie:Zombie;
            if(Math.random()<0.3){
                zombie = new Zombie1();
            }else{
                zombie = new Zombie();
            }
            zombie.x = zombie.width + Math.random()*(Util.getStageWidth()-zombie.width);
            zombie.y = -zombie.height;
            this._zombies_layer.addChild(zombie);
        }

        //遍历僵尸
        for(let i = this._zombies_layer.numChildren - 1;i>=0;i--){//逆向遍历，当对象被移除时可以有效响应
            let zombie = <Zombie>this._zombies_layer.getChildAt(i);
            zombie.onUpdate(span);
            if(zombie.parent == null){//时间惩罚
                this._gameUI.Time -= 1000;
            }
        }



        if(this._gameUI.Time<=0){
            this._zombies_layer.removeChildren();
            this._bullets_layer.removeChildren();
            return;
        }

        //生成子弹
        if(this._shot_vector != null){
            this._guncd += span;
            if(this._guncd>=150){
                this._guncd = 0;
                this.addBullet();
            }
        }

        //遍历子弹
        for(let i = this._bullets_layer.numChildren - 1;i>=0;i--){//逆向遍历，当对象被移除时可以有效响应
            let bullet = <Bullet>this._bullets_layer.getChildAt(i);
            bullet.onUpdate(span);
            //碰撞检测
            let point = new egret.Point(bullet.x,bullet.y);
            for(let j = 0,len = this._zombies_layer.numChildren;j<len;j++){
                let zombie = <Zombie>this._zombies_layer.getChildAt(j);
                if(zombie.zombieState == ZombieState.Dead){
                    continue;//僵尸死亡後消失過程防止被鞭尸
                }
                if(zombie.getBlock().containsPoint(point)){
                    zombie.HP -= 1;
                    if(zombie.HP <= 0){
                        this._gameUI.addSocreEffect(zombie.x,zombie.y,zombie.Score);
                        this._gameUI.addHurtEffect(zombie.x,zombie.y);
                        zombie.dead();
                    }
                    this._bullets_layer.removeChild(bullet);

                    break;
                }
            }
        }

        return false;
    }

    private onTouchBegin(e:egret.TouchEvent){
        let vx = e.stageX - this._gun.x,
            vy = e.stageY - this._gun.y;
        this._gun.rotation = Math.atan2(vy,vx)*180/Math.PI + 90;
        this._shot_vector = new egret.Point(vx,vy);
        this._shot_vector.normalize(1)//向量标准化
    }

    private onTouchMove(e:egret.TouchEvent){
        let vx = e.stageX - this._gun.x,
            vy = e.stageY - this._gun.y;
        this._gun.rotation = Math.atan2(vy,vx)*180/Math.PI + 90;
        this._shot_vector = new egret.Point(vx,vy);
        this._shot_vector.normalize(1)//向量标准化
    }
    
    private onTouchEnd(e:egret.TouchEvent){
        this._shot_vector = null;
    }

    private addBullet(){
        this._gunsound.play(0,1);
        let bullet = new Bullet();
        bullet._vector = this._shot_vector;
        bullet.rotation = Math.atan2(this._shot_vector.y,this._shot_vector.x)*180/Math.PI + 90;
        bullet.x = this._gun.x - 10;
        bullet.y = this._gun.y;
        this._bullets_layer.addChild(bullet);
    }

    public beginGame(){
        this._gameUI.onClickReplay();
    }
    

}