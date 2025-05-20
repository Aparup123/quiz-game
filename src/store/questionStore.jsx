import { create } from "zustand"
import { questions } from "../../questions"
export const useQuestions=create((set)=>({
    questions:questions,
    setQuestions:(q)=>set((state)=>({
        questions:q
    })),
    updateOptions:(qId, options)=>set((state)=>({
        questions:state.questions.map((q)=>q.id==qId?{...q, selectedOptions:options}:q)
    })),
    updateStatus:(qId, qStatus)=>{
        set((state)=>({
            questions:state.questions.map((q)=>q.id==qId?{...q, status:qStatus}:q)
        }))
    }
}))