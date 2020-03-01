class SoundManager{
    private static shared:SoundManager;
    public static Shared():SoundManager{
        if(SoundManager.shared == null){
            SoundManager.shared = new SoundManager();
        }
        return SoundManager.shared;
    }

    private _click:egret.Sound;//点击声音
    private _word:egret.Sound;//选择字块的声音
    private _right:egret.Sound;//如果胜利
    private _wrong:egret.Sound;//如果错误
    private _bgm:egret.Sound;//背景音乐
    private _bgm_channel:egret.SoundChannel;//保存用来静音用

    public constructor(){
        this._click = new egret.Sound();
        this._click.load("resource/assets/sound/buttonclick.mp3");
        this._bgm = new egret.Sound();
        this._bgm.load("resource/assets/sound/Music.mp3");
        this._right = new egret.Sound();
        this._right.load("resource/assets/sound/right.mp3");
        this._wrong = new egret.Sound();
        this._wrong.load("resource/assets/sound/wrong.mp3");
        this._word = new egret.Sound();
        this._word.load("resource/assets/sound/type_word.mp3");
    }
    //根据localstorage储存音效&音乐开启情况
     //音乐是否播放，保存设置
    public set IsMusic(value){
        if(!value){
            egret.localStorage.setItem("ismusic","0");
            this.StopBGM();
        }else{
            egret.localStorage.setItem("ismusic","1");
            this.PlayBGM();
        }
    }

    public get IsMusic():boolean{
        var b = egret.localStorage.getItem('ismusic');
        if(b == null || b == ""){
            return true;
        }else{
            return b == "1";
        }
    }


    //音效是否播放，保存设置
    public set IsSound(value){
        if(!value){
            egret.localStorage.setItem("isSound","0");
        }else{
            egret.localStorage.setItem("isSound","1");
        }
    }

    public get IsSound():boolean{
        var b = egret.localStorage.getItem('isSound');
        if(b == null || b == ""){
            return true;
        }else{
            return b == "1";
        }
    }

    public PlayBGM(){
        if(this.IsMusic){
            this._bgm_channel = this._bgm.play(0,0);
        }
    }
    public StopBGM(){
        if(this._bgm_channel != null ){
            this._bgm_channel.stop();
        }
    }

    public PlayClick(){
        if(this.IsSound){//音效开启
            this._click.play(0,1);
        }
    }

    public PlayWord(){
        if(this.IsSound){
            this._word.play(0,1);
        }
    }

    public PlayRight(){
        if(this.IsSound){
            this._right.play(0,1);
        }
    }

    public PlayWrong(){
        if(this.IsSound){
            this._wrong.play(0,1);
        }
    }




}