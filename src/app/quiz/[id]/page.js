"use client"
import Navbar from '@/components/navbar'
import Navigator from '@/components/navigator';
import Question from '@/components/question';
import { Button } from '@/components/ui/button';
import { useQuestions } from '@/store/questionStore';
import { Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import {useEffect, useState } from 'react'

export default function Quiz() {
    const router=useRouter()
    const currentQuestion=parseInt(useParams().id)
    const questions=useQuestions((state)=>state.questions)
    const updateOptions=useQuestions((state)=>state.updateOptions)
    const updateStatus=useQuestions((state)=>state.updateStatus)
    const [selectedOptions, setSelectedOptions]=useState([])
    const [question, setQuestion]=useState({})
    const [isLoading, setIsLoading]=useState(true)

    useEffect(() => {
        setIsLoading(true)
        if (questions.length) {
            setQuestion(questions.find((q) => q.id == currentQuestion))
            setIsLoading(false)
        }
    }, [currentQuestion, questions])
    
    useEffect(()=>{
        setSelectedOptions(question.selectedOptions||[]);
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
                if(selectedOptions.length){
                    await updateStatus(currentQuestion, "attempted")
                }else{
                    await updateStatus(currentQuestion, "notAttempted")
                }
                setSelectedOptions([])
            if(currentQuestion==questions.length){
                router.push("/quiz/1")
            }else{
                router.push(`/quiz/${currentQuestion + 1}`)
            }
        } finally {
            setIsLoading(false)
        }
    }
  return (
    <div className='lg:max-w-4xl mx-auto px-10 mt-5'>
        <Navbar/>
        <div className='flex justify-center mt-10 gap-4'>
            
            <div className='flex-2 border-2 rounded p-4'>
                <Question 
                    question={question} 
                    setSelectedOptions={setSelectedOptions}
                    selectedOptions={selectedOptions}
                    />
                <div className='space-x-1.5 my-2'>
                    {(currentQuestion!=1) && <Button onClick={()=>{router.push(`/quiz/${currentQuestion-1}`)}}>Prev</Button>}
                     <Button onClick={saveAndNext}>Save and next</Button>

            {(selectedOptions?.length!=0 && <Button variant="link" size="sm" onClick={()=>{setSelectedOptions([])}}>Clear response</Button>)}
                    
                </div>
            </div>
            <div className='rounded border-2 p-4'>
            <Navigator questions={questions} 
                currentQuestion={currentQuestion}
            />
            </div>
        </div>
    </div>
  )
}
