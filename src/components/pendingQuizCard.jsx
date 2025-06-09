import React from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PendingQuizCard({ quiz, startAttempt }) {
    return (<Card className="flex flex-col justify-center gap-1">
        <CardHeader>
            <CardTitle>{quiz.topic}</CardTitle>
        </CardHeader>
        <CardContent>
            <ul>
                <li><span>No of questions: </span><span>{quiz.numberOfQuestions}</span></li>
                <li><span>Total marks: </span><span>{quiz.totalPoints}</span></li>
                <li><span>Duration: </span><span>{quiz.duration}</span></li>
                <li><span>Difficulty: </span><span>{quiz.difficulty}</span></li>
                <li><span>Type: </span><span>{quiz.type}</span></li>
            </ul>
        </CardContent>
        <CardFooter className="inline-block">
            <CardAction ><Button className="float-right" onClick={()=>startAttempt(quiz._id)}>Start</Button></CardAction>
        </CardFooter>
    </Card>
    )
}
