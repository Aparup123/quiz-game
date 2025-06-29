'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import AttemptCard from "@/components/attemptCard";
import { useLoader } from "@/store/loadingStore";
import { useQuestions } from "@/store/questionStore";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";

export default function AttemptedQuizzes() {
  const setQuestions=useQuestions((state) => state.setQuestions);
  const router = useRouter();

  const [loading, setLoading]=useState(false);
  const startAttempt = (quizTemplateId) => {
    console.log("Starting attempt for quiz:", quizTemplateId);
    setLoading(true);
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/quiz/attempt`, { quizTemplateId }, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        const attemptId = res.data.quizAttempt._id;
        const questions = res.data.questions.map((q) => ({ ...q, status: "notAttempted" }))
        setQuestions(questions);

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

  const [attempts, setAttempts] = useState([]);
  useEffect(() => {
      setLoading(true);
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/quiz/attempted`, { withCredentials: true })
      .then(res => {
        setAttempts(res.data.attempts)
        console.log(res.data.attempts)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
      })
  }, []);

    if(loading){
        return <Loader/>;
    }

  if (!attempts || attempts.length === 0) {
    return <div>NO QUIZ ATTEMPTED</div>
  }



  return (
      <div>
          <h1 className='text-xl font-medium inline-flex items-center gap-2 border-text-primary'>ATTEMPTED QUIZZES</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
          {attempts.map((a) => {
            return <AttemptCard key={a._id} attempt={a} startAttempt={startAttempt}/>
            })}
        </div>
      </div>
  )
}
