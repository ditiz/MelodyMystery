import { currentVideoIdAtom, videosAtom } from "@/state/music-quizz";
import type { VideoData } from "@/types/Youtube";
import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";
import useSWR from "swr";

const fetcher = (videos: { id: string }[]): Promise<VideoData[]> =>
	Promise.all(
		videos.map((video) =>
			fetch(
				`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${video.id}`,
			).then((res) => res.json()),
		),
	);

export default function useFetchVideoInfos() {
	const [videos, setVideos] = useAtom(videosAtom);
	const [currentVideoId] = useAtom(currentVideoIdAtom);

	const otherVideosId = useMemo(
		() => videos.filter((v) => v.id !== currentVideoId),
		[videos, currentVideoId],
	);

	const { data, isLoading, error } = useSWR(otherVideosId ?? [], fetcher);

	useEffect(() => {
		if (data) {
			setVideos((prev) =>
				prev.map((video) => {
					const videoData = data.find(
						(d) => `https://www.youtube.com/watch?v=${video.id}` === d.url,
					);
					return videoData
						? {
								...video,
								name: videoData.title,
							}
						: video;
				}),
			);
		}
	}, [data, setVideos]);

	return { data, isLoading, error };
}
