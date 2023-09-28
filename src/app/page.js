'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useState, useEffect } from 'react';
import Brand from '@/component/Brand';
import Header from '@/component/Header';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { GoogleLoginButton } from "react-social-login-buttons";



export default function Home() {

  const router = useRouter();
  const [splash, setSplash] = useState(true)


  const session =useSession();
  console.log(session);

  

 

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplash(false)
    }, 1000);
    return () => clearTimeout(timer);
  }, []);




  
  if(session.status ==="loading"){
    return  splash == true ?
      <div className='splash d-flex align-items-center justify-content-center'>
        <Brand />
      </div>
      :
      null
    
}

if(session.status ==="authenticated"){
  router.push("/stock")
}
if(session.status ==="unauthenticated"){
  return (
    <>
   
      <main className='login'>
        <div className="content">
          <Header
            type={4}
            heading="Sign in to your account"
            brand=""
            welcome=""
            business=""
          />
          <div className="container-fluid p-0">
            <div className="row g-0 w-100">
              <div className="col-12 text-center ">
                <div className="login-wrpr  px-4 w-100">
                <GoogleLoginButton onClick={()=>signIn("google")} text="Continue with Google" />
                {/* <button onClick={()=>signIn("google")}>Login with google</button> */}
                </div>
                {/* <p>Dont have a account? <Link href={""}>Sign Up</Link></p> */}
              </div>
            </div>
          </div>
        </div>
      </main>  
      </>
  )
  
}

  
}
