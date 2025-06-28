import {Button} from "@/components/ui/button";
import axios from "axios";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {useResults} from "@/store/resultStore";
import {useState} from "react";
import Loader from "@/components/loader";



export default function AttemptResultRow({quizTemplateId, attempt, setAttempts}) {

    const [viewDetailsLoading, setViewDetailsLoading] = useState(false);
    const [evaluateResultLoading, setEvaluateResultLoading]=useState(false);
    const router = useRouter()
    const setResults = useResults((state) => state.setResults);
    const evaluateResult = (attemptId) => {
        setEvaluateResultLoading(true);
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/quiz/evaluate/${attemptId}`, { withCredentials: true })
            .then((res) => {
                console.log("Evaluation successful:", res.data);
                setAttempts((prevAttempts) =>
                    prevAttempts.map(attempt =>
                        attempt._id === attemptId ? res.data.attempt : attempt
                    )
                );
                toast.success("Quiz evaluated successfully!");
            })
            .catch((err) => {
                console.error("Error evaluating quiz:", err);
                toast.error("Error evaluating quiz. Please try again.");
            })
            .finally(() => {
                setEvaluateResultLoading(false);
            })
    }

    // Method to fetch details of an attempt
    const viewDetailedResult = (attemptId) => {
        setViewDetailsLoading(true);
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/quiz/result/${attemptId}`, { withCredentials: true })
            .then((res) => {
                console.log("Detailed result fetched:", res.data);
                setResults(res.data.attempt.results);
                // Navigate to the detailed result page
                router.push(`/quiz/${quizTemplateId}/result/${attemptId}/questions/1`);
            })
            .catch((err) => {
                console.error("Error fetching detailed result:", err);
                toast.error("Error fetching detailed result. Please try again.");
            })
            .finally(() => {
                setViewDetailsLoading(false);
            });
    }

    const evaluated= attempt.status === "evaluated";
    return <tr key={attempt._id}>
        <td>{attempt.attemptNumber}</td>
        <td>{evaluated?`${attempt.score.correctQuestions}/${attempt.score.totalQuestions}`:"-"}</td>
        <td>{0}</td>
        <td>{evaluated?`${attempt.score.obtained}/${attempt.score.total}`:"-"}</td>
        <td>{evaluated?attempt.score.percentage:"-"}</td>
        <td>
            {evaluated ?
                <Button variant="link" onClick={()=>viewDetailedResult(attempt._id)}>
                    {viewDetailsLoading? <Loader/>:"View Details"}
                </Button> :
                <Button variant="link" onClick={()=>evaluateResult(attempt._id)}>
                    {evaluateResultLoading? <Loader/>:"Evaluate"}
                </Button>
            }
        </td>
    </tr>
}