'use client';

import { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      {attempts.map((a) => {
        return <div key={a._id} className="quiz-attempt border-2 m-2">
          <h2>{a.quizTemplateId.topic}</h2>
          <p>{a.attemptNumber}</p>
        </div>
      })}
    </div>
  )
}
