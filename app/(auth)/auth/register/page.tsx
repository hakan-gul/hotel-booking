"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React, { useState } from 'react'
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { pb } from "@/lib/pocketbase"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

const formSchema = z.object({
  name: z.string().min(2,{message:"Name is required"}),
  email: z.string().min(2,{message:"Email is required"}),
  password: z.string().min(2,{message:"Password is required"}),
  passwordConfirm: z.string().min(2,{message:"Password confirm is required"}),
  username: z.string().min(2,{message:"Username is required"}),
  
  }).refine(
    (values) => {
      return values.password === values.passwordConfirm;
    },
    {
      message: "Passwords must match!",
      path: ["passwordConfirm"],
    }
  );

const RegisterPage = () => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        username: '',
    },
    })

  const onSubmit = async(data: z.infer<typeof formSchema>) =>{
    setIsLoading(true);
    console.log(data);
    try{
      const userData = {
        username: data.username,
        email: data.email,
        emailVisibility: true,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        name: data.name,
    };
      const record = await pb.collection('users').create(data);
      toast({
        variant: "success",
        title: "Register Success",
        description: "This job is successful.",
        action: <ToastAction altText="Success">Success</ToastAction>,
      })
      router.refresh();
      router.push('/auth/login');
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
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-black">Name</FormLabel>
            <FormControl>
              <Input placeholder="Hakan" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

    <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-black">Username</FormLabel>
            <FormControl>
              <Input placeholder="Hakan68" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
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
              <Input type="password" placeholder="***" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="passwordConfirm"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-black">Password Confirm</FormLabel>
            <FormControl>
              <Input type="password" placeholder="***" {...field} />
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
                Register
              </>
            )
          }
          </Button>
      </div>
      
    </form>
    <div className="flex flex-col items-center mt-8">
      <Label>
        Already have an account?
      </Label>
      <Link href="/auth/login" className="text-slate-500">
        Click here to login
      </Link>
    </div>
  </Form>
  )
}

export default RegisterPage