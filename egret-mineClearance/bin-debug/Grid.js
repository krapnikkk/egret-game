var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var Grid = (function () {
    function Grid() {
        //舞台宽高及栅格的行列
        this.clientWidth = Config.getStageWidth();
        this.clientHeight = Config.getStageHeight();
        this.gridRow = Config.row;
        this.gridColumn = Config.column;
        this.mines = Config.count; //地雷個數
        this.signArray = []; //标记地图
    }
    Grid.Shared = function () {
        if (Grid.shared == null) {
            Grid.shared = new Grid();
        }
        return Grid.shared;
    };
    Grid.prototype.initData = function () {
        this.gridRect = Math.floor(this.clientWidth / this.gridRow);
        //生成二維數組
        this.mineField = new Array();
        for (var i = 0; i < this.gridRow; i++) {
            this.mineField[i] = new Array();
            for (var j = 0; j < this.gridColumn; j++) {
                this.mineField[i].push(0);
            }
        }
        //隨機生成地雷数据
        var placeMines = 0;
        var randomRow, randomCol;
        console.log(this.mines);
        while (placeMines < this.mines) {
            randomRow = Math.floor(Math.random() * this.gridRow);
            randomCol = Math.floor(Math.random() * this.gridColumn);
            if (this.mineField[randomRow][randomCol] === 0) {
                this.mineField[randomRow][randomCol] = 9;
                placeMines++;
            }
        }
        //设置地雷旁边的提示
        for (var i = 0; i < this.gridColumn; i++) {
            for (var j = 0; j < this.gridRow; j++) {
                if (this.mineField[i][j] == 9) {
                    for (var h = -1; h <= 1; h++) {
                        for (var w = -1; w <= 1; w++) {
                            if (this.tileValue(i + h, j + w) != 9 && this.tileValue(i + h, j + w) != -1) {
                                this.mineField[i + h][j + w]++;
                            }
                        }
                    }
                }
            }
        }
        console.log(this.mineField);
    };
    //判断数组周边是否存在边界
    Grid.prototype.tileValue = function (row, col) {
        if (this.mineField[row] == undefined || this.mineField[row][col] == undefined) {
            return -1;
        }
        else {
            return this.mineField[row][col];
        }
    };
    //判断该行列是否已经被标记
    Grid.prototype.checkSign = function (row, col) {
        for (var i = 0; i < this.signArray.length; i++) {
            var sign = this.signArray[i];
            if (sign != undefined && sign[0] == row && sign[1] == col) {
                return true;
            }
        }
        return false;
    };
    return Grid;
}());
__reflect(Grid.prototype, "Grid");
