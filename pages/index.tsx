import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { projectListContext } from '../context';
import ProjectCard, { ProjectCardProps } from '../components/ProjectCard';
import { Anchor, Button, Hr } from '../components/customHtml';
import EmailBox from '../components/EmailBox';

import uopxLogo from '../images/uopx-phoenixbird-red.png';
import hackerrankLogo from '../images/HackerRank_logo.png';
import hmsLogo from '../images/100ms_logo.png';
import webmateLogo from '../images/webmate_logo.png';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  /*  const { projectList, setProjectList } = useContext(ProjectListContext);
  const [ top6Projects, setTop6Projects ] = useState<ProjectCardProps[]>([]);
  const clientRouter = useRouter();

  useEffect(()=>{
    setTop6Projects(projectList.sort((a:any,b:any)=> b.priority - a.priority).slice(0,6));
  });*/

  return (
    <div className="relative my-10 sm:my-20">
      <div className="mt-10 sm:mt-20 flex">
        <div className="">
          <div className="text-4xl md:text-5xl font-medium">
            <div>Hey, I`m Ruchi Parmar</div>
            <div className="mt-4">
              <span className="hidden sm:inline-block mr-4">I`m a</span>
              <span className="text-v9-yellow whitespace-nowrap">
                .Net Developer
              </span>
            </div>
          </div>
          <div className="text-lg md:text-xl text-v9-light-grey font-light mt-4">
            Bringing your vision to life, one pixel at a time. 🎨
          </div>
          <div className="text-v9-light-grey font-light mt-8">
            <p className="">
              I'm a developer based in{' '}
              <Anchor
                href="https://www.google.com/maps/place/Tempe,+AZ/@33.3919224,-111.9281011,12z/"
                target="_blank"
                onClick={() => {}}
              >
                Tempe, AZ
              </Anchor>
              , with 2 years of experience working with{' '}
              <span className="font-bold">Javascript , React , Css</span>.
              Specialize in building{' '}
              <Anchor
                href="https://vivek9patel.github.io/"
                onClick={() => {}}
                target={'_blank'}
              >
                expectional website
              </Anchor>
              , applications and everything in between. Currently I am in my
              final year of completing Master Degree in Computer science from
              ASU, so I`m looking for software engineering/new grad jobs.
            </p>
          </div>
        </div>
      </div>

      {/**Experience Section */}
      <div className="mt-20 sm:mt-32">
        <div className="flex justify-between mb-6 items-center">
          <div className="text-4xl sm:text-5xl font-medium">Experience</div>
          <Button
            onClick={() => {
              //clientRouter.push("/resume");
            }}
          >
            View Resume
          </Button>
        </div>
        <div className="text-v9-light-grey font-light mt-2 mb-4">
          For over 3 years, I have cultivated a deep understanding and expertise
          in <span className="">Front-end Engineering</span>, always
          prioritizing the user's needs. In every project I undertake, my aim is
          to craft tailored, intuitive, and thoroughly tested experiences that
          align the goals of companies with the expectations of users.
        </div>
        <Hr width="100%" />
        <div className="flex justify-between flex-col lg:flex-row">
          <div className="text-4xl xl:text-5xl mb-6 lg:mb-0 flex items-center justify-center Arialic_Hollow text-v9-light-grey font-light">
            May 23 - Present
          </div>
          <div className="flex justify-center">
            <img
              src={uopxLogo.src}
              alt="University of Phoneix Logo"
              className="h-12 mr-4 mt-1 hidden sm:block"
            />
            <div className="flex flex-col justify-between sm:w-[500px]">
              <div className="text-v9-light-grey font-light">
                Internship - 6 Months{' '}
              </div>
              <div className="text-lg sm:text-xl">
                Software Engineer at University of Phoneix
              </div>
              <div className="text-light text-v9-light-grey mt-2">
                I Develop,responsive components with a focus on accessbility,
                enhancing user experience alongside Adobe AEM, Adobe ADA and
                Adobe Target
              </div>
            </div>
          </div>
        </div>
        <Hr width="100%" />
        <div className="flex justify-between flex-col lg:flex-row">
          <div className="text-4xl xl:text-5xl mb-6 lg:mb-0 flex items-center justify-center Arialic_Hollow text-v9-light-grey font-light">
            May 23 - Present
          </div>
          <div className="flex justify-center">
            <img
              src={uopxLogo.src}
              alt="University of Phoneix Logo"
              className="h-12 mr-4 mt-1 hidden sm:block"
            />
            <div className="flex flex-col justify-between sm:w-[500px]">
              <div className="text-v9-light-grey font-light">
                Internship - 6 Months{' '}
              </div>
              <div className="text-lg sm:text-xl">
                Software Engineer at University of Phoneix
              </div>
              <div className="text-light text-v9-light-grey mt-2">
                I Develop,responsive components with a focus on accessbility,
                enhancing user experience alongside Adobe AEM, Adobe ADA and
                Adobe Target
              </div>
            </div>
          </div>
        </div>
        <Hr width="100%" />
        <div 
        className='text-v9-light-grey underline hover:text-white'
        onClick={()=>{
          window.open("https://www.linkedin.com/in/vivek-parmar-0b10b4134/", "_blank");
        }}>
          See my Recommendation on Linkedin
        </div>
      </div>

      {/*Experiemce Section*/}
      <div className='mt-20 sm:mt-32'>
        <div className='flex justify-between mb-10 items-center'>
          <div className='flex text-4xl sm:text-5xl font-medium'>
              Projects
          </div>
          <Button
            onClick={()=>{}}
          >
            View All
          </Button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grids-row-auto auto-rows-fr gap-x-5 gap-y-5'>
          <ProjectCard/>
          <ProjectCard/>
          <ProjectCard/>
          <ProjectCard/>
          <ProjectCard/>
          <ProjectCard/>
        </div>
      </div>

      {/**Contact Email Section*/}
      <div className='mt-20 sm:mt-32'>
        <div className='text-4xl sm:text-5xl font-medium'>Contact Me</div>
        <div className='font-light text-v9-light-grey mt-4 mb-10'>I'm always open to new opportunities and connections. Feel free to
          reach out to me at{" "}
          <Anchor
          href='mailto:parmarvivek084@gmail.com'
          >
            parmarvivek084@gmail.com
          </Anchor>!
          </div>
          <EmailBox />
      </div>
    </div>
  );
}
