import {create} from 'zustand'

export const useLoader=create((set)=>({
    loading: false,
    setLoading: (loadingState) => set(() => ({loading:loadingState})),
}))
