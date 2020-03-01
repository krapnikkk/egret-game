// TypeScript file
class Hit extends egret.Event {

	public static EventString = "hit";

	public hitType: HitType = HitType.OTHER;

	public enemy:Enemy = null;

	public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
		super(type, bubbles, cancelable);
	}
}
enum HitType {
	PLAYER_TO_ENEMY,
	ENEMY_TO_PLAYER,
	OTHER
}