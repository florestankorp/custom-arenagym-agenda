import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import WeekSelect from './WeekSelect.svelte';
describe('WeekSelect', () => {
	test('shows the todo text when rendered', () => {
		render(WeekSelect, { weekNumber: 1, year: 2030 });

		const previousButton = screen.getByTestId('button-previous');
		const nextButton = screen.getByTestId('button-next');

		expect(previousButton).toBeInTheDocument();
		expect(nextButton).toBeInTheDocument();
	});

	test('should dispatch data when next button is clicked', async () => {
		const { component } = render(WeekSelect, { weekNumber: 1, year: 2100 });
		const user = userEvent.setup();
		let mockDispatchData = null;
		const mockDispatch = vi.fn(() => (mockDispatchData = { data: { weekNumber: 1, year: 2100 } }));
		component.$on('data', mockDispatch);
		const nextButton = screen.getByTestId('button-next');

		await user.click(nextButton);

		expect(mockDispatch).toHaveBeenCalled();
		expect(mockDispatchData).toEqual({ data: { weekNumber: 1, year: 2100 } });
	});

	test('should dispatch data when previous button is clicked', async () => {
		const user = userEvent.setup();
		const { component } = render(WeekSelect, { weekNumber: 1, year: 2100 });
		let mockDispatchData = null;
		const mockDispatch = vi.fn(() => (mockDispatchData = { data: { weekNumber: 1, year: 2100 } }));
		component.$on('data', mockDispatch);
		const previousButton = screen.getByTestId('button-previous');

		await user.click(previousButton);

		expect(mockDispatch).toHaveBeenCalled();
		expect(mockDispatchData).toEqual({ data: { weekNumber: 1, year: 2100 } });
	});
});
