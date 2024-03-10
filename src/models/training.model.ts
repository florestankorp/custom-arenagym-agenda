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

export enum TrainingType {
	FITNESS = 'Fitness',
	CF_OPEN_BOX = 'CF Open Box',
	INSTRUCTIE_OPEN_GYM = 'Instructie Open Gym',
	CF_WEIGHTLIFTING = 'CF Weightlifting',
	CROSSFIT_WOD = 'CrossFit WOD',
	HYROX = 'Hyrox',
	KICKBOKSEN = 'Kickboksen',
	KICKBOKSEN_RECREANTEN = 'Kickboksen recreanten',
	KICKBOKSEN_ADVANCED = 'Kickboksen advanced',
	BOKSEN = 'Boksen',
	ZAKTRAINING = 'Zaktraining',
	KIDS_PERFORMANCE = 'Kids performance',
	LADIES_ONLY_FIT_TALITY = 'Ladies only - FIT-TALITY',
}

export interface Training {
	title: TrainingType | null;
	time: string | null;
	trainer: string | null;
}
