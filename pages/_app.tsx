import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Context from '../context';
import Cursor from '../components/Cursor';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import TagManager from "react-gtm-module";

export default function App({ Component, pageProps }: AppProps) {
  const [currentLink,setCurrentLink] = useState("");
  const [canonicalLink,setCanonicalLink] = useState("https://vivekparmar.vercel.app");
  const clientRouter = useRouter();
  const tagManagerArgs = {
    gtmId: "G-KR2Y21KPVJ"
  };
  
  useEffect(()=>{
    //pathname: /resume
    setCurrentLink(clientRouter.pathname.split("/")[1]);
    if(clientRouter.pathname!="/")
    {
      setCanonicalLink("https://vivekparmar.vercel.app"+clientRouter.pathname);
    }else{
      setCanonicalLink("https://vivekparmar.vercel.app");
    }
    TagManager.initialize(tagManagerArgs);
  },[clientRouter.pathname]);

  return (
    <>
      <Context>
        <Head><link rel="canonical" href={canonicalLink}></link></Head>
        <Cursor />
        <Header currentLink={currentLink}/>
        <div className="w-full flex justify-center">
          <div className="px-4 w-full sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[1000px] 2x1:w-[1200px]">
            <Component {...pageProps} />
          </div>
        </div>
      </Context>
    </>
  );
}
