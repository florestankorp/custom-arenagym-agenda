/** Dispatch event on click outside of node */
export function clickOutside(node: Node): {
	destroy: () => void;
} {
	const handleClick = (event: Event): void => {
		if (!node.contains(event.target as Node) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('click_outside', { detail: node }));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy(): void {
			document.removeEventListener('click', handleClick, true);
		},
	};
}
