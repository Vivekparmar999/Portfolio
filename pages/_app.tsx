import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Context from '../context';
import Cursor from '../components/Cursor';
import Header from '@/components/Header';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import MetaTags from '@/components/meta/MetaTags';
import { trackPageView } from '@/helpers/analytics';
import { Analytics } from '@vercel/analytics/next';

export default function App({ Component, pageProps }: AppProps) {
  const clientRouter = useRouter();
  //pathname: /resume
  const currentLink = clientRouter.pathname.split("/")[1];

  useEffect(()=>{
    if (clientRouter.isReady) trackPageView();
  },[clientRouter.isReady, clientRouter.asPath]);

  return (
    <>
      <Context>
        <MetaTags pathname={clientRouter.pathname} />
        <Cursor />
        <Header currentLink={currentLink}/>
        <div className="w-full flex justify-center">
          <div className="px-4 w-full sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[1000px] 2x1:w-[1200px]">
            <Component {...pageProps} />
          </div>
        </div>
      </Context>
      <Analytics />
    </>
  );
}
