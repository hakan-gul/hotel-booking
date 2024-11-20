"use client";

import { useEffect, useState } from "react";
import pb from "@/lib/pocketbase";
import { useRouter } from "next/navigation";

const AccountPage = () => {
  const [user, setUser] = useState(pb.authStore.model);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!pb.authStore.isValid) {
      router.push("/auth/login");
      return;
    }
    setUser(pb.authStore.model);
    setIsLoading(false);
  }, [router]);
  

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto py-28 mt-16">
      <h1 className="text-2xl font-bold mb-4">Hesap Bilgilerim</h1>
      <p>
        <strong>Kullanıcı Adı:</strong> {user?.username}
      </p>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
    </div>
  );
};

export default AccountPage;