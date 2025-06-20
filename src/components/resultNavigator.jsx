import React from 'react'
import Link from 'next/link'
import ConfirmSubmit from './confirmSubmit'

export default function ResultNavigator({questions, currentQuestion,quizId, attemptId}) {
  const buttonStyle={
    base:'p-2 flex items-center justify-center rounded text-white ',
    incorrect:"bg-red-400 hover:bg-red-500",
    notAttempted:"bg-gray-400 hover:bg-gray-500",
    correct:"bg-green-600 hover:bg-green-500",
    current:"bg-blue-400 hover:bg-blue-500 "
  }

  if(!questions){
    return <div>
      loading...
    </div>
    }

  return (
    <div className='flex flex-col justify-between h-[25rem]'>
    <div className='grid grid-cols-4 gap-2 m-4 overflow-auto'>
        {questions.map((q) => 

            <Link 
                key={q.order} 
                href={`/quiz/${quizId}/result/${attemptId}/questions/${q.order}`} 
                variant={currentQuestion==q.order?'blue':q?.selectedOptions?.length?"success":'destructive'}
                className={currentQuestion==q.order?buttonStyle.base+buttonStyle.current:buttonStyle.base+buttonStyle[q.status]}
                >
                    {q.order}
            </Link>
        )}
        

    </div>
    </div>
  )
}
