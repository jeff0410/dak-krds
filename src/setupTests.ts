import "@testing-library/jest-dom/vitest";

if (!window.matchMedia) {
	window.matchMedia = (query: string) =>
		({
			matches: false,
			media: query,
			onchange: null,
			addListener: () => {},
			removeListener: () => {},
			addEventListener: () => {},
			removeEventListener: () => {},
			dispatchEvent: () => false,
		}) as MediaQueryList;
}

if (!Element.prototype.scrollIntoView) {
	Element.prototype.scrollIntoView = () => {};
}

if (!window.ResizeObserver) {
	window.ResizeObserver = class {
		observe() {}
		unobserve() {}
		disconnect() {}
	} as unknown as typeof ResizeObserver;
}

if (!window.IntersectionObserver) {
	window.IntersectionObserver = class {
		readonly root = null;
		readonly rootMargin = "";
		readonly thresholds: readonly number[] = [];
		observe() {}
		unobserve() {}
		disconnect() {}
		takeRecords(): IntersectionObserverEntry[] {
			return [];
		}
	} as unknown as typeof IntersectionObserver;
}
