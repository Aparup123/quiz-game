import ResultMcqOptions from "./resultMcqOptions"
import ResultMsqOptions from "./resultMsqOptions"

export default function ResultQuestion({ question, selectedOptions, questionNumber }) {
    
    if(!question){
        return <div>Loading</div>
    }

    return (
        
        <div>
            <p className="font-medium my-3 border-gray-500 border-1 shadow-lg max-w-5xl p-3 rounded-lg min-h-[5rem]">{questionNumber}. {question?.question}</p>
            {question.type=="msq"?
            <ResultMsqOptions
                question={question}
                selectedOptions={selectedOptions}
            />:
            <ResultMcqOptions
                question={question}
                selectedOptions={selectedOptions}
            />}
        </div>
    )
}
