/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
/* eslint-disable sort-imports */
/* eslint-disable sort-vars */

import { Weekday, type Training, type TrainingType } from '../models';

export function initializeMap(): Map<Weekday, Training[]> {
	const initializedMap = new Map<Weekday, Training[]>();

	Object.values(Weekday).forEach((key) => {
		if (typeof key === 'number') {
			initializedMap.set(key, []);
		}
	});

	return initializedMap;
}

export const mapHTMLToData = (html: string): Map<Weekday, Training[]> => {
	const parser = new DOMParser(),
		doc = parser.parseFromString(html, 'text/html'),
		itemsDayElements = doc.querySelectorAll('.items-day'),
		temp = initializeMap();

	// Iterate over each 'items-day' element
	itemsDayElements.forEach((itemsDayElement, index) => {
		const ochtendElement = itemsDayElement.querySelector('.ochtend'),
			middagElement = itemsDayElement.querySelector('.middag'),
			avondElement = itemsDayElement.querySelector('.avond');

		[ochtendElement, middagElement, avondElement].forEach((daytime) => {
			if (daytime === null) {
				return;
			}

			daytime.querySelectorAll('.evtitem').forEach((evtitem) => {
				const title = evtitem.querySelector('.title')!.textContent as TrainingType,
					time = evtitem.querySelector('.time')!.textContent,
					trainer = evtitem.querySelector('.trainer')!.textContent;

				temp.get(index)!.push({
					time,
					title,
					trainer,
				});
			});
		});
	});

	return temp;
};
