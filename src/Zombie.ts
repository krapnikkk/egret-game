// TypeScript file
class Zombie extends egret.Sprite{
    private _zombie:egret.Bitmap;
    public _speed:number = 250;
    private _framesindex:number = 0;
    private _frametimer:number = 0;
    protected _frames:egret.Texture[]=[];
    private _frames_die:egret.Texture[]=[];
    //状态
    public zombieState:ZombieState = ZombieState.Run;
    public HP:number = 2;
    public Score:number = 100;

    public constructor(){
        super();
        this._zombie = new egret.Bitmap(RES.getRes('enemy_05_walk_front_00_png'));
        this.addChild(this._zombie);
        this.initZombie();
        for(let i = 0;i<6;i++){
            this._frames_die.push(RES.getRes(`enemy_dead_01_0${i}_png`));
        }
    }

    protected initZombie(){
        for(let i = 0;i<7;i++){
            this._frames.push(RES.getRes(`enemy_05_walk_front_0${i}_png`));
        }
    }

    public onUpdate(span:number){
        if(this.zombieState==ZombieState.Run){
            this.y += this._speed * (span/1000);
        }

        if(this.y>=Util.getStageHeight()-50){
            this.parent.removeChild(this);
        }

        this._frametimer += span;
        if(this._frametimer>60){
            this._frametimer = 0;
            if(this.zombieState == ZombieState.Run){
                this._zombie.texture = this._frames[this._framesindex];
                this._framesindex < this._frames.length - 1 ? this._framesindex ++ :this._framesindex = 0;
            }else{
                if(this._framesindex < this._frames_die.length){
                    this._zombie.texture = this._frames_die[this._framesindex];
                    this._framesindex ++;
                }
                this.alpha <= 0 ?this.parent.removeChild(this):this.alpha-=0.05;//播放死亡动画后移除
            }

        }
    }

    public dead(){
        this.zombieState = ZombieState.Dead;
        this._framesindex = 0;
    }

    public getBlock():egret.Rectangle{
        return new egret.Rectangle(this.x + 10,this.y + 10 , this.width -10 ,this.height - 10);
    }

}

enum ZombieState{
    Run,
    Dead
}

class Zombie1 extends Zombie{
    protected initZombie(){
        this.HP = 4;
        this.Score = 400;
        this._speed = 300;
        for(let i = 0;i<7;i++){
            this._frames.push(RES.getRes(`enemy_08_walk_front_0${i}_png`));
        }
    }
}