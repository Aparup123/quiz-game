'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { useLoader } from "@/store/loadingStore";
import PendingQuizCard from "@/components/pendingQuizCard";
import { useRouter } from "next/navigation";

export default function PendingQuizzes() {
    const [pendingQuizzes, setPendingQuizzes] = useState([]);
    const router=useRouter();
    const setLoading=useLoader((state)=>state.setLoading);
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

    const startAttempt=(quizTemplateId)=>{
        // setLoading(true);
        // axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/quiz/attempt`, { quizTemplateId}, { withCredentials: true })
        //     .then((res) => {
        //         setLoading(false);
        //         window.location.href = `/quiz/${res.data.quizId}`;
        //     })
        //     .catch((err) => {
        //         setLoading(false);
        //         console.error(err);
        //     });
        // window.location.href = `/quiz/${quizTemplateId}`;
        router.push(`/quiz/${quizTemplateId}`);
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
