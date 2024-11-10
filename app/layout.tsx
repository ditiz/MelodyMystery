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
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<>
						<header>
							<nav>
								<ul className="flex items-center justify-around p-2">
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
					</>
				</ThemeProvider>
			</body>
		</html>
	);
}
