export enum Weekday {
	Monday,
	Tuesday,
	Wednesday,
	Thursday,
	Friday,
	Saturday,
	Sunday
}

export interface Training {
	title: string | null;
	time: string | null;
	trainer: string | null;
}
