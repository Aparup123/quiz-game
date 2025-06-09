export default function McqOptions({question, selectedOptions, setSelectedOptions}) {
    return (
        <ul className='my-2'>
            {question?.options?.map((option) => <li key={option.number}
                className='space-x-1 border-1 border-gray-400 shadow-lg rounded-lg p-1 px-2 my-2 md:max-w-[20rem] w-full'
            >
                <input
                    type='radio'
                    name="options"
                    id={`${option.number}`}
                    value={`${option.number}`}
                    checked={selectedOptions.length && option.number === selectedOptions[0]}
                    onChange={(e) => {
                        setSelectedOptions([parseInt(e.target.value)])
                        e.target.checked = true
                    }}
                    className='bg-primary '
                >
                </input>

                <label htmlFor={`${option.number}`} className=''>{option.content}</label>
            </li>)}
        </ul>
    )
}
