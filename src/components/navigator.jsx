import React from 'react'
import Link from 'next/link'
import ConfirmSubmit from './confirmSubmit'

export default function Navigator({questions, currentQuestion,quizId, attemptId, submitResponse}) {
  const buttonStyle={
    base:'p-2 flex items-center justify-center rounded text-white ',
    notAttempted:"bg-red-400 hover:bg-red-500",
    attempted:"bg-green-600 hover:bg-green-500",
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
                href={`/quiz/${quizId}/test/${attemptId}/questions/${q.order}`} 
                variant={currentQuestion==q.order?'blue':q?.selectedOptions?.length?"success":'destructive'}
                className={currentQuestion==q.order?buttonStyle.base+buttonStyle.current:buttonStyle.base+buttonStyle[q.status]}
                >
                    {q.order}
            </Link>
        )}
        

    </div>
    <div className='flex justify-center '>
          <ConfirmSubmit submitResponse={submitResponse}/>
    </div>
    </div>
  )
}
