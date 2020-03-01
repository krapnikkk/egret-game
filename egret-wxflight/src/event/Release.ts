// TypeScript file
class Release extends egret.Event {
    public static EventString = "release";
    public enemytType: EnemyType;
    public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
    }
}