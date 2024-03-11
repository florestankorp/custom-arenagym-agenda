/* eslint-disable @typescript-eslint/no-unsafe-call */
import { render, screen } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';
import Nav from './Nav.svelte';
describe('Nav', () => {
	test('shows the todo text when rendered', () => {
		render(Nav);
		expect(screen.getByText('Previous')).toBeInTheDocument();
	});
});
