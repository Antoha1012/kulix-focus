import { create } from "zustand";

export interface IdeaItem {
	id: string;
	content: string;
	tags: string[];
	columnId: string;
}

export type ColumnId = "to-explore" | "shortlist" | "archive";

export interface Column {
	id: ColumnId;
	title: string;
	items: IdeaItem[];
}

type IdeasState = {
	columns: Column[];
	addIdea: (idea: Omit<IdeaItem, "id">) => void;
	moveIdea: (
		ideaId: string,
		fromColumn: ColumnId,
		toColumn: ColumnId
	) => void;
	updateIdea: (ideaId: string, updates: Partial<IdeaItem>) => void;
	removeIdea: (ideaId: string) => void;
	clearColumn: (columnId: ColumnId) => void;
};

const defaultColumns: Column[] = [
	{ id: "to-explore", title: "To Explore", items: [] },
	{ id: "shortlist", title: "Shortlist", items: [] },
	{ id: "archive", title: "Archive", items: [] },
];

export const useIdeasStore = create<IdeasState>(set => ({
	columns: defaultColumns,

	addIdea: idea =>
		set(state => {
			const newIdea: IdeaItem = {
				...idea,
				id: crypto.randomUUID(),
			};

			return {
				columns: state.columns.map(col =>
					col.id === idea.columnId
						? { ...col, items: [...col.items, newIdea] }
						: col
				),
			};
		}),

	moveIdea: (ideaId, fromColumn, toColumn) =>
		set(state => {
			const fromCol = state.columns.find(col => col.id === fromColumn);
			const toCol = state.columns.find(col => col.id === toColumn);

			if (!fromCol || !toCol) return state;

			const idea = fromCol.items.find(item => item.id === ideaId);
			if (!idea) return state;

			const updatedIdea = { ...idea, columnId: toColumn };

			return {
				columns: state.columns.map(col => {
					if (col.id === fromColumn) {
						return {
							...col,
							items: col.items.filter(item => item.id !== ideaId),
						};
					}
					if (col.id === toColumn) {
						return { ...col, items: [...col.items, updatedIdea] };
					}
					return col;
				}),
			};
		}),

	updateIdea: (ideaId, updates) =>
		set(state => ({
			columns: state.columns.map(col => ({
				...col,
				items: col.items.map(item =>
					item.id === ideaId ? { ...item, ...updates } : item
				),
			})),
		})),

	removeIdea: ideaId =>
		set(state => ({
			columns: state.columns.map(col => ({
				...col,
				items: col.items.filter(item => item.id !== ideaId),
			})),
		})),

	clearColumn: columnId =>
		set(state => ({
			columns: state.columns.map(col =>
				col.id === columnId ? { ...col, items: [] } : col
			),
		})),
}));
