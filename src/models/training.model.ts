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
	INSTRUCTIE_OPEN_GYM = 'Instructie Open Gym',
	CF_OPEN_BOX = 'CF Open Box',
	CF_GYMNASTICS = 'CF Gymnastics',
	CF_WEIGHTLIFTING = 'CF Weightlifting',
	CROSSFIT_WOD = 'CrossFit WOD',
	CROSSFIT_ADVANCED = 'CrossFit advanced',
	CROSSFIT_FUNDAMENTALS = 'CrossFit Fundamentals',
	HYROX = 'Hyrox',
	KICKBOKSEN = 'Kickboksen',
	KICKBOKSEN_RECREANTEN = 'Kickboksen recreanten',
	KICKBOKSEN_ADVANCED = 'Kickboksen advanced',
	KIDS_KICKBOKSEN = 'Kids kickboksen',
	BOKSEN = 'Boksen',
	ZAKTRAINING = 'Zaktraining',
	KIDS_PERFORMANCE = 'Kids performance',
	LADIES_ONLY_FIT_TALITY = 'Ladies only - FIT-TALITY',
	LADIES_ONLY_HIIT = 'Ladies only - HIIT',
	CIRCUIT_TRAINING = 'Circuit-training',
}

export interface Training {
	title: TrainingType | null;
	time: string | null;
	trainer: string | null;
}
