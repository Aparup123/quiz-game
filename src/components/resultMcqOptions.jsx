export default function ResultMcqOptions({question, selectedOptions}) {
    const optionStyle={
        base:'space-x-1 border-1 border-gray-400 shadow-lg rounded-lg p-1 px-2 my-2 md:max-w-[20rem] w-full',
        correct: 'bg-green-100 border-green-500'
    }
    return (
        <ul className='my-2'>
            {question?.options?.map((option) => <li key={option.number}
                className={option.isCorrect ? `${optionStyle.base} ${optionStyle.correct}` : optionStyle.base}
            >
                <input
                    type='radio'
                    name="options"
                    id={`${option.number}`}
                    value={`${option.number}`}
                    checked={selectedOptions.length && option.number === selectedOptions[0]}
                    className='bg-primary '
                    readOnly
                >
                </input>

                <label htmlFor={`${option.number}`} className=''>{option.content}</label>
            </li>)}
        </ul>
    )
}
