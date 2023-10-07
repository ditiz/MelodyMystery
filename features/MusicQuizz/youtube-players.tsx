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

const YoutubePlayers = () => {
  const [show, setShow] = useState(true);

  const { playlistId } = useParams();
  const router = useRouter();

  const [, setPlayer] = useAtom(playerAtom);
  const [videos, setVideos] = useAtom(videosAtom);
  const [currentVideoId, setCurrentVideoId] = useAtom(currentVideoIdAtom);
  const [, setError] = useAtom(errorsAtom);

  console.log(playlistId);

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
        console.log("playlistIds", playlistIds);
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
    <article className="flex flex-col items-center gap-2">
      <Button onClick={() => setShow((v) => !v)}>Show players</Button>

      <section style={{ display: show ? "flex" : "none" }}>
        <YouTube
          onReady={(e) => {
            e.target.setShuffle(true);
            e.target.nextVideo();
            e.target.pauseVideo();

            console.log("video", e.target.getVideoData());

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
