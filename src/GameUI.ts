// TypeScript file
class GameUI extends eui.Component{
    private lb_score:eui.Label;
    private lb_time:eui.Label;
    private lb_over_score:eui.Label;
    private lb_best_score:eui.Label;
    private group_over:eui.Group;
    private btn_replay:eui.Button;

    private group_effect:eui.Group;

    public constructor(){
        super();
        this.skinName = "src/GameUISkin.exml";
        this.width = Util.getStageWidth();
        this.height = Util.getStageHeight();
        this.btn_replay.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickReplay,this);
        this.onClickReplay();
        this.Time = 0;
    }

    public onClickReplay(){
        this.group_over.visible = false;
        this.Score = 0;
        this.Time = 30000;
    }

    public set Score(value:number){
        this.lb_score.text = value.toString();
    }

    public get Score():number{
        return parseInt(this.lb_score.text);
    }

    private _time:number;
    public set Time(value:number){
        this._time = value;
        if(this._time<=0){
            this._time = 0;
            this.ShowOver();
        }
        let s = Math.floor(this._time/1000),
            m = this._time % 1000;
        this.lb_time.text = `${s}.${m}`;
    }

    public get Time():number{
        return this._time;
    }

    public ShowOver(){
        this.group_over.visible = true;
        this.lb_over_score.text = this.Score.toString();
        if(this.Score > this.getBestScore()){
            this.setBestScore(this.Score);
        }
        this.setBestScore(this.Score);
        this.lb_best_score.text = this.getBestScore().toString();
    }

    public getBestScore():number{
        let str = egret.localStorage.getItem('best_score');
        if(str==null){
            return 0;
        }else{
            return parseInt(str);
        }
    }

    public setBestScore(value:number){
        egret.localStorage.setItem('best_score',value.toString());
    }

    public addSocreEffect(x:number,y:number,score:number){
        let eff =  new eui.Label();
        eff.text = score.toString();
        eff.x = x;
        eff.y = y;
        eff.stroke = 3;
        this.group_effect.addChild(eff);
        let tx = this.lb_score.x + this.lb_score.width,
            ty = this.lb_score.y;
        egret.Tween.get(eff)
            .to({"x":tx,"y":ty},500,egret.Ease.circInOut)
            .call(this.addScore,this,[score])
            .call(this.removeEffectFromGroup,this,[eff]);
    }

    private addScore(score:number){
        this.Score += score;
    }

    private removeEffectFromGroup(eff:egret.DisplayObject){
        this.group_effect.removeChild(eff);
    }

    private mcFactory:egret.MovieClipDataFactory = null;
    public addHurtEffect(x:number,y:number){
        if(this.mcFactory == null){
            this.mcFactory = new egret.MovieClipDataFactory(RES.getRes("hurteffect_json"),RES.getRes("hurteffect_png"));
        }
        let mc = new egret.MovieClip(this.mcFactory.generateMovieClipData('eff_hurt_0'));
        mc.x = x;
        mc.y = y;
        mc.gotoAndPlay("play",1);
        this.group_effect.addChild(mc);
        egret.Tween.get(this).wait(200).call(this.removeEffectFromGroup,this,[mc]);

    }

}
