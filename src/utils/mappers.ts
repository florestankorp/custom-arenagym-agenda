/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
/* eslint-disable sort-imports */
/* eslint-disable sort-vars */

import { getDay } from 'date-fns/getDay';
import { ShowRangeEnum, Weekday, type Training, type TrainingType } from '../models';

export function initializeMap(): Map<Weekday, Training[]> {
	const initializedMap = new Map<Weekday, Training[]>();

	Object.values(Weekday).forEach((key) => {
		if (typeof key === 'number') {
			initializedMap.set(key, []);
		}
	});

	return initializedMap;
}

export function mapHTMLToData(html: string, showRange: ShowRangeEnum): Map<Weekday, Training[]> {
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');
	const itemsDayElements = doc.querySelectorAll('.items-day');
	const allTrainings = initializeMap();

	// ensure that map index corresponds with weekday nr
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	const weekdayToday = getDay(new Date()) - 1;
	// Iterate over each 'items-day' element
	itemsDayElements.forEach((itemsDayElement, index) => {
		const ochtendElement = itemsDayElement.querySelector('.ochtend');
		const middagElement = itemsDayElement.querySelector('.middag');
		const avondElement = itemsDayElement.querySelector('.avond');

		[ochtendElement, middagElement, avondElement].forEach((daytime) => {
			if (daytime === null) {
				return;
			}

			daytime.querySelectorAll('.evtitem').forEach((evtitem) => {
				const title = evtitem.querySelector('.title')!.textContent as TrainingType;
				const time = evtitem.querySelector('.time')!.textContent;
				const trainer = evtitem.querySelector('.trainer')!.textContent;

				allTrainings.get(index)!.push({
					time,
					title,
					trainer,
				});
			});
		});
	});

	if (showRange === ShowRangeEnum.Today) {
		const todayTrainings = allTrainings.get(weekdayToday);
		const todaysTrainings = new Map<Weekday, Training[]>();
		todaysTrainings.set(weekdayToday, todayTrainings!);
		return todaysTrainings;
	}

	return allTrainings;
}
