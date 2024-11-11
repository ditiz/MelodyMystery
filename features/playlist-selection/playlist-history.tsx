"use client";

import ListItem from "@/components/custom/list-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { playlistHistory } from "@/lib/constants";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const getHistory = () => {
	if (typeof window === "undefined") return [];

	return (
		(localStorage.getItem(playlistHistory) ?? "")
			.split(";")
			// remove empty string and duplicates
			.filter((e, i, a) => e && a.indexOf(e) === i)
	);
};

const PlaylistHistory = () => {
	const [playlists, setPlaylists] = useState<string[]>([]);

	useEffect(() => {
		setPlaylists(getHistory());
	}, []);

	if (!playlists.length) {
		return null;
	}

	return (
		<Card className="bg-muted/50">
			<CardHeader>
				<h2 className="text-2xl font-bold pb-2">History</h2>
			</CardHeader>

			<CardContent>
				<ul className="flex flex-col gap-4">
					{playlists.map((playlistId) => (
						<ListItem key={playlistId}>
							<Link
								href={`/quizz/${playlistId}`}
								className="w-10/12 break-words"
							>
								{playlistId}
							</Link>
							<Button
								variant={"ghost"}
								size={"icon"}
								className=""
								onClick={() => {
									const newPlaylists = playlists.filter(
										(p) => p !== playlistId,
									);
									localStorage.setItem(playlistHistory, newPlaylists.join(";"));
									setPlaylists(newPlaylists);
								}}
							>
								{<X />}
							</Button>
						</ListItem>
					))}
				</ul>
			</CardContent>
		</Card>
	);
};

export default PlaylistHistory;
