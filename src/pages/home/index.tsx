import { useGetStore } from '@/hooks';
import { useRouter } from 'next/router';
import React,{useEffect} from 'react';

const HomePage = () => {

  const { auth } = useGetStore();
  const router = useRouter();

  useEffect(()=>{
    if(auth.status !== 'authenticated'){
      router.push('/auth/login');
    }
  },[auth.status, router]);

  return (
    <div>
      HomePage
    </div>
  );
};

export default HomePage;
