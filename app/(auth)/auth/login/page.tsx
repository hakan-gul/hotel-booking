"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React, { useState } from 'react'
import { useRouter } from "next/navigation"
import { set } from "date-fns"
import { Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { toast, useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { pb } from "@/lib/pocketbase"

const formSchema = z.object({
  email: z.string().min(2,{message:"Email is required"}),
  password: z.string().min(2,{message:"Password is required"}),
})

const LoginPage = () => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: 'deneme@gmail.com',
        password: '123',
    },
    })

    const onSubmit = async(data: z.infer<typeof formSchema>) =>{
      setIsLoading(true);
      console.log(data);
      try{
        const authData = await pb.collection('users').authWithPassword(
          data.email,
          data.password,
      );
          
          console.log(pb.authStore.isValid);
          console.log(pb.authStore.token);
          console.log(pb.authStore.model?.id);
          
      pb.authStore.clear();
        toast({
          variant: "success",
          title: "Register Success",
          description: "This job is successful.",
          action: <ToastAction altText="Success">Success</ToastAction>,
        })
        router.refresh();
        router.push('/');
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "This job is failed.",
          action: <ToastAction altText="destructive">destructive</ToastAction>,
        })
      }
      finally{
        setIsLoading(false);
      }
    }
  

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-4/5">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-black">E-Mail</FormLabel>
            <FormControl>
              <Input placeholder="deneme@email.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

<FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-black">Password</FormLabel>
            <FormControl>
              <Input placeholder="***" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex w-full justify-center">
        <Button type="submit">
          {
            isLoading ?(
              <>
                <Loader2 size={20} className="animate-spin mr-2" /> Loading
              </>
            ):(
              <>
                Login
              </>
            )
          }
          </Button>
      </div>
      
    </form>
    <div className="flex flex-col items-center mt-8">
      <Label>
        Don't have an account?
      </Label>
      <Link href="/auth/register" className="text-slate-500">
        Click here to create a new account
      </Link>
    </div>
  </Form>
  )
}

export default LoginPage