import MusicElement from "@/features/MusicQuizz/music-quizz";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col  items-center justify-between p-2 lg:p-24 lg:mt-[20vh]">
        <MusicElement />
      </main>
    </>
  );
}
