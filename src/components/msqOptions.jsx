import React from 'react'

export default function MsqOptions({ question, selectedOptions, setSelectedOptions }) {
    console.log(selectedOptions)
    const handleChange = (e, number) => {
        if (e.target.checked) {
            setSelectedOptions((prev) => [...prev, number]);
            e.target.checked = false
        } else {
            setSelectedOptions((prev) => prev.filter((n) => n !== number));
            e.target.checked = true
        }
    };
    return (
        <ul className='my-2'>
            {question?.options?.map((option) => <li key={option.number}
                className='space-x-1 border-1 border-gray-400 shadow-lg rounded-lg p-1 px-2 my-2 md:max-w-[20rem] w-full'
            >
                <input
                    type='checkbox'
                    name="options"
                    id={`${option.number}`}
                    value={`${option.number}`}
                    checked={selectedOptions.length && selectedOptions.includes(option.number)}
                    onChange={(e) => {
                        handleChange(e, parseInt(e.target.value))

                    }}
                    className='bg-primary '
                >
                </input>
                <label htmlFor={`${option.number}`} className=''>{option.content}</label>
            </li>)}
        </ul>
    )
}
