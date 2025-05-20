export default function Question({ question, selectedOptions, setSelectedOptions }) {
    
    if(!question){
        return <div>Loading</div>
    }

    return (
        
        <div>
            <p className="font-medium mb-2">{question?.id}. {question?.question}</p>
            <ul className='my-2'>
                {question?.options?.map((option)=><li key={option.id}
                    className='space-x-1'
                >
                    <input
                        type='radio'
                        id={`${option.id}`}
                        value={`${option.id}`}
                        checked={selectedOptions.length && option.id === selectedOptions[0]}
                        onChange={(e)=>{setSelectedOptions([parseInt(e.target.value)])
                            e.target.checked=true
                        }}
                        className='bg-primary'
                    >
                    </input>

                    <label htmlFor={`${option.id}`} className=''>{option.content}</label>
                </li>)}
            </ul>   
        </div>
    )
}
