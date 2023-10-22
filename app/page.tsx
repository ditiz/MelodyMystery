"use client";

import PlaylistHistory from "@/features/playlist-selection/playlist-history";
import PlaylistInput from "@/features/playlist-selection/playlist-input";
import useResetQuizz from "@/hooks/useResetQuizz";

export default function Home() {
  useResetQuizz();

  return (
    <>
      <main className="flex flex-col  items-center justify-between p-24 sm:p-2 gap-8">
        <PlaylistInput />
        <PlaylistHistory />
      </main>
    </>
  );
}
