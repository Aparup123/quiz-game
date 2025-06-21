"use client"
import Navbar from '@/components/navbar'
import Navigator from '@/components/navigator';
import Question from '@/components/question';
import { Button } from '@/components/ui/button';
import { useQuestions } from '@/store/questionStore';
import { ImportIcon, Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import {useEffect, useState } from 'react'
import { toast } from 'sonner';
import axios from 'axios';

export default function Quiz() {
    const router=useRouter()
    const currentQuestion=parseInt(useParams().id)
    const params=useParams()
    const quizId=parseInt(useParams().quizTemplateId)
    const questions=useQuestions((state)=>state.questions)
    const updateOptions=useQuestions((state)=>state.updateOptions)
    const updateStatus=useQuestions((state)=>state.updateStatus)
    const [selectedOptions, setSelectedOptions]=useState([])
    const [question, setQuestion]=useState({})
    const [isLoading, setIsLoading]=useState(true)
    useEffect(() => {
        console.log("currentQuestion", currentQuestion);
        console.log("questions", questions);
        setIsLoading(true)
        if (questions.length) {
            setQuestion(questions.find((q) => q.order == currentQuestion))
            setIsLoading(false)
        }
    }, [currentQuestion, questions])
    
    useEffect(()=>{
        console.log(question);
        setSelectedOptions(question?.selectedOptions||[]);
    }, [question])

    if (isLoading || !questions.length || !question) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }
    

    const saveAndNext=async()=>{
        setIsLoading(true)
        try {
                await updateOptions(currentQuestion, selectedOptions)
                console.log(question);
                if(selectedOptions.length){
                    await updateStatus(currentQuestion, "attempted")
                }else{
                    await updateStatus(currentQuestion, "notAttempted")
                }
                // setSelectedOptions([])
            if(currentQuestion==questions.length){
                router.push(`/quiz/${quizId}/test/${params.attemptId}/questions/1`)
            }else{
                router.push(`/quiz/${quizId}/test/${params.attemptId}/questions/${currentQuestion + 1}`)
            }
        } finally {
            setIsLoading(false)
        }
    }


    const submitResponse=()=>{
        setIsLoading(true)
        const responses=questions.filter((q)=>q.status=="attempted").map((q) => ({
            order: q.order,
            selectedOptions: q.selectedOptions,
            status: q.status,
            question: q.question._id
        }))

        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/quiz/submit-response`, { quizAttemptId: params.attemptId, responses:responses }, { withCredentials: true })
        .then((res)=>{
            console.log(res.data);
            router.push(`/dashboard/quiz/attempted`)
            toast.success("Quiz submitted successfully!")
        })
        .catch((err)=>{
            console.error(err);
            toast.error("Error submitting quiz. Please try again.")
        })
    }

  return (
    
        <div className='flex justify-center lg:mt-15 mt-10 gap-2 border-2 border-gray-400 shadow-xl/20 h-[32rem]'>
            
            <div className='flex-2 p-4 sm:p-8'>

                <div className='overflow-auto h-[20rem] md:h-[24rem] '>
                    <h1 className='font-medium text-2xl mb-3'>Question : {currentQuestion}</h1>

                    <Question 
                        questionNumber={currentQuestion}
                        question={question.question} 
                        setSelectedOptions={setSelectedOptions}
                        selectedOptions={selectedOptions}
                        />
                </div>

                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mt-4 '>
                    {(currentQuestion!=1) && <Button onClick={()=>{router.push(`/quiz/${quizId}/test/${params.attemptId}/questions/${currentQuestion - 1}`)}}>{`<-`} Prev</Button>}

                    {(selectedOptions?.length!=0 && <Button  variant="link" size="sm" onClick={()=>{setSelectedOptions([])}}>Clear response</Button>)}
                    
                     <Button onClick={saveAndNext}
                     >Save and next {`->`}</Button>

                    
                </div>
            </div>
            <div className='overflow-auto md:h-full border-2 p-5 bg-[#F2F2F2] flex-1 hidden md:block'>

                <h1 className='font-normal text-xl pb-6 text-center'>Questions</h1>

                <Navigator 
                    questions={questions} 
                    currentQuestion={currentQuestion}
                    quizId={quizId}
                    attemptId={params.attemptId}
                    submitResponse={submitResponse}
                />
            </div>
        </div>
    
  )
}
