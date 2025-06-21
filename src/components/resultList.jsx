import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { DialogHeader } from './ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import axios from 'axios'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useResults } from '@/store/resultStore'
import { useLoader } from '@/store/loadingStore'
{/* <td><Button variant="link">Evaluate</Button></td> */ }
{/* <td><Button variant="link">View Details</Button></td> */ }
export default function ResultList({ quizTemplateId }) {
    const [loading, setLoading] = useState(false);
    const isLoading = useLoader((state) => state.loading);
    const setIsLoading = useLoader((state) => state.setLoading);
    const [attempts, setAttempts] = useState([]);
    const router = useRouter()
    const setResults = useResults((state) => state.setResults);

    useEffect(() => {
        setLoading(true);
        console.log("quizTemplateId",quizTemplateId)
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/quiz/${quizTemplateId}/attempts/`, 
            { withCredentials: true })
        .then((res)=>{
            console.log(res.data);
            setAttempts(res.data.attempts);
        })
        .catch((err) => {
            console.error("Error fetching quiz attempts:", err);
        })
        .finally(() => {
            setLoading(false);
        })
    },[]);

    const evaluateResult = (attemptId) => {    
        setLoading(true);
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
            setLoading(false);
        })
    }

    // Method to fetch detailed result of an attempt
    const viewDetailedResult = (attemptId) => {
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
            setLoading(false);
        });
    }

        return (
            <div className='w-full '>
                <DialogHeader className="w-full">
                    <DialogTitle className='text-lg font-bold m-2 '>
                       Quiz Results
                    </DialogTitle>
                </DialogHeader>

                <table className='h-fit result-table w-full'>
                    <thead>
                        <tr>
                            <th>Attempt no</th>
                            <th>Correct questions</th>
                            <th>Time taken</th>
                            <th>Score</th>
                            <th>Percentage</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {loading ?
                        <Loader /> :
                        
                        <tbody className="text-center">
                        {
                            attempts.map((attempt) => {
                                const evaluated= attempt.status === "evaluated";
                                return (
                                
                                    <tr key={attempt._id}>
                                        <td>{attempt.attemptNumber}</td>
                                        <td>{evaluated?`${attempt.score.correctQuestions}/${attempt.score.totalQuestions}`:"-"}</td>
                                        <td>{0}</td>
                                        <td>{evaluated?`${attempt.score.obtained}/${attempt.score.total}`:"-"}</td>
                                        <td>{evaluated?attempt.score.percentage:"-"}</td>
                                        <td>
                                            {evaluated ? 
                                                <Button variant="link" onClick={()=>viewDetailedResult(attempt._id)}>View Details</Button> : 
                                                <Button variant="link" onClick={()=>evaluateResult(attempt._id)}>Evaluate</Button>
                                            }
                                        </td>
                                    </tr>
                                )})
                        }
                            
                        </tbody>}
                </table>

            </div>
        )
    }
