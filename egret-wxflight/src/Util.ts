class Util{
    public static getStageWidth():number{
        return egret.MainContext.instance.stage.stageWidth;
    }
    public static getStageHeight():number{
        return egret.MainContext.instance.stage.stageHeight;
    }

    //设置对象的中心点，x,y为偏差值
    public static centerPoint(obj:any,x:number,y:number,bool:boolean){
            let offsetX = x||0,offsetY = y||0,
                offsetW = bool?0:obj.width,
                offsetH = bool?0:obj.height;
            obj.x = (this.getStageWidth()-offsetW)/2 - offsetX;
            obj.y = (this.getStageHeight()-offsetH)/2 - offsetY;
        
    }


    //锚点转移
    public static setAnchorCenter(obj:any,x:number,y:number){
        let offsetX = x||0,offsetY = y||0;
        obj.anchorOffsetX = obj.width/2 - offsetX; 
        obj.anchorOffsetY = obj.height/2 - offsetY;
    }

    //基于矩形的碰撞检测
	public static hitTest(obj1: egret.DisplayObject, obj2: egret.DisplayObject): boolean {
		if (obj1 == undefined) { 
			return false; 
		}
		if (obj2 == undefined) { 
            return false; 
        }
		let rect1: egret.Rectangle = obj1.getBounds();
		let rect2: egret.Rectangle = obj2.getBounds();
		rect1.x = obj1.x;
		rect1.y = obj1.y;
		rect2.x = obj2.x;
		rect2.y = obj2.y;
		return rect1.intersects(rect2);
	}

}