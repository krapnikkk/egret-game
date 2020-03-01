// TypeScript file
class GameSetting extends eui.Component{
    private static shared:GameSetting;
    public static Shared():GameSetting{
        if(GameSetting.shared == null){
            GameSetting.shared = new GameSetting();
        }
        return GameSetting.shared;
    }

    private btn_agree:eui.Button;
    private img_music_disable:eui.Image;
    private img_sound_disable:eui.Image;
    private btn_sound:eui.Button;
    private btn_music:eui.Button;

    public constructor(){
        super();
        this.skinName = "src/Game/GameSettingSkin.exml";
        this.btn_agree.addEventListener(egret.TouchEvent.TOUCH_TAP,this.click_agree,this);
        this.btn_sound.addEventListener(egret.TouchEvent.TOUCH_TAP,this.click_sound,this);
        this.btn_music.addEventListener(egret.TouchEvent.TOUCH_TAP,this.click_music,this);
        //通过声音管理类来处理界面显示
        this.update_buttonstate();
    }

    public click_agree(){
        SoundManager.Shared().PlayClick();
        this.parent.removeChild(this);
        
    }

    public click_sound(){
        SoundManager.Shared().PlayClick();
        SoundManager.Shared().IsSound = !SoundManager.Shared().IsSound;
        this.update_buttonstate();
    }

    public click_music(){
        SoundManager.Shared().PlayClick();
        SoundManager.Shared().IsMusic = !SoundManager.Shared().IsMusic;
        this.update_buttonstate();
    }

    public update_buttonstate(){
        this.img_music_disable.visible = !SoundManager.Shared().IsMusic;
        this.img_sound_disable.visible = !SoundManager.Shared().IsSound;
    }
}