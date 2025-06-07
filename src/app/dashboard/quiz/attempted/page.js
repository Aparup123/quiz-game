'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import AttemptCard from "@/components/attemptCard";

export default function AttemptedQuizzes() {
  const [attempts, setAttempts] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/quiz/attempted`, {withCredentials:true})
      .then(res => {
        setAttempts(res.data.attempts)
        console.log(res.data.attempts)
      })
      .catch(err => console.log(err))
  }, []);
  if (!attempts || attempts.length === 0) {
    return <div>NO QUIZ ATTEMPTED</div>
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-6">
      {attempts.map((a) => {
        return <AttemptCard key={a._id} attempt={a}/>
      })}
    </div>
  )
}
