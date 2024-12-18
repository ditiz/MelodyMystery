import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import type { Metadata } from "next";
import { Lexend, Lexend_Exa } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const lexend = Lexend({ subsets: ["latin"] });

const lexendExa = Lexend_Exa({ subsets: ["latin"] });

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
			<body className={`${lexend.className} w-scren min-h-screen`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="relative h-full w-full">
						<div
							className="fixed top-[-75%] md:left-[20%] h-[1000px] w-[1000px] 
								rounded-full blur-[150px] opacity-50 bg-conic-gradient animate-spin-slow"
						/>
						<header className="relative">
							<nav>
								<ul className="w-full flex items-center justify-around p-2">
									<li>
										<Link href={"/"} className="flex gap-2">
											<Image src="logo.svg" alt="logo" width={25} height={25} />
											<h1 className={`${lexendExa.className}`}>
												Melody Mystery
											</h1>
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
