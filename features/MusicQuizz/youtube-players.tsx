"use client";

import { Button } from "@/components/ui/button";
import {
  currentVideoIdAtom,
  errorsAtom,
  playerAtom,
  videosAtom,
} from "@/state/music-quizz";
import { useAtom } from "jotai";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";

// Get random time between 45 and 90 seconds
function getRandomTime() {
  return Math.floor(Math.random() * (90 - 45 + 1) + 45);
}

const YoutubePlayers = () => {
  const [show, setShow] = useState(false);

  const { playlistId } = useParams();
  const router = useRouter();

  const [player, setPlayer] = useAtom(playerAtom);
  const [videos, setVideos] = useAtom(videosAtom);
  const [currentVideoId, setCurrentVideoId] = useAtom(currentVideoIdAtom);
  const [, setError] = useAtom(errorsAtom);

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
      if (playlistIds.length < 4) {
        setError((errs) => [
          ...errs,
          {
            type: "default",
            message: "Playlist must have at least 4 videos",
          },
        ]);
        router.push("/");
        return;
      }

      let randomVideos: { id: string }[];
      do {
        randomVideos = [...Array(3)]
          .map(
            () => playlistIds[Math.floor(Math.random() * playlistIds.length)]
          )
          .map((id) => ({ id }));
      } while (
        [...randomVideos, mainVideo].filter(
          (v, i, a) => a.findIndex((t) => t.id === v.id) === i
        ).length < 4
      );

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
    <article className="flex flex-col items-center gap-2">
      <div className="flex gap-2">
        <Button onClick={() => setShow((v) => !v)}>Show players</Button>
        <Button
          onClick={async () => {
            player?.setShuffle(true);
            player?.nextVideo();

            do {
              await new Promise((resolve) => setTimeout(resolve, 100));
            } while (!player?.getVideoData().video_id);

            loadVideos({ target: player } as YouTubeEvent);
            player?.seekTo(getRandomTime(), true);
          }}
        >
          try to load again
        </Button>
      </div>

      <section style={{ display: show ? "flex" : "none" }}>
        <YouTube
          onReady={async (e) => {
            e.target.setShuffle(true);
            e.target.nextVideo();
            e.target.pauseVideo();

            // wait for the next video to be loaded
            while (!e.target.getVideoData().video_id) {
              await new Promise((resolve) => setTimeout(resolve, 100));
            }

            setPlayer(e.target);
          }}
          onPlay={(e) => {
            const videoDataId = e.target.getVideoData().video_id;

            if (videoDataId && videoDataId !== currentVideoId) {
              e.target.seekTo(getRandomTime(), true);
              loadVideos(e);
              setCurrentVideoId(videoDataId);
            }
          }}
          opts={{
            playerVars: {
              list: playlistId,
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
