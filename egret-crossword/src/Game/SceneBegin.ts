class SceneBegin extends eui.Component{
    // 单例
    private static shared:SceneBegin;//根据该属性判断是否已经创建单例

    public static Shared(){
        if(SceneBegin.shared == null){
            SceneBegin.shared = new SceneBegin(); 
        }
        return SceneBegin.shared;
    }

    private btn_begin:eui.Button;
    private btn_setting:eui.Button;
    public constructor(){
        super();
        this.skinName = "src/Game/SceneBeginSkin.exml";
        this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onclick_begin, this);  
        this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_setting,this);
    }


    private onclick_begin(){
        console.log("game start!");
        SoundManager.Shared().PlayClick();
        this.parent.addChild(SceneLevels.Shared());
        this.parent.removeChild(this);
    }
    private onclick_setting(){
        SoundManager.Shared().PlayClick();
        this.addChild(GameSetting.Shared());
    }
}