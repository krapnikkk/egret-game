// TypeScript file
class StartUI extends eui.Component{
    public btn_start:eui.Button;
    public constructor(){
        super();
        this.skinName = "src/StartUISkin.exml";
        this.width = Util.getStageWidth();
        this.height = Util.getStageHeight();
        // this.btn_start.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStart,this);
    }

    private onStart(){
        this.parent.addChild(GameSence.getInstance());
        GameSence.getInstance().beginGame();
        this.parent.removeChild(this);

    }
}