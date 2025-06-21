'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { useLoader } from "@/store/loadingStore";
import PendingQuizCard from "@/components/pendingQuizCard";
import { useRouter } from "next/navigation";
import { useQuestions } from "@/store/questionStore";
import { useTestDetails } from "@/store/testDetailsStore";

export default function PendingQuizzes() {
    const [pendingQuizzes, setPendingQuizzes] = useState([]);
    const router=useRouter();
    const setLoading=useLoader((state)=>state.setLoading);
    const setQuestions=useQuestions((state)=>state.setQuestions);
    const setTestDetails=useTestDetails((state)=>state.setTestDetails);
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/quiz/pending`, { withCredentials: true })
        .then((res)=>{
            console.log(res.data);
            setPendingQuizzes(res.data.pendingQuizzes);
        })
        .catch((err)=>{
            console.error(err);
        })
    }, []);

    const startAttempt=(quizTemplateId, quiz)=>{
        setLoading(true);
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/quiz/attempt`, { quizTemplateId}, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                const attemptId = res.data.quizAttempt._id;
                const questions=res.data.questions.map((q)=>({...q, status: "notAttempted"}))
                setQuestions(questions);
                setTestDetails(quiz);
                router.push(`/quiz/${quizTemplateId}/test/${attemptId}/questions/1`);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });

        // router.push(`/quiz/${quizTemplateId}`);
    }

    if (!pendingQuizzes || pendingQuizzes.length === 0) {
        return <div className='text-center text-2xl'>No pending quizzes found.</div>;
    }
    return (

        <div>
            <h1 className='text-2xl'>Pending Quizzes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-6">
                {pendingQuizzes?.map((quiz, idx) => <PendingQuizCard key={idx} quiz={quiz} startAttempt={startAttempt}/>)}
            </div>
        </div>
    )
}
