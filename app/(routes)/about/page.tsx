"use client";

import { useEffect, useState } from 'react';
import pb from '@/lib/pocketbase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const AboutPage = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(pb.authStore.isValid);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const router = useRouter();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       console.log('Starting auth refresh...');
  //       await pb.collection('users').authRefresh();
  //       console.log('Auth refresh successful.');
  //       setIsLoggedIn(pb.authStore.isValid);
  //     } catch (error: any) {
  //       console.error('Auth refresh failed:', error);
  //       setError(error.message || 'Bilinmeyen bir hata oluştu.');
  //       setIsLoggedIn(false);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   checkAuth();
  // }, []);

  // // isLoggedIn ve pb.authStore.model değerlerini loglayalım
  // console.log('isLoggedIn:', isLoggedIn);
  // console.log('pb.authStore.model:', pb.authStore.model);

  // const handleLogout = () => {
  //   pb.authStore.clear();
  //   setIsLoggedIn(false);
  //   router.push('/auth/login');
  // };

  // if (isLoading) {
  //   return <div>Yükleniyor...</div>;
  // }

  // if (error) {
  //   return <div>Bir hata oluştu: {error}</div>;
  // }

  return (
    <div className=" pt-80">
      {/* {isLoggedIn ? (
        <div>
          <h1>Hoş Geldiniz, {pb.authStore.model?.email}</h1>
          <Button onClick={handleLogout}>Çıkış Yap</Button>
        </div>
      ) : (
        <div>Lütfen giriş yapın.</div>
      )} */}
    </div>
  );
};

export default AboutPage;