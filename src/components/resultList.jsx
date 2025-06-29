import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { DialogHeader } from './ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useResults } from '@/store/resultStore'
import { useLoader } from '@/store/loadingStore'
import AttemptResultRow from "@/components/AttemptResultRow";
import Loader from "@/components/loader";
{/* <td><Button variant="link">Evaluate</Button></td> */ }
{/* <td><Button variant="link">View Details</Button></td> */ }
export default function ResultList({ quizTemplateId }) {
    const [loading, setLoading] = useState(false);
    const [attempts, setAttempts] = useState([]);


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



    if(loading){
        return <Loader/>;
    }

        return (
            <div className='w-full'>
                <DialogHeader className="w-full">
                    <DialogTitle className='text-lg font-bold m-2 '>
                       Quiz Results
                    </DialogTitle>
                </DialogHeader>

                <table className='h-fit result-table rounded-lg w-full'>
                    <thead >
                        <tr className="rounded-t-md p-2  px-4 bg-gradient-to-r from-violet-300 to-indigo-200 font-medium text-text-primary backdrop-blur-md">
                            <th >Attempt no</th>
                            <th>Correct questions</th>
                            <th>Time taken</th>
                            <th>Score</th>
                            <th>Percentage</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {loading ?
                        <Loader/> :
                        
                        <tbody className="text-center bg-gray-50">
                        {
                            attempts.map((attempt) => {
                                return (
                                        <AttemptResultRow key={attempt._id} quiztemplateId={quizTemplateId} attempt={attempt} setAttempts={setAttempts}/>
                                )})
                        }
                            
                        </tbody>}
                </table>

            </div>
        )
    }
