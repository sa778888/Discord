"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../ui/dialog"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import {FileUpload} from "../file-upload"
import axios from "axios";
import { useRouter } from "next/navigation"
const formSchema = z.object({
    name: z.string().min(1, {
        message: "server name is req"
    }),
    imageUrl: z.string().min(1, {
        message: "server image is req"
    }),
})

export const InitialModal = () => {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        }
    })

    const isLoading = form.formState.isSubmitting
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post("/api/servers",values)
            form.reset;
            router.refresh();
            window.location.reload();
        } catch (error) {
            console.log(error);
            
        }
    }

    if (!isMounted) {
        return null;
    }
    return (
        <Dialog open>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="font-bold text-2xl text-center">
                        custamize your server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-100">
                        personalize server
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField control={form.control} name="imageUrl" render={({ field }) => (
                                    <FormItem >
                                      <FormControl>
                                        <FileUpload  
                                        endpoint="serverImage"
                                        value={field.value}
                                        onChange={field.onChange} />
                                        </FormControl>                              
                                    </FormItem>
                                )} />
                            </div>

                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem >
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-100 dark:text-secondary/70 ">
                                        Server Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 " placeholder="Enter the server name " {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button variant="primary" disabled={isLoading} >
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}