import {create} from "zustand";

export const useTestDetails = create((set) => ({
  testDetails: null,
  setTestDetails: (details) => set({testDetails: details}),
  resetTestDetails: () => set({testDetails: null}),
}));