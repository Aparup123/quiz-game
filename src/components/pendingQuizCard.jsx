import React from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {MdNotStarted} from "react-icons/md";

export default function PendingQuizCard({ quiz, startAttempt }) {
    const quizData=[
        {
            label:"No of questions: ",
            value:quiz.numberOfQuestions,
        },
        {
            label:"Total marks: ",
            value:quiz.totalPoints,
        },
        {
            label:"Duration: ",
            value:quiz.duration,
        },
        {
            label:"Difficulty: ",
            value:quiz.difficulty,
        },
        {
            label:"Type: ",
            value:quiz.type,
        }
    ];

    return (<div className=" rounded-md flex flex-col justify-center bg-gray-50 shadow-md">
        <div className=" rounded-t-md p-2  px-4 bg-gradient-to-r from-violet-300 to-indigo-200 font-medium text-text-primary backdrop-blur-md">
            <h3>{quiz.topic}</h3>
        </div>
        <div className="text-sm border">
            <ul>{
                quizData.map((q,idx)=>{
                    return <li className="border-b p-2 px-4 flex justify-between"><span className="">{q.label} </span><span>{q.value}</span></li>
                })
                }
            </ul>
        </div>
        <div className="px-3 py-2 border-b rounded-x-md rounded-b-md border-x">
            <Button variant="outline" className="float-right hover:transform hover:translate-x-1 bg-gradient-to-r from-violet-300 to-indigo-200" onClick={()=>startAttempt(quiz._id, quiz)}>Start <span className=""><MdNotStarted/></span></Button>
        </div>
    </div>
    )
}
