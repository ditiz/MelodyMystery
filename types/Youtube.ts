export type YouTubePlayer = {
	addEventListener: (
		event: string,
		listener: (...args: Array<unknown>) => unknown,
	) => void;
	destroy: () => void;
	getAvailablePlaybackRates: () => ReadonlyArray<number>;
	getAvailableQualityLevels: () => ReadonlyArray<string>;
	getCurrentTime: () => number;
	getDuration: () => number;
	getIframe: () => Record<string, unknown>;
	getOption: () => unknown;
	getOptions: () => unknown;
	setOption: () => void;
	setOptions: () => void;
	cuePlaylist: (
		playlist: string | ReadonlyArray<string>,
		index?: number,
		startSeconds?: number,
		suggestedQuality?: string,
	) =>
		| undefined
		| ((arg0: {
				listType: string;
				list?: string;
				index?: number;
				startSeconds?: number;
				suggestedQuality?: string;
		  }) => void);
	loadPlaylist: (
		playlist: string | ReadonlyArray<string>,
		index?: number,
		startSeconds?: number,
		suggestedQuality?: string,
	) =>
		| unknown
		| ((arg0: {
				listType: string;
				list?: string;
				index?: number;
				startSeconds?: number;
				suggestedQuality?: string;
		  }) => void);
	getPlaylist: () => ReadonlyArray<string>;
	getPlaylistIndex: () => number;
	getPlaybackQuality: () => string;
	getPlaybackRate: () => number;
	getPlayerState: () => number;
	getVideoEmbedCode: () => string;
	getVideoLoadedFraction: () => number;
	getVideoUrl: () => string;
	getVolume: () => number;
	cueVideoById: (
		videoId: string,
		startSeconds?: number,
		suggestedQuality?: string,
	) =>
		| unknown
		| ((arg0: {
				videoId: string;
				startSeconds?: number;
				endSeconds?: number;
				suggestedQuality?: string;
		  }) => void);
	cueVideoByUrl: (
		mediaContentUrl: string,
		startSeconds?: number,
		suggestedQuality?: string,
	) =>
		| unknown
		| ((arg0: {
				mediaContentUrl: string;
				startSeconds?: number;
				endSeconds?: number;
				suggestedQuality?: string;
		  }) => void);
	loadVideoByUrl: (
		mediaContentUrl: string,
		startSeconds?: number,
		suggestedQuality?: string,
	) =>
		| unknown
		| ((arg0: {
				mediaContentUrl: string;
				startSeconds?: number;
				endSeconds?: number;
				suggestedQuality?: string;
		  }) => void);
	loadVideoById: (
		videoId: string,
		startSeconds?: number,
		suggestedQuality?: string,
	) =>
		| unknown
		| ((arg0: {
				videoId: string;
				startSeconds?: number;
				endSeconds?: number;
				suggestedQuality?: string;
		  }) => void);
	isMuted: () => boolean;
	mute: () => void;
	nextVideo: () => void;
	pauseVideo: () => void;
	playVideo: () => void;
	playVideoAt: (index: number) => void;
	previousVideo: () => void;
	removeEventListener: (
		event: string,
		listener: (...args: Array<unknown>) => unknown,
	) => void;
	seekTo: (seconds: number, allowSeekAhead: boolean) => void;
	setLoop: (loopPlaylists: boolean) => void;
	setPlaybackQuality: (suggestedQuality: string) => void;
	setPlaybackRate: (suggestedRate: number) => void;
	setShuffle: (shufflePlaylist: boolean) => void;
	setSize: (width: number, height: number) => Record<string, unknown>;
	setVolume: (volume: number) => void;
	stopVideo: () => void;
	unMute: () => void;
	getVideoData: () => {
		title: string;
		video_id: string;
		[x: string]: unknown;
	};
};

export interface Video {
	id: string;
	name?: string;
}
export interface VideoData {
	thumbnail_height: number;
	version: string;
	url: string;
	height: number;
	provider_url: string;
	type: string;
	html: string;
	thumbnail_url: string;
	author_url: string;
	author_name: string;
	title: string;
	width: number;
	thumbnail_width: number;
	provider_name: string;
}
