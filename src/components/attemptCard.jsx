import React from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import ResultList from './resultList';

export default function AttemptCard({ attempt , startAttempt }) {
    const quizTemplate = attempt.quizTemplate;
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
                <CardAction className="flex justify-between gap-2 flex-wrap">
                    <Button variant="link" onClick={()=>startAttempt(attempt._id)}>Attempt Again</Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button >View results</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-7xl m-2 h-[80vh] overflow-y-auto px-8 py-10">
                            <ResultList
                                quizTemplateId={attempt._id}
                            />
                        </DialogContent>
                    </Dialog>
                </CardAction>
            </CardFooter>
        </Card>
    )
}
