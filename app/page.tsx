import PlaylistInput from "@/features/playlist-selection/playlist-input";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col  items-center justify-between p-24 sm:p-2">
        <PlaylistInput />
      </main>
    </>
  );
}
