// TypeScript file
class Config{
    public static row:number = 10;
    public static column:number = 10;
    public static count:number = 10;
    public static getStageWidth():number{
        return egret.MainContext.instance.stage.stageWidth;
    }


    public static getStageHeight():number{
        return egret.MainContext.instance.stage.stageHeight;
    }

}