/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/prefer-enum-initializers */
export enum Weekday {
	Monday,
	Tuesday,
	Wednesday,
	Thursday,
	Friday,
	Saturday,
	Sunday,
}

export const SELECT_ALL = 'Select all';

export interface Training {
	title: string | null;
	time: string | null;
	trainer: string | null;
}

export enum ShowRangeEnum {
	Today,
	All,
}
