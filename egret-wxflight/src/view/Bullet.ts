// TypeScript file
class Bullet extends egret.Sprite{
    private bullet:egret.Bitmap;
    public bulletType:IdentityType;
    public isUse:boolean = false;//是否正在使用
    private speed:number = 5;//子弹速度

    private root:GameScene;

    public constructor(root:GameScene){
        super();
        this.root = root;
        this.bullet = new egret.Bitmap();
        this.addChild(this.bullet);

    }

    public createBullet(type: IdentityType, x: number, y: number) {
        this.isUse = true;
        this.x = x;
        this.y = y;
        this.bulletType = type;
        if (type == IdentityType.ENEMY) {
            this.bullet.texture = RES.getRes("bullet1_png")
        }
        else {
            this.bullet.texture = RES.getRes("bullet2_png")
        }

        this.root.addChildAt(this, 10)
        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this)
    }

    private onFrame(){
        if(this.isUse){
            if(this.bulletType == IdentityType.ENEMY){
                this.y += this.speed* 2;
                if(this.y >= Util.getStageHeight()){
                        this.recycle();
                }
            }else{
                this.y -= this.speed;
                if(this.y<=0){
                        this.recycle();
                }
            }
        }
    }
    
    public recycle(){
        this.parent.removeChild(this);
        this.isUse = false;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this)
    }

}

/**
 * 子弹类型
 */
enum IdentityType {
    /**
     * 敌人
     */
    ENEMY,
    /**
     * 玩家
     */
    PLAYER
}