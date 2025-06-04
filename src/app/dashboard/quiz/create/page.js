"use client"
import Navbar from '@/components/navbar'
import React from 'react'
import {useForm} from "react-hook-form"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from '@/components/ui/input';
import z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/button'
import {Slider} from '@/components/ui/slider'
import { ValueSlider } from '@/components/ui/value-slider'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
export default function CreateGame() {

  const formSchema=z.object({
    topic:z.string().nonempty(),
    duration:z.string().min(5),
    difficulty:z.number().min(1).max(100),
    questionType:z.string().length(3),
    totalQuestions:z.string().min(1),
    score:z.string().min(1)
    
  })

  const form=useForm({
    resolver:zodResolver(formSchema),
    defaultValues:{
      topic:"",
      duration:"",
      difficulty:30,
      questionType:"mcq",
      totalQuestions:"1",
      score:"1"
    }
  });



  const createGame=(values)=>{
    console.log(values)
  }

  return (
    <div className='container lg:max-w-4xl mx-auto px-10 overflow-hidden pt-5 md:text-4xl'>
      <h1>Select Topic and options</h1>
      <div >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(createGame)} className='grid md:grid-cols-2 gap-5 mt-5 lg:mt-10' >
            <FormField
              control={form.control}
              name="topic"
              render={({field})=>(
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter quiz topic"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({field})=>
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input {...field} type="time"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              }
            />
            <FormField
              control={form.control}
              name="difficulty"
              render={({field})=>
                <FormItem>
                  <FormLabel>Difficulty</FormLabel>
                  <FormControl>
                    <ValueSlider
                      defaultValue={[30]}
                      max={100}
                      step={1}
                      onValueChange={(value) => field.onChange(value[0])}
                      value={[field.value]}
                     
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              }
            />
            <FormField
              control={form.control}
              name="questionType"
              render={({field})=>
                <FormItem>
                  <FormLabel>Question type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger >
                          <SelectValue/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem default value="mcq">MCQ</SelectItem>
                          <SelectItem value="msq">MSQ</SelectItem>
                          <SelectItem value="mix">Misleneous</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                </FormItem>
              }
            />
            <FormField
              control={form.control}
              name="totalQuestions"
              render={({field})=>
                <FormItem>
                  <FormLabel>No of questions</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} min={1}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              }
            />
            <FormField
              control={form.control}
              name="score"
              render={({field})=>
                <FormItem>
                  <FormLabel>Score</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} {...field}/>
                  </FormControl>
                </FormItem>
              }
            />
            <Button type="submit" className="md:col-span-2">Start {"->"}</Button>

        
          </form>
        </Form>
      </div>
    </div>
  )
}
