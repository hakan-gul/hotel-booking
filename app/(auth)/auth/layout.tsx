// app/layout.tsx

"use client";
import pb from '@/lib/pocketbase';
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  
  const [user, setUser] = useState(pb.authStore.model);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  // const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // setMounted(true);

    const checkAuth = () => {
      if (pb.authStore.isValid) {
        // Kullanıcı oturum açmışsa, ana sayfaya yönlendir
        router.replace("/");
      } else {
        // Kullanıcı oturum açmamışsa, yükleniyor durumunu kapat
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (
    // !mounted ||
     isLoading) {
    return (
      <div className='h-screen flex justify-center items-center bgone'>
        <div className='text-white'>Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className='h-screen flex justify-center items-center bgone'>
      <div className='hidden lg:block lg:w-1/2 h-full'>
        <Image 
          alt="login"
          src="/auth.jpg"
          width={1080}
          height={1920}
          className='h-full w-full object-cover'
        />
      </div>
      <div className='w-full lg:w-1/2 p-10 flex flex-col items-center'>
        <div className='flex items-center mb-6'>
          <div className='w-24 py-4 px-3 rounded-xl bg-white'>
            <Link href='/'>
              <Image 
                src="/logo.png"
                alt="logo"
                width={500}
                height={500}
                className='w-full'
              />
            </Link>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;