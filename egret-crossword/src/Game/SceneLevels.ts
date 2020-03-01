class SceneLevels extends eui.Component{
    private btn_back:eui.Button;
    private btn_setting:eui.Button;
    private group_levels:eui.Group;
    private img_arrow:eui.Image;
    private arrow_tw:boolean = false;
    private static shared:SceneLevels;//根据该属性判断是否已经创建单例

    private LevelIcons:LevelIcon[] = [];//关卡图片数组
    private sel_level: number = 0;

    public static Shared(){
        if(SceneLevels.shared == null){
            SceneLevels.shared = new SceneLevels(); 
        }
        return SceneLevels.shared;
    }

    public constructor(){
        super(); 
        this.skinName = "src/Game/SceneLevelsSkin.exml";
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_back,this);
        this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_setting,this);

        let group = new eui.Group();//地图背景
        group.width = GameConfig.stage_width;
        group.height = GameConfig.map_spany * GameConfig.level_amount;//算出最大高度
        //开启位图缓存模式
        // group.cacheAsBitmap = true;
        let group_count = group.height/GameConfig.stage_height;

        //填充地图图片
        for(let i = 0;i<group_count;i++){
            let level_img = new eui.Image();
            level_img.source = RES.getRes("GameBG2_jpg");
            level_img.y = i*GameConfig.stage_height;
            level_img.touchEnabled = false;
            this.group_levels.addChildAt(level_img,0);
        }

        var milestone: number = LevelDataManager.Shared().Milestone;
        //以正弦曲线绘制关卡图标的路径
        for(let i = 0; i<GameConfig.level_amount;i++){
            let icon = new LevelIcon();
            icon.Level = i + 1;
            icon.y = GameConfig.map_spany * i /2;
            icon.x = Math.sin(icon.y / 180 * Math.PI) * 200 + group.width / 2;
            icon.y += GameConfig.map_spany * i /2;
            icon.y = group.height - icon.y - GameConfig.map_spany;
            icon.width = 77;
            icon.height = 77;
            group.addChild(icon);
             //依据进度设置关卡显示
            icon.enabled = i < milestone;
            this.LevelIcons.push(icon);
            icon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_level,this);
        }
        this.group_levels.addChild(group);//填充到eui

        //卷到最底层
        this.group_levels.scrollV = group.height - 1100;//Scroller滚动到指定坐标scrollV
        
        //跟踪箭头
        this.img_arrow = new eui.Image();
        this.img_arrow.source = RES.getRes("PageDownBtn_png");
        this.img_arrow.touchEnabled = false;
        this.img_arrow.width = 124;
        this.img_arrow.height = 76;
        this.img_arrow_pos(group.getChildAt(0).x - this.img_arrow.width / 2 + group.getChildAt(0).width / 2,group.getChildAt(0).y - this.img_arrow.height - 20);
        group.addChild(this.img_arrow);
        

    }


    private onclick_level(e:egret.TouchEvent){
        SoundManager.Shared().PlayClick();
        let icon = <LevelIcon>e.currentTarget;
        if(this.sel_level != icon.Level){
            this.sel_level = icon.Level;
            this.img_arrow_pos(icon.x- this.img_arrow.width / 2 + icon.width / 2,icon.y- this.img_arrow.height - 20);
        }else{
            //进入并开始游戏
            this.parent.addChild(SceneGame.Shared());
            SceneGame.Shared().InitLevel(icon.Level);
            this.parent.removeChild(this);
        }
    }

    private img_arrow_pos(posX:number,posY:number){
        this.img_arrow.x = posX;
        this.img_arrow.y = posY;
        if(this.arrow_tw){
            egret.Tween.removeTweens(this.img_arrow);
        }
        let tw = egret.Tween.get( this.img_arrow,{ loop:true} );
        tw.to( {y:this.img_arrow.y + 10}, 500 );
        this.arrow_tw = true;
    }

    private onclick_back(){
        console.log("back");
        SoundManager.Shared().PlayClick();
        this.parent.addChild(SceneBegin.Shared());
        this.parent.removeChild(this);
    }

    //打开指定的关卡，如果大于最远关卡，则保存数据也跟着调整
    public OpenLevel(level:number){
        let icon = this.LevelIcons[level - 1];
        icon.enabled = true;
        if(level > LevelDataManager.Shared().Milestone){
            LevelDataManager.Shared().Milestone = level;
            //同时将选定
            this.img_arrow_pos(icon.x,icon.y);
            this.sel_level = icon.Level;
        }
    }

    private onclick_setting(){
        SoundManager.Shared().PlayClick();
        this.addChild(GameSetting.Shared());
    }
}