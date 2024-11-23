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
						<div
							className="absolute top-[-75%] left-[25%] h-[1000px] w-[1000px] rounded-full"
							style={{
								filter: "blur(150px)",
								opacity: 0.5,
								background:
									"conic-gradient(rgb(87, 35, 245) 20deg, rgb(250, 0, 255) 110deg, rgb(255, 140, 0) 200deg, rgb(241, 35, 182) 280deg, rgb(87, 35, 245) 350deg)",
							}}
						/>
						<header className="relative">
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

						<main className="relative">{children}</main>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
