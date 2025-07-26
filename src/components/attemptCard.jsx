import React from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import ResultList from './resultList';
import {TbReportAnalytics} from "react-icons/tb";
import {IoReload} from "react-icons/io5";



export default function AttemptCard({ attempt , startAttempt }) {
    const quizTemplate = attempt.quizTemplate;

    const quizData=[
        {
            label:"No of questions: ",
            value:quizTemplate.numberOfQuestions,
        },
        {
            label:"Total marks: ",
            value:quizTemplate.totalPoints,
        },
        {
            label:"Duration: ",
            value:quizTemplate.duration,
        },
        {
            label:"Difficulty: ",
            value:quizTemplate.difficulty,
        },
        {
            label:"Type: ",
            value:quizTemplate.type,
        },
        {
            label:"Times attempted: ",
            value:attempt.numberOfAttempts,
        }
    ];

    return (
        <div className=" rounded-md flex flex-col justify-center bg-gray-50 shadow-md">
            <div className=" rounded-t-md p-2  px-4 bg-gradient-to-r from-violet-300 to-indigo-200 font-medium text-text-primary backdrop-blur-md">
                <h3>{quizTemplate.topic}</h3>
            </div>
            <div className="text-sm ">
                <ul>{
                    quizData.map((q,idx)=>{
                        return <li key={idx} className="border-b p-2 px-4 flex justify-between"><span className="font-medium">{q.label} </span><span>{q.value}</span></li>
                    })
                }
                </ul>
            </div>
            <div className="px-3 py-2 border-b rounded-x-md rounded-b-md flex flex-wrap items-center justify-between">
                    <Button variant="link" onClick={()=>startAttempt(attempt._id)} className="flex items-stretch"><IoReload/> Attempt again</Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="text-text-primary flex items-center hover:transform hover:translate-x-1 bg-gradient-to-r from-violet-300 to-indigo-200">View results<TbReportAnalytics/></Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-7xl m-2 h-[80vh] overflow-y-auto px-8 py-10">
                            <ResultList
                                quizTemplateId={attempt._id}
                            />
                        </DialogContent>
                    </Dialog>
            </div>
        </div>
    )
}
