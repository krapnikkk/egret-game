// TypeScript file
class Bullet extends egret.Sprite{
    private _bullet:egret.Bitmap;
    private _speed:number = 1500;
    public _vector:egret.Point = null;//向量
    public constructor(){
        super();
        this._bullet = new egret.Bitmap(RES.getRes('bullet_95m_png'));
        this.addChild(this._bullet);
        this.anchorOffsetX = this.width/2;
    }

    public onUpdate(span){
        if(this._vector != null){
            this.x += this._vector.x * this._speed * (span/1000);
            this.y += this._vector.y * this._speed * (span/1000);
            if(this.y <= -this.height){
                if(this.parent){
                    this.parent.removeChild(this);
                }
            }
        }
    }
}