const svg = (label: string, width: number, height: number) =>
	`data:image/svg+xml;utf8,${encodeURIComponent(
		`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img"><rect width="${width}" height="${height}" fill="#256ef4"/><text x="50%" y="50%" fill="#ffffff" font-family="sans-serif" font-size="${Math.round(height / 6)}" font-weight="700" text-anchor="middle" dominant-baseline="central">${label}</text></svg>`,
	)}`;

export const SAMPLE_IMAGE = svg("KRDS", 640, 360);

export const SAMPLE_POSTER = svg("VIDEO", 640, 360);

export const SAMPLE_VIDEO = "data:video/mp4;base64,";
