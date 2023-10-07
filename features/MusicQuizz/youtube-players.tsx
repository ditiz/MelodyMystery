import { Button } from "@/components/ui/button";
import {
  currentVideoIdAtom,
  playerAtom,
  videosAtom,
} from "@/state/music-quizz";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";

const YoutubePlayers = () => {
  const [show, setShow] = useState(false);

  const [, setPlayer] = useAtom(playerAtom);
  const [videos, setVideos] = useAtom(videosAtom);
  const [currentVideoId, setCurrentVideoId] = useAtom(currentVideoIdAtom);

  const otherVideosId = useMemo(
    () => videos.filter((v) => v.id !== currentVideoId),
    [videos, currentVideoId]
  );

  const loadVideos = (e: YouTubeEvent) => {
    // main videos
    const videoId = e.target.getVideoData().video_id;
    const videoName = e.target.getVideoData().title;
    const mainVideo = { id: videoId, name: videoName };

    // load other videos
    const playlistIds = e.target.getPlaylist();
    if (playlistIds) {
      const randomVideos = [...Array(3)]
        .map(() => playlistIds[Math.floor(Math.random() * playlistIds.length)])
        .map((id) => ({ id }));

      const randomisedVideo = [...randomVideos, mainVideo].sort(
        () => 0.5 - Math.random()
      );

      setVideos(randomisedVideo);
    }
  };

  const setVideoName = (e: YouTubeEvent, id: string) => {
    setVideos((vs) =>
      vs.reduce<{ id: string; name?: string }[]>((acc, v) => {
        if (v.id === id) {
          return [...acc, { ...v, name: e.target.getVideoData()?.title }];
        }
        return [...acc, v];
      }, [])
    );
  };

  return (
    <article className="flex flex-col items-center">
      <Button onClick={() => setShow((v) => !v)}>Show players</Button>

      <section style={{ display: show ? "flex" : "none" }}>
        <YouTube
          onReady={(e) => {
            e.target.setShuffle(true);
            e.target.nextVideo();
            e.target.pauseVideo();

            // wait for the next video to be loaded
            setTimeout(() => {
              setPlayer(e.target);
            }, 1000);
          }}
          onPlay={(e) => {
            const videoDataId = e.target.getVideoData().video_id;

            if (videoDataId && videoDataId !== currentVideoId) {
              e.target.seekTo(60);
              loadVideos(e);
              setCurrentVideoId(videoDataId);
            }
          }}
          opts={{
            playerVars: {
              list: "PL3QJxphXG1iCzpP9KcZU8EG5Z8O3HNb6X",
              listType: "playlist",
            },
            width: "320",
            height: "195",
          }}
        />

        {otherVideosId.map((v) => (
          <YouTube
            key={v.id}
            videoId={v?.id}
            onReady={(e) => setVideoName(e, v?.id)}
            onStateChange={(e) => setVideoName(e, v?.id)}
            opts={{
              width: "320",
              height: "195",
            }}
          />
        ))}
      </section>
    </article>
  );
};

export default YoutubePlayers;
