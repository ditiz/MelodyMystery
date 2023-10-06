import MusicElement from "@/components/MusicElement";
import { ModeToggle } from "@/components/ui/mode-toggle";

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
      <main className="flex min-h-screen flex-col  items-center justify-between p-24">
        <MusicElement />
      </main>
    </>
  );
}
