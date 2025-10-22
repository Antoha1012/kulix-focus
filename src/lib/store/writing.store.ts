import { create } from "zustand";

export type Tone =
	| "neutral"
	| "professional"
	| "friendly"
	| "bold"
	| "playful"
	| "academic";
export type Length = "short" | "medium" | "long";

type WritingState = {
	topic: string;
	tone: Tone;
	length: Length;
	draft: string;
	setTopic: (topic: string) => void;
	setTone: (tone: Tone) => void;
	setLength: (length: Length) => void;
	setDraft: (draft: string) => void;
	reset: () => void;
};

export const useWritingStore = create<WritingState>(
	(set: (partial: Partial<WritingState>) => void) => ({
		topic: "",
		tone: "neutral",
		length: "medium",
		draft: "",
		setTopic: (topic: string) => set({ topic }),
		setTone: (tone: Tone) => set({ tone }),
		setLength: (length: Length) => set({ length }),
		setDraft: (draft: string) => set({ draft }),
		reset: () =>
			set({ topic: "", tone: "neutral", length: "medium", draft: "" }),
	})
);
