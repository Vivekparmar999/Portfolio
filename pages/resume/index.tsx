import { Button } from '@/components/customHtml';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Resume: NextPage = () => {
    const clientRouter = useRouter();
  return (
    <div>
      <Button
      className='mt-10'
      onClick={()=>{
        clientRouter.push("/");
      }}>Back</Button>
      <div className="flex justify-center mt-10">
        <iframe src="/vivek Resume.pdf" width="100%" height="1000px"></iframe>
      </div>
    </div>
  );
};

export default Resume;
