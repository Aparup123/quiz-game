import McqOptions from "./mcqOptions"
import MsqOptions from "./msqOptions"

export default function Question({ question, selectedOptions, setSelectedOptions, questionNumber }) {
    
    if(!question){
        return <div>Loading</div>
    }

    return (
        
        <div>
            <p className="font-medium my-3 border-gray-500 border-1 shadow-lg max-w-5xl p-3 rounded-lg min-h-[5rem]">{questionNumber}. {question?.question}</p>
            {question.type=="msq"?
            <MsqOptions
                question={question}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
            />:
            <McqOptions
                question={question}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
            />}
        </div>
    )
}
