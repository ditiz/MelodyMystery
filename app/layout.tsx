import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Melody Mystery",
	description: "Guess the song from your Youtube playlists",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${inter.className} w-scren min-h-screen`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="relative h-full w-full dark:md:bg-slate-950">
						<div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full dark:md:bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
						<div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full dark:md:bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
						<header>
							<nav>
								<ul className="w-full flex items-center justify-around p-2">
									<li>
										<Link href={"/"}>
											<h1>Melody Mystery</h1>
										</Link>
									</li>
									<li>
										<ModeToggle />
									</li>
								</ul>
							</nav>
						</header>

						{children}
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
