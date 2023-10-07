import { YouTubePlayer } from "@/types/Youtube";
import { atom } from "jotai";

export const choiceAtom = atom<string | null>(null);
export const videosAtom = atom<{ id: string; name?: string }[]>([]);
export const playerAtom = atom<YouTubePlayer | null>(null);
export const currentVideoIdAtom = atom<string | null>(null);
