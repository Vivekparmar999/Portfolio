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
import eInfochipsLogo from '../images/Einfochips Logo.png';
import eInfochipsLogoTest from '../images/Einfochips Logo test.jpg';
import innoventixSolutions from '../images/InnoventixSolutions.png';

const inter = Inter({ subsets: ['latin'] });

/** Node Version for Project - 20.12.2 */

export default function Home() {

const {projectList,setProjectList} = useContext(projectListContext);
const [top6Projects, setTop6Projects] = useState<ProjectCardProps[]>([]);
const clientRouter = useRouter();

useEffect(()=>{
  setTop6Projects(projectList.sort((a,b)=> b.priority - a.priority).slice(0,6))
},[projectList]);

  return (
    <div className="relative my-10 sm:my-20">
      <div className="mt-10 sm:mt-20 flex">
        <div className="">
          <div className="text-4xl md:text-5xl font-medium">
            <div>Hey, I`m Vivek Parmar</div>
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
              Im a developer based in{' '}
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
              clientRouter.push("/resume");
            }}
          >
            View Resume
          </Button>
        </div>
        <div className="text-v9-light-grey font-light mt-2 mb-4">
          For over 3 years, I have cultivated a deep understanding and expertise
          in <span className="">Front-end Engineering</span>, always
          prioritizing the users needs. In every project I undertake, my aim is
          to craft tailored, intuitive, and thoroughly tested experiences that
          align the goals of companies with the expectations of users.
        </div>
        <Hr width="100%" />
        <div className="flex justify-between flex-col lg:flex-row">
          <div className="text-4xl xl:text-4xl mb-6 lg:mb-0 flex items-center justify-center Arialic_Hollow text-v9-light-grey font-light">
            Oct 21 - Present
          </div>
          <div className="flex justify-center">
            <img
              src={eInfochipsLogo.src}
              alt="University of Phoneix Logo"
              className="h-12 mr-4 mt-1 hidden sm:block"
            />
            <div className="flex flex-col justify-between sm:w-[500px]">
              <div className="text-v9-light-grey font-light">
                Full Stack Developer - 6 Months{' '}
              </div>
              <div className="text-lg sm:text-xl">
                Software Engineer at
                <Anchor href="https://www.einfochips.com">
                  EInfochips
                </Anchor>
                | Project - 
                <Anchor href="https://www.arrow.com">
                  Arrow
                </Anchor>
              </div>
              <div className="text-light text-v9-light-grey mt-2">
                <ul className="list-disc">
                  <li>
                    Work on Technology like Sitecore, .Net , javascipt and
                    Jquery and for database mssql and mongo DB.
                  </li>
                  <li>
                    Deploy the build to Production & lower environment ,and also
                    work on production incidents.
                  </li>
                  <li>
                    Successfully Installed Sitecore vulnerability hotfix patch
                    in all environment.
                  </li>
                  <li>
                    Making websites accessible to all by removing barriers for
                    people with disabilities (Based on WCAG 2.1 Guideline)
                  </li>
                  <li>
                    Used Fortify tool for identifying and fixing security
                    vulnerabilities in software applications.
                  </li>
                  <li>Migrate project from .Net framework 4.8 to .Net 7</li>
                  <li>
                    Proficient in resolving website issues through technical SEO
                    audits to enhance search performance.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Hr width="100%" />
        <div className="flex justify-between flex-col lg:flex-row">
          <div className="text-4xl xl:text-4xl mb-6 lg:mb-0 flex items-center justify-center Arialic_Hollow text-v9-light-grey font-light">
            Aug 2021 - Oct 2021
          </div>
          <div className="flex justify-center">
            <img
              src={eInfochipsLogoTest.src}
              alt="University of Phoneix Logo"
              className="h-12 mr-4 mt-1 hidden sm:block"
            />
            <div className="flex flex-col justify-between sm:w-[500px]">
              <div className="text-v9-light-grey font-light">
                Trainee Engineer - 6 Months{' '}
              </div>
              <div className="text-lg sm:text-xl">
                Trainee Engineer at
                <Anchor href="https://www.einfochips.com">
                  EInfochips
                </Anchor>
              </div>
              <div className="text-light text-v9-light-grey mt-2">
                <ul className="list-disc">
                  <li>
                    Learned about Java, Linux, Cloud - AWS, Azure, Critical
                    Analysis, emotional intelligence, logical thinking, ethics,
                    and management.
                  </li>
                  <li>
                    Developed Movie Management System project with responsive
                    web design.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Hr width="100%" />
        <div className="flex justify-between flex-col lg:flex-row">
          <div className="text-4xl xl:text-4xl mb-6 lg:mb-0 flex items-center justify-center Arialic_Hollow text-v9-light-grey font-light">
            Jan 2021 - May 2021
          </div>
          <div className="flex justify-center">
            <img
              src={innoventixSolutions.src}
              alt="University of Phoneix Logo"
              className="h-5 mr-4 mt-1 hidden sm:block"
            />
            <div className="flex flex-col justify-between sm:w-[500px]">
              <div className="text-v9-light-grey font-light">
                Internship - 5 Months{' '}
              </div>
              <div className="text-lg sm:text-xl">
                Application Development at 
                <Anchor href="https://innoventixsolutions.com">
                  Innoventix Solutions
                </Anchor>
              </div>
              <div className="text-light text-v9-light-grey mt-2">
                <ul className="list-disc">
                  <li>
                  TeleHealth Application that can interact between patient with Client to solve Health related problems.
                  </li>
                  <li>
                  It includes Video,Calling,chat,admin,managing Clients, Billing and Insurance.
                  </li>
                  <li>
                  Create Rest Api for application
                  </li>
                  <li>
                  It has Hippa Supported all feature that is necessary for Telehealth App for US law as Client from US.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Hr width="100%" />
        <div
          className="text-v9-light-grey underline hover:text-white"
          onClick={() => {
            window.open(
              'https://www.linkedin.com/in/vivek-parmar-0b10b4134/',
              '_blank',
            );
          }}
        >
          See my Recommendation on Linkedin
        </div>
      </div>

      {/*Experiemce Section*/}
      <div className="mt-20 sm:mt-32">
        <div className="flex justify-between mb-10 items-center">
          <div className="flex text-4xl sm:text-5xl font-medium">Projects</div>
          <Button onClick={() => {}}>View All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grids-row-auto auto-rows-fr gap-x-5 gap-y-5">
          {/*<ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />*/}
        {
          top6Projects.map((project:ProjectCardProps, index)=>(
            <ProjectCard key={index} {...project}/>
          ))
        }
        </div>
      </div>
      
      {/** TODO Section */}
      {/**Contact Email Section*/}
      {/*<div className="mt-20 sm:mt-32">
        <div className="text-4xl sm:text-5xl font-medium">Contact Me</div>
        <div className="font-light text-v9-light-grey mt-4 mb-10">
          Im always open to new opportunities and connections. Feel free to
          reach out to me at{' '}
          <Anchor href="mailto:parmarvivek084@gmail.com">
            parmarvivek084@gmail.com
          </Anchor>
          !
        </div>
        <EmailBox />
      </div>*/}
    </div>
  );
}
