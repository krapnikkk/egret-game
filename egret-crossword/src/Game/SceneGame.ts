class SceneGame extends eui.Component{
    //对象变量
    private img_question: eui.Image;
    private group_answer:eui.Group;
    private group_word:eui.Group;
    private group_word_length:number;
    private group_answer_length:number;
    private levelIndex:number;
    private btn_setting:eui.Button;
    private btn_back:eui.Button;
    private static shared:SceneGame;

    private group_win: eui.Group;//胜利界面的group控件
	private btn_next: eui.Button;//下一个题目
	private lb_explain: eui.Label;//解释
	private lb_from: eui.Label;//来源

    public static Shared(){
        if(SceneGame.shared == null){
            SceneGame.shared = new SceneGame();
        }
        return SceneGame.shared;
    }

    public constructor(){
        super();
        this.skinName = "src/Game/SceneGameSkin.exml";
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_back,this);
        this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_setting,this);
        this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_next, this);
        this.group_word_length = this.group_word.numChildren;
        this.group_answer_length = this.group_answer.numChildren;
    }


    //初始化关卡
    public InitLevel(level:number){
        this.levelIndex = level;
        let leveldata = LevelDataManager.Shared().GetLevel(level);

        //字段拼接
        let words = leveldata.answer + leveldata.word;
        //随机将一个其他题目的字段混进本题目
        while(words.length == 10){
            let i = Math.floor(Math.random()*GameConfig.level_amount);
            if(i != level){
                let temp = LevelDataManager.Shared().GetLevel(i);
                words += temp.answer + temp.word;
            }
        }

        //字段重排
        let wordlist:string[]=[];
        for(let i = 0;i<words.length;i++){
            wordlist.push(words.charAt(i));//charAt() 方法可返回指定位置的字符。
        }
        wordlist = this.randomlist(wordlist);
        //赋值
        
        for(let i = 0;i<this.group_word_length;i++){//此对象下的子项数目
            let wordrect = <Word>this.group_word.getChildAt(i);
            wordrect.setWordText(wordlist[i]);
            wordrect.visible = true;
        }
        
        for(let i =0;i<this.group_answer_length;i++){
            let answerrect = <AnswerWord>this.group_answer.getChildAt(i);
            answerrect.SetSelectWord(null);//显示文字为空
            answerrect.visible = true;
            answerrect.SelectWord = null;//还原未选择任何字
        }
        
        this.img_question.source = `./resource/assets/${leveldata.img}`;
        
        

    }

    //数组打乱
    private randomlist(arr:any[]):any[]{
        let array = [];
        while(arr.length>0){
            let i =Math.floor(Math.random()*arr.length);
            array.push(arr[i]);
            arr.splice(i,1);
        }
        return array;
    }

    //当字点击的时候，由word类抛出事件，类似事件委托
    public onclick_word(word:Word){
        SoundManager.Shared().PlayWord();
        //找到一个合适的位置添加进答案内容
        let sel:AnswerWord = null;
        for(let i = 0;i<this.group_answer_length;i++){
            //轮询answer是否已填字
            let answer = <AnswerWord>this.group_answer.getChildAt(i);
            if(answer.SelectWord == null){
                sel = answer;
                break;
            }
        }
        //存在合适位置时将字填充，并且判断是否完成填字
        if(sel != null){
            sel.SetSelectWord(word);//填充
            let check_str:string = "";
            for(let i = 0;i < this.group_answer_length;i++){
                let answer = <AnswerWord>this.group_answer.getChildAt(i);
                check_str += answer.getWordText();
            }
            if(check_str == LevelDataManager.Shared().GetLevel(this.levelIndex).answer){
                console.log("win!");
                this.showWin();
            }else{
                if(check_str.length == 4){
                        SoundManager.Shared().PlayWrong();
                }
            }
        }

    }

    private onclick_back(){
        SoundManager.Shared().PlayClick();
        this.parent.addChild(SceneLevels.Shared());
        this.parent.removeChild(this);
    }

    private onclick_setting(){
        SoundManager.Shared().PlayClick();
        this.addChild(GameSetting.Shared());
    }

    private showWin() {
        SoundManager.Shared().PlayRight();
		this.group_win.visible = true;
		var leveldata = LevelDataManager.Shared().GetLevel(this.levelIndex);
		this.lb_from.text = leveldata.tip;
		this.lb_explain.text = leveldata.content;
	}

    private onclick_next(){
        //下一个题目
        SoundManager.Shared().PlayClick();
		this.group_win.visible = false;
		SceneLevels.Shared().OpenLevel(this.levelIndex + 1);
		this.InitLevel(this.levelIndex + 1);
    }
}

