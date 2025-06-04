import {
        AlertDialog,
        AlertDialogAction,
        AlertDialogCancel,
        AlertDialogContent,
        AlertDialogDescription,
        AlertDialogFooter,
        AlertDialogHeader,
        AlertDialogTitle,
        AlertDialogTrigger,
      } from "@/components/ui/alert-dialog"
      import { Button } from "@/components/ui/button"
import { useQuestions } from "@/store/questionStore"
import { useState } from "react"
      
      export default function ConfirmSubmit() {
        const [attempted, setAttempted]=useState(0)
        const questions=useQuestions((state)=>state.questions)
        const calculateAttempt=async ()=>{
          await setAttempted(questions.filter((q)=>q.status==='attempted').length)
        }

       
        return (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className={`mt-5 border-b-2 border-gray-800`} variant="outline" onClick={calculateAttempt}>Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to submit?</AlertDialogTitle>
                <AlertDialogDescription>
                    <div className="flex justify-around text-black ">
                        <div className="border-2 rounded border-b-green-800 pr-2 flex gap-1 mt-2">
                            <p className=" rounded bg-green-600 p-2  ">Attempted</p>{attempted}
                        </div>
                        <div className="border-2 rounded border-b-red-800 pr-2 flex gap-1 mt-2">
                            <p className="rounded bg-red-500 p-2">Unattempted</p>{questions.length-attempted}
                        </div>
                        
                    </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )
      }
      
