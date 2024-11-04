import type { QuizzError } from "@/types/Error";
import type { Video, YouTubePlayer } from "@/types/Youtube";
import { atom } from "jotai";

export const choiceAtom = atom<string | null>(null);
export const videosAtom = atom<Video[]>([]);
export const playerAtom = atom<YouTubePlayer | null>(null);
export const currentVideoIdAtom = atom<string | null>(null);
export const errorsAtom = atom<QuizzError[]>([]);
export const scoreAtom = atom<number>(0);
export const nbRoundAtom = atom<number>(10);
export const currentRoundAtom = atom<number>(1);
export const nbTriesAtom = atom<number>(0);
