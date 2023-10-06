"use client";

import { useState } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";
import { Button } from "./ui/button";

const MusicElement = () => {
  const [player, setPlayer] = useState<YouTubeEvent["target"]>();
  const [currentVideoId, setCurrentVideoId] = useState<string>();
  const [videos, setVideos] = useState<{ id: string; name?: string }[]>([]);

  const videoTitle = player?.getVideoData().title;
  const otherVideosId = videos.filter((v) => v.id !== currentVideoId);

  const setVideoName = (e: YouTubeEvent, id: string) => {
    console.log(id);
    setVideos((vs) =>
      vs.reduce<{ id: string; name?: string }[]>((acc, v) => {
        if (v.id === id) {
          return [...acc, { ...v, name: e.target.getVideoData()?.title }];
        }
        return [...acc, v];
      }, [])
    );
  };

  const getOtherVideos = () => {
    const playlistIds = player?.getPlaylist();
    if (currentVideoId) {
      const randomVideoIds: string[] = [...Array(3)].map(
        () => playlistIds[Math.floor(Math.random() * playlistIds.length)]
      );

      const randomisedVideoIds = [
        ...randomVideoIds.map((id: string) => ({ id })),
        { id: currentVideoId, name: player.getVideoData().title },
      ].sort(() => 0.5 - Math.random());

      console.log(randomisedVideoIds);

      setVideos(randomisedVideoIds);
    }
  };

  return (
    <article className="flex flex-col items-center gap-6">
      <div className="flex gap-6">
        <Button onClick={() => player?.playVideo()}>Start</Button>
        <Button onClick={() => player?.nextVideo()}>Next</Button>
      </div>

      <section className="choice grid grid-cols-2 gap-6">
        <Button className="h-auto text-lg p-6 bg-green-400 hover:bg-green-600">
          {videos[0]?.name}
        </Button>
        <Button className="h-auto text-lg p-6 bg-orange-400 hover:bg-orange-600">
          {videos[1]?.name}
        </Button>
        <Button className="h-auto text-lg p-6 bg-teal-400 hover:bg-teal-600">
          {videos[2]?.name}
        </Button>
        <Button className="h-auto text-lg p-6 bg-purple-400 hover:bg-purple-600">
          {videos[3]?.name}
        </Button>
      </section>

      <div style={{ display: "none" }}>
        <YouTube
          onReady={(e) => {
            e.target.setShuffle(true);
            e.target.nextVideo();
            e.target.pauseVideo();

            setPlayer(e.target);
          }}
          onPlay={(e) => {
            const videoDataId = e.target.getVideoData().video_id;
            console.log(currentVideoId);

            if (videoDataId !== currentVideoId) {
              e.target.seekTo(60);
              setCurrentVideoId(e.target.getVideoData().video_id);
            }

            getOtherVideos();
          }}
          opts={{
            playerVars: {
              list: "PL3QJxphXG1iCzpP9KcZU8EG5Z8O3HNb6X",
              listType: "playlist",
            },
          }}
        />

        <YouTube
          videoId={otherVideosId[0]?.id}
          onStateChange={(e) => setVideoName(e, otherVideosId[0]?.id)}
        />
        <YouTube
          videoId={otherVideosId[1]?.id}
          onStateChange={(e) => setVideoName(e, otherVideosId[1]?.id)}
        />
        <YouTube
          videoId={otherVideosId[2]?.id}
          onStateChange={(e) => setVideoName(e, otherVideosId[2]?.id)}
        />
      </div>
    </article>
  );
};

export default MusicElement;
