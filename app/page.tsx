import { ModeToggle } from "@/components/ui/mode-toggle";
import MusicElement from "@/features/MusicQuizz/music-quizz";

export default function Home() {
  return (
    <>
      <header>
        <nav>
          <ul className="flex items-center justify-around p-2">
            <li>
              <h1>Melody Mystery</h1>
            </li>
            <li>
              <ModeToggle />
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex min-h-screen flex-col  items-center justify-between p-24 sm:p-2">
        <MusicElement />
      </main>
    </>
  );
}
