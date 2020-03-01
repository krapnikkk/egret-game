// TypeScript file
class Shot extends egret.Event {
    public static EventString = "shot";
    public bulletType: IdentityType;//子弹类型
    public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
    }
}