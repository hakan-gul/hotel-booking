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
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { toast, useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import pb from "@/lib/pocketbase"

const formSchema = z.object({
  email: z.string().email({message: "Invalid email address"}).nonempty({message: "Email is required"}),
  password: z.string().min(8, {message: "Password must be at least 8 characters long"}),
})

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: 'deneme@gmail.com',
        password: '12345678',
    },
  })

  const onSubmit = async(data: z.infer<typeof formSchema>) =>{
    setIsLoading(true);
    console.log(data);
    try{
      const authData = await pb.collection('users').authWithPassword(
        data.email,
        data.password,
        { autoCancel: false } // İsteklerin otomatik iptal edilmesini önlemek için autoCancel: false ekleyin
      );
      console.log(pb.authStore.model?.email);
      
      toast({
        variant: "success",
        title: "Login Success",
        description: "You have successfully logged in.",
        action: <ToastAction altText="Success">Success</ToastAction>,
      })
      router.push('/about');
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Login failed. Please check your credentials.",
        action: <ToastAction altText="destructive">Retry</ToastAction>,
      })
    } finally {
      setIsLoading(false);
    }
  }

  if (!isClient) {
    return null;
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
                <Input placeholder="***" type="password" {...field} />
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
              ) : (
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