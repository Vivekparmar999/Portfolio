import { ButtonLink } from '@/components/customHtml';
import { NextPage } from 'next';
import { sendGTMEvent } from '@/helpers/helpers';
import seo from '@/data/seo.json';

const Resume: NextPage = () => {
  return (
    <div>
      <ButtonLink
      href="/"
      className='mt-10 w-fit'
      onClick={()=>{
        void sendGTMEvent("resume_back_click");
      }}>Back</ButtonLink>
      <h1 className="text-4xl font-medium mt-10">Vivek Parmar Resume</h1>
      <p className="text-v9-light-grey mt-4">{seo.resume.description}</p>
      <p className="mt-4">
        <a href="/vivek%20Resume.pdf" className="text-v9-pink underline" download onClick={() => { void sendGTMEvent("resume_download_click"); }}>
          Download Vivek Parmar&apos;s resume (PDF)
        </a>
      </p>
      <div className="flex justify-center mt-10">
        <iframe src="/vivek%20Resume.pdf" title="Vivek Parmar resume" width="100%" height="1000px"></iframe>
      </div>
    </div>
  );
};

export default Resume;
