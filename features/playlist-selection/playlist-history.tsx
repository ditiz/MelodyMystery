"use client";

import ListItem from "@/components/custom/list-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import usePlaylistHistory from "@/hooks/usePlaylistHistory";
import { deleteFromHistory } from "@/lib/utils";
import { X } from "lucide-react";
import Link from "next/link";

const PlaylistHistory = () => {
	const [playlists, setPlaylists] = usePlaylistHistory();

	if (!playlists.length) {
		return null;
	}

	const playlistsNameAndId: string[][] = playlists.map((playlistId) => {
		return playlistId.split(":");
	});

	const handleButtonClick = (playlistId: string) => {
		const newPlaylists = deleteFromHistory(playlistId);
		setPlaylists(newPlaylists);
	};

	return (
		<Card className="w-80 bg-muted/50">
			<CardHeader>
				<h2 className="text-2xl font-bold pb-2">History</h2>
			</CardHeader>

			<CardContent>
				<ul className="flex flex-col gap-4">
					{playlistsNameAndId.map(([playlistName, playlistId]) => (
						<ListItem key={playlistId}>
							<Link
								href={`/quizz/${playlistId}`}
								className="w-10/12 break-words"
							>
								{playlistName}
							</Link>
							<Button
								variant={"ghost"}
								size={"icon"}
								className=""
								onClick={() => handleButtonClick(playlistId)}
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
