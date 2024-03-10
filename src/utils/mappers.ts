import { Weekday, type Training } from '../models';

export function mapHTMLToData(html: string): Map<Weekday, Training[]> {
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');
	const temp = new Map<Weekday, Training[]>();

	Object.values(Weekday).forEach((key) => {
		if (typeof key === 'number') {
			temp.set(key, []);
		}
	});

	// Select all elements with the class name 'items-day'
	const itemsDayElements = doc.querySelectorAll('.items-day');

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
				const title = evtitem.querySelector('.title')!.textContent;
				const time = evtitem.querySelector('.time')!.textContent;
				const trainer = evtitem.querySelector('.trainer')!.textContent;

				if (title !== 'Fitness' && title !== 'CF Open Box' && title !== 'Instructie Open Gym') {
					temp.get(index)!.push({
						title,
						time,
						trainer
					});
				}
			});
		});
	});

	return temp;
}
