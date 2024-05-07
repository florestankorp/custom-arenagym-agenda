declare namespace svelteHTML {
	interface HTMLAttributes<T> {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'on:click_outside'?: CompositionEventHandler<T>;
	}
}
