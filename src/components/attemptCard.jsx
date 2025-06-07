import React from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AttemptCard({ attempt }) {
    const { quizTemplate } = attempt;
    return (
        <Card className="flex flex-col justify-center gap-1">
            <CardHeader>
                <CardTitle>{quizTemplate.topic}</CardTitle>
            </CardHeader>
            <CardContent>
                <ul>
                    <li><span>No of questions: </span><span>{quizTemplate.numberOfQuestions}</span></li>
                    <li><span>Total marks: </span><span>{quizTemplate.totalPoints}</span></li>
                    <li><span>Duration: </span><span>{quizTemplate.duration}</span></li>
                    <li><span>Difficulty: </span><span>{quizTemplate.difficulty}</span></li>
                    <li><span>Type: </span><span>{quizTemplate.type}</span></li>
                    <li><span>Times attempted: </span><span>{attempt.numberOfAttempts}</span></li>
                </ul>
            </CardContent>
            <CardFooter >
                <CardAction className="flex justify-between gap-2">
                    <Button>Attempt Again</Button>
                    <Button>View results</Button>
                </CardAction>
            </CardFooter>
        </Card>
    )
}
