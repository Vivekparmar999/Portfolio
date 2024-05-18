import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Context from '../context';
import Cursor from "../components/Cursor";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Cursor/>
        <div className="w-full flex justify-center">
        <div className="px-4 w-full sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[1000px] 2x1:w-[1200px]">
          <Component {...pageProps} />
        </div>
      </div>
      </>
  );
}
