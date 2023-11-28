"use client"
import React from 'react'
import * as zod from "zod"
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const formSchema = zod.z.object({
    title: zod.z.string().min(1, {
        message: "Title is required",
    }),
})

const CreateCourse = () => {
  const router = useRouter();
  const form = useForm<zod.z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: ""
    },
  })
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: zod.z.infer<typeof formSchema>) => {
    try {
        const response = await axios.post("/api/course", values)
        router.push(`/teacher/courses/${response?.data?.id}`)
    } catch (error) {
        toast.error("Something went wrong")
    }
  }
    return (
        <section className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1 className="text-2xl">
                    Name your course
                </h1>
                <p className="text-sm text-slate-600">What would you like to name your course? Don&apos;t worry, you can change this later.</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 mt-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g. 'Complete web development'"
                                        {...field}
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormDescription>
                                    What will you teach in this course?
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center gap-x-2">
                        <Link href="/">
                            <Button type='button' variant="ghost">Cancel</Button>
                        </Link>
                        <Button
                            disabled={!isValid || isSubmitting}
                            type="submit"
                            >
                                Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </section>
    )
}

export default CreateCourse