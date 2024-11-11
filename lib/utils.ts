import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Get random time between 45 and 90 seconds
export function getRandomTime() {
	return Math.floor(Math.random() * (90 - 45 + 1) + 45);
}

export function cleanYoutubeVideoUrl(url: string) {
	const startIndex = url.indexOf("list=");

	if (startIndex === -1) return url;

	const endIndex = url.indexOf("&", startIndex);

	return url.substring(startIndex + 5, endIndex);
}
