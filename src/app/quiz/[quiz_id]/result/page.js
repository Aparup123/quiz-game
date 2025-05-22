import { footerHandles } from '@/app/data'
import Navbar from '@/components/navbar'
import { ResultPie } from '@/components/resultPie'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

export default function Result() {
    return (
        <div className='max-w-4xl mx-auto'>
            <div>
                <Navbar />
            </div>
            <div className='flex justify-center gap-3 flex-wrap'>
                <Card className="flex flex-col">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Topic</CardTitle>
                        <CardDescription>Date</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ResultPie/>
                    </CardContent>
                    <CardFooter className="flex-col gap-2 text-sm">
                        <ul>
                            <li><span>Your Score: </span><span>30</span></li>
                            <li><span>Your Accuracy: </span><span>50</span></li>
                        </ul>
                    </CardFooter>
                </Card>
                <div className='flex flex-col justify-between items-center'>
                    <ul className='stats'>
                        <li><span>Total questions:</span><span>50</span></li>
                        <li><span>Attempts:</span><span>30</span></li>
                        <li><span>Correct answers:</span><span>30</span></li>
                        <li><span>Wrong answers:</span><span>20</span></li>
                    </ul>
                    <div className='quick-buttons flex flex-col gap-3'>
                        <Link href={"#"}>Answers</Link>
                        <Link href={"#"}>Suggestion</Link>
                    </div>
                    <div className='share-links'>
                        <h3>Share Result</h3>
                        <ul className='footer-handles flex flex-wrap gap-3'>
                            {footerHandles.map((handle) =>
                                <li className='text-xl' key={handle.title} href={handle.link}>{handle.icon}</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
