import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import Nav from './Nav.svelte';
describe('Nav', () => {
	test('shows the todo text when rendered', () => {
		render(Nav, { weekNumber: 1, year: 2030 });

		const previousButton = screen.getByRole('button', { name: 'Previous' });
		const nextButton = screen.getByRole('button', { name: 'Next' });

		expect(previousButton).toBeInTheDocument();
		expect(nextButton).toBeInTheDocument();
	});

	test('should dispatch data when next button is clicked', async () => {
		const { component } = render(Nav, { weekNumber: 1, year: 2100 });
		const user = userEvent.setup();
		let mockDispatchData = null;
		const mockDispatch = vi.fn(() => (mockDispatchData = { data: { weekNumber: 1, year: 2100 } }));
		component.$on('data', mockDispatch);
		const nextButton = screen.getByRole('button', { name: 'Next' });

		await user.click(nextButton);

		expect(mockDispatch).toHaveBeenCalled();
		expect(mockDispatchData).toEqual({ data: { weekNumber: 1, year: 2100 } });
	});

	test('should dispatch data when previous button is clicked', async () => {
		const user = userEvent.setup();
		const { component } = render(Nav, { weekNumber: 1, year: 2100 });
		let mockDispatchData = null;
		const mockDispatch = vi.fn(() => (mockDispatchData = { data: { weekNumber: 1, year: 2100 } }));
		component.$on('data', mockDispatch);
		const nextButton = screen.getByRole('button', { name: 'Previous' });

		await user.click(nextButton);

		expect(mockDispatch).toHaveBeenCalled();
		expect(mockDispatchData).toEqual({ data: { weekNumber: 1, year: 2100 } });
	});
});
