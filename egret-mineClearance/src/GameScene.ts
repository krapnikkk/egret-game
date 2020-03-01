// TypeScript file
class GameScene extends egret.Sprite{
    private _gameScene:egret.Sprite = new egret.Sprite();
    private grid:Grid = Grid.Shared();
    private toolBar:egret.TextField = new egret.TextField();
    private modeText:egret.TextField = new egret.TextField();
    private isEnd:boolean = false;
    private _gameMode:boolean = false;//默认扫雷模式
    private _signCount:number = 0;//标记数目

    private static shared:GameScene;
    public static Shared(){
        if(GameScene.shared == null){
            GameScene.shared = new GameScene();
        }
        return GameScene.shared;
    }

    public constructor(){
        super();
    }

    //游戏入口
    public init(){
        this.isEnd = false;
        this._gameMode = false;
        this._signCount = 0;
        this.grid.mineField=[];//地雷地图
        this.grid.signArray=[];//标记地图
        this.grid.initData();
        this.addChild(this._gameScene);
        
        this.toolBar.width = this.modeText.width = 200;
        this.toolBar.bold = this.modeText.bold = true; 
        this.toolBar.x = this.modeText.x = Config.getStageWidth()/2 - 100;
        this.modeText.y = Config.getStageHeight() - 200;
        this.toolBar.y = Config.getStageHeight() - 100;
        this.toolBar.text = '游戏进行中';
        this.modeText.text = "扫雷模式";

        this.addChild(this.toolBar);
        this.addChild(this.modeText);
        this.createButton();
        this.createMap();
    }

    private createButton(){
        let btn_mode:egret.Sprite = new egret.Sprite();
        btn_mode.graphics.beginFill(0x218868);
        btn_mode.graphics.drawRect(0,0,200,50);
        btn_mode.x = Config.getStageWidth()/2 -125;
        btn_mode.y = Config.getStageHeight()-160;
        let btn_mode_msg:egret.TextField = new egret.TextField();
        btn_mode_msg.text = "点击切换模式";
        btn_mode_msg.x = btn_mode_msg.y =  10;
        btn_mode.addChild(btn_mode_msg);
        this.addChild(btn_mode);
        btn_mode.touchEnabled = true;
        btn_mode.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changeMode,this);

        let btn_replay:egret.Sprite = new egret.Sprite();
        btn_replay.graphics.beginFill(0x218868);
        btn_replay.graphics.drawRect(0,0,200,50);
        btn_replay.x = Config.getStageWidth()/2 -125;
        btn_replay.y = Config.getStageHeight()-60;
        let btn_replay_msg:egret.TextField = new egret.TextField();
        btn_replay_msg.text = "点击重新开始";
        btn_replay_msg.x = btn_replay_msg.y =  10;
        btn_replay.addChild(btn_replay_msg);
        this.addChild(btn_replay);
        btn_replay.touchEnabled = true;
        btn_replay.addEventListener(egret.TouchEvent.TOUCH_TAP,this.replay,this);
    }

    //更改当前游戏模式
    private changeMode(){
        this._gameMode = !this._gameMode;
        if(this._gameMode){
            this.modeText.text = "标记模式";
        }else{
            this.modeText.text = "扫雷模式";
        }
    }

    private createMap(){
        let tile:egret.Bitmap;
        for(let i =0;i<Config.row;i++){
            for(let j = 0;j<Config.column;j++){
                tile = new egret.Bitmap();
                tile.texture = RES.getRes('0_png');
                tile.width = tile.height = this.grid.gridRect; 
                tile.x = j * this.grid.gridRect;
                tile.y = i * this.grid.gridRect;
                tile.name = `tile_${i}_${j}`;
                tile.$touchEnabled = true;
                tile.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTileTouch,this);
                this._gameScene.addChild(tile);
            }
        }
        
    }

    private onTileTouch(event:egret.TouchEvent):void{
        if(!this.isEnd){
            let tile = event.target;
            let tileName = tile.name.split("_");  
            let row:number = Number(tileName[1]);
            let col:number = Number(tileName[2]);
            let val = this.grid.mineField[row][col];
            let idx = +`${row + ''}${col + ''}`;
            if(this._gameMode){//标记模式
                if(!this.grid.checkSign(row,col)){
                    if(this._signCount<this.grid.mines){//标记上限限制
                        tile.texture = RES.getRes('flag_png');
                        // this.grid.signArray.push([row,col]);
                        this.grid.signArray[idx]=[row,col];
                        this._signCount++;
						if(this.isWin()){
							this.isEnd = true;
							this.toolBar.text = "清除完毕，游戏结束！"
							alert('清除完毕，游戏结束！');
						}
                    }else{
                        alert('标记已经达到上限!');
                    }
                }else{
                    this._signCount--;
                    tile.texture = RES.getRes('0_png');
                    this.grid.signArray[idx]=undefined;
                }

            }else{//扫雷模式
                if(!this.grid.checkSign(row,col)){
                    if(val == 0){
                        this.fioodFill(row,col);
                    }else if(val < 9){
                        tile.texture = RES.getRes(`${val}_png`);
                    }else if(val == 9){
                        tile.texture = RES.getRes(`bomb_png`);
                        this.toolBar.text = '游戏失败';
                        this.isEnd = true;
                        alert('扫雷失败，游戏结束！');
                    }
                }else{
                    alert('该位置已经被标记过啦,点击取消标记！');
                }

            }


        }
    }

    private fioodFill(row:number,col:number){
        let tile:egret.Bitmap = this._gameScene.getChildByName(`tile_${row}_${col}`) as egret.Bitmap;
        tile.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTileTouch,this);
        tile.touchEnabled = false;
        tile.texture = RES.getRes(`fail_png`);
        this.grid.mineField[row][col] = -1;
        for(let i = -1;i<=1;i++){
            for(let j =-1;j<=1;j++){
                if((i!=0||j!=0)&&(i==0||j==0)){
                        if(this.grid.tileValue(row+i,col+j) ==0 ){
                        this.fioodFill(row+i,col+j);
                    }
                }
            }
        }
    }    

    private isWin():boolean{
        let num:number = 0;
        for(let i =0;i<this.grid.signArray.length;i++){
                let sign = this.grid.signArray[i];
            if(sign!=undefined&&this.grid.mineField[sign[0]][sign[1]]==9){
                num+=9
            }
        }
        console.log(`当前得分=${num}`);
        if(num==this.grid.mines*9){
            return true;
        }else{
            return false;
        }
    } 

    private replay(){
        let root = this.parent;
        root.removeChild(GameScene.Shared());
        GameScene.shared = null;
        root.addChild(GameScene.Shared());
        GameScene.Shared().init();
        
    }

}