//单个问题关卡的数据结构
class LevelDataItem{
    public answer:string;
    public img:string;
    public word:string;
    public tip:string;
    public content:string;
}

//关卡数据管理器
class LevelDataManager{
    private static shared:LevelDataManager;
    public static Shared(){
        if(LevelDataManager.shared == null){
            LevelDataManager.shared =  new LevelDataManager();
        }
        return LevelDataManager.shared;
    }

    //一个关卡的保存数据组
    private items:LevelDataItem[]=[];


    public constructor(){
        this.items = RES.getRes("questions_json");
    }

    //通过关卡号获取关卡数据
    public GetLevel(level:number):LevelDataItem{
        
        if(level<0){
            level = 0;
        }else if(level>=this.items.length){
            level=this.items.length-1;
        }
        return this.items[level];
    }

    //获取当前游戏的答题进度
    public get Milestone():number{
        let milestone = egret.localStorage.getItem("crossword_milestone");
        if(milestone === ""|| milestone === null){
            milestone = "1";
        }
        return parseInt(milestone);
    }

    //设置当前游戏的答题进度
    public set Milestone(value:number){
        egret.localStorage.setItem("crossword_milestone",value.toString());
    }


}

