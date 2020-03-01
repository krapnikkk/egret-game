// TypeScript file
class Grid {
    //舞台宽高及栅格的行列
    public clientWidth:number = Config.getStageWidth();
    public clientHeight:number = Config.getStageHeight();

    public gridRow:number = Config.row;
    public gridColumn:number = Config.column;
    public gridRect:number;//栅格的宽高
    public mines:number = Config.count;//地雷個數

    public signArray:Array<any> = [];//标记地图
    public mineField:Array<any>;//栅格地图二维数组
    private static shared:Grid;
    public static Shared(){
        if(Grid.shared == null){
            Grid.shared = new Grid();
        }
        return Grid.shared;
    }


    public initData(){
        this.gridRect = Math.floor(this.clientWidth/this.gridRow);
        //生成二維數組
        this.mineField = new Array();
        for(let i = 0;i<this.gridRow;i++){
            this.mineField[i] = new Array();
            for(let j = 0;j<this.gridColumn;j++){
                this.mineField[i].push(0);
            }
        }
        //隨機生成地雷数据
        let placeMines:number = 0;
        let randomRow,randomCol:number;
        console.log(this.mines);
        while(placeMines<this.mines){
            randomRow = Math.floor(Math.random()*this.gridRow);
            randomCol = Math.floor(Math.random()*this.gridColumn);
            if(this.mineField[randomRow][randomCol]===0){
               this.mineField[randomRow][randomCol]=9; 
               placeMines++;
            }
            
        }

        //设置地雷旁边的提示
        for(let i = 0;i<this.gridColumn;i++){
            for(let j =0;j<this.gridRow;j++){
                if(this.mineField[i][j]==9){
                    for(let h= -1;h <= 1; h++){
                        for(let w = -1; w <= 1;w++){
                            if(this.tileValue(i+h,j+w) !=9 && this.tileValue(i+h,j+w) != -1){
                                this.mineField[i+h][j+w]++;
                            }
                        }
                    }
                }
            }
        }
        console.log(this.mineField);


        

    }

    //判断数组周边是否存在边界
    public tileValue(row:number,col:number):number{
        if(this.mineField[row]==undefined||this.mineField[row][col]==undefined){
            return -1;
        }else{
            return this.mineField[row][col];
        }
    
    }

    //判断该行列是否已经被标记
    public checkSign(row:number,col:number):boolean{
        for(let i = 0;i<this.signArray.length;i++){
            let sign = this.signArray[i];
            if(sign!=undefined&&sign[0]==row&&sign[1]==col){
                return true;
            }
        }
        return false;
    }

}