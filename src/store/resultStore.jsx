import {create} from 'zustand';

export const useResults = create((set) => ({
    results: [],
    setResults: (results) => set({ results }),
}));

