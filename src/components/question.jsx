export default function Question({ question, selectedOptions, setSelectedOptions }) {
    
    if(!question){
        return <div>Loading</div>
    }

    return (
        
        <div>
            <p className="font-medium my-3 border-gray-500 border-1 shadow-lg max-w-5xl p-3 rounded-lg min-h-[5rem]">{question?.id}. {question?.question}</p>
            <ul className='my-2'>
                {question?.options?.map((option)=><li key={option.id}
                    className='space-x-1 border-1 border-gray-400 shadow-lg rounded-lg p-1 px-2 my-2 md:max-w-[20rem] w-full'
                >
                    <input
                        type='radio'
                        id={`${option.id}`}
                        value={`${option.id}`}
                        checked={selectedOptions.length && option.id === selectedOptions[0]}
                        onChange={(e)=>{setSelectedOptions([parseInt(e.target.value)])
                            e.target.checked=true
                        }}
                        className='bg-primary '
                    >
                    </input>

                    <label htmlFor={`${option.id}`} className=''>{option.content}</label>
                </li>)}
            </ul>   
        </div>
    )
}
