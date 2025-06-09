import { create } from "zustand"
// import { questions } from "../../questions"
export const useQuestions=create((set)=>({
    questions:[],
    setQuestions:(q)=>set((state)=>({
        questions:q
    })),
    updateOptions:(qOrder, options)=>set((state)=>({
        questions:state.questions.map((q)=>q.order==qOrder?{...q, selectedOptions:options}:q)
    })),
    updateStatus:(qOrder, qStatus)=>{
        set((state)=>({
            questions:state.questions.map((q)=>q.order==qOrder?{...q, status:qStatus}:q)
        }))
    }
}))