"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useQuestions } from "@/store/questionStore"
import { useState } from "react"

export default function ConfirmSubmit({ submitResponse }) {
  const [attempted, setAttempted] = useState(0)
  const [open, setOpen] = useState(false)
  const { questions } = useQuestions()

  const calculateAttempt = async () => {
    setAttempted(questions.filter((q) => q.status === "attempted").length)
  }

  const handleSubmit = () => {
    submitResponse()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-5 border-b-2 border-gray-800" variant="outline" onClick={calculateAttempt}>
          Submit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to submit?</DialogTitle>
          <DialogDescription asChild>
            <div className="flex justify-around text-foreground">
              <div className="border-2 rounded border-b-green-800 pr-2 flex gap-1 mt-2 items-center">
                <p className="rounded bg-green-600 text-white p-2 text-sm">Attempted</p>
                <span className="font-semibold">{attempted}</span>
              </div>
              <div className="border-2 rounded border-b-red-800 pr-2 flex gap-1 mt-2 items-center">
                <p className="rounded bg-red-500 text-white p-2 text-sm">Unattempted</p>
                <span className="font-semibold">{questions.length - attempted}</span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
