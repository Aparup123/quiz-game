"use client"
import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import {useEffect, useState } from 'react'
import { useResults } from '@/store/resultStore';
import ResultQuestion from '@/components/resultQuestion';
import ResultNavigator from '@/components/resultNavigator';
import Loader from "@/components/loader";

export default function Quiz() {
    const router=useRouter()
    const currentQuestion=parseInt(useParams().id)
    const params=useParams()
    const quizId=parseInt(useParams().quizTemplateId)
    const results=useResults((state)=>state.results);
    const [selectedOptions, setSelectedOptions]=useState([])
    const [result, setResult]=useState({})
    const [loading, setLoading]=useState(false);
    useEffect(() => {
        console.log("currentQuestion", currentQuestion);
        console.log("questions", results);
        setLoading(true);
        if (results.length) {
            const foundResult = results.find((r) => r.order == currentQuestion);
            setResult(foundResult || {});
            setLoading(false)
        }
    }, [currentQuestion, results])
    
    useEffect(()=>{
        console.log(result);
        setSelectedOptions(result?.selectedOptions||[]);
    }, [result])

    if (loading || !results.length) {
        return (
            <Loader/>
        )
    }
    

    const next=async()=>{
        setLoading(true)
            if(currentQuestion==results.length){
                router.push(`/quiz/${quizId}/result/${params.attemptId}/questions/1`)
            }else{
                router.push(`/quiz/${quizId}/result/${params.attemptId}/questions/${currentQuestion + 1}`)
            }
        setLoading(false)
    }



  return (
    <div className='lg:max-w-4xl mx-auto px-5 mt-5'>
        <Navbar/>
        <div className='flex justify-center lg:mt-15 mt-10 gap-2 border-2 border-gray-400 shadow-xl/20 h-[32rem]'>
            
            <div className='flex-2 p-4 sm:p-8'>

                <div className='overflow-auto h-[20rem] md:h-[24rem] '>
                    <h1 className='font-medium text-2xl mb-3'>Question : {currentQuestion}</h1>

                    <ResultQuestion 
                        questionNumber={currentQuestion}
                        question={result.question} 
                        selectedOptions={selectedOptions}
                        />
                </div>

                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mt-4 '>
                    {(currentQuestion!=1) && <Button onClick={()=>{router.push(`/quiz/${quizId}/result/${params.attemptId}/questions/${currentQuestion - 1}`)}}>{`<-`} Prev</Button>}

            
                    
                     <Button onClick={next}
                     >next {`->`}</Button>

            {/* {(selectedOptions?.length!=0 && <Button  variant="link" size="sm" onClick={()=>{setSelectedOptions([])}}>Clear response</Button>)} */}
                    
                </div>
            </div>
            <div className='overflow-auto md:h-full border-2 p-5 bg-[#F2F2F2] flex-1 hidden md:block'>

                <h1 className='font-normal text-xl pb-6 text-center'>Questions</h1>

                    {/* <Navigator 
                        questions={results} 
                        currentQuestion={currentQuestion}
                        quizId={quizId}
                        attemptId={params.attemptId}
                    /> */}
                    <ResultNavigator
                        questions={results} 
                        currentQuestion={currentQuestion}
                        quizId={quizId}
                        attemptId={params.attemptId}
                    />
            </div>
        </div>
    </div>
  )
}
