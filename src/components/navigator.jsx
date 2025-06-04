import React from 'react'
import Link from 'next/link'
import ConfirmSubmit from './confirmSubmit'

export default function Navigator({questions, currentQuestion,quizId}) {
  const buttonStyle={
    base:'p-2 flex items-center justify-center rounded text-white ',
    notAttempted:"bg-red-400 hover:bg-red-500",
    attempted:"bg-green-600 hover:bg-green-500",
    current:"bg-blue-400 hover:bg-blue-500"
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
                key={q.id} 
                href={`/quiz/${quizId}/test/questions/${q.id}`} 
                variant={currentQuestion==q.id?'blue':q?.selectedOptions?.length?"success":'destructive'}
                className={currentQuestion==q.id?buttonStyle.base+buttonStyle.current:buttonStyle.base+buttonStyle[q.status]}
                >
                    {q.id}
            </Link>
        )}
        

    </div>
    <div className='flex justify-center '>
          <ConfirmSubmit/>
    </div>
    </div>
  )
}
