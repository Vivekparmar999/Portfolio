import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { projectListContext } from '../context';
import ProjectCard, { ProjectCardProps } from '../components/ProjectCard';
import { Anchor, Button, Hr } from '../components/customHtml';
import {
  SiSitecore,
  SiDotnet ,
  SiReact ,
  SiMongodb ,
  SiMysql ,
  SiTeamcity ,
  SiOctopusdeploy ,
  SiRedis ,
  SiJavascript ,
  SiHtml5 ,
  SiCss as SiCss3 ,
  SiNextdotjs ,
  SiJquery ,
  SiGithub,
  SiAngular
} from "react-icons/si";
import { TbBrandAdobe } from "react-icons/tb";

import eInfochipsLogo from '../images/Einfochips Logo.png';
import innoventixSolutions from '../images/InnoventixSolutions.png';
import experienceData from '../data/experience.json';
import { IconType } from 'react-icons';
import React from 'react';
import TagManager from "react-gtm-module";
import { sendGTMEvent, calculateYears } from '@/helpers/helpers';

const inter = Inter({ subsets: ['latin'] });

/** Node Version for Project - 20.12.2 */

export default function Home() {
  const clientRouter = useRouter();

  const { projectList, setProjectList } = useContext(projectListContext);
  const [top6Projects, setTop6Projects] = useState<ProjectCardProps[]>([]);
  
  const careerStartDate = new Date('2021-09-01');
  const yearsOfExperience = calculateYears(careerStartDate);

  //Added here to control logo height
  const companyLogos: Record<string, { src: string; className: string }> = {
    eInfochipsLogo: { src: eInfochipsLogo.src, className: 'h-16 mt-1' },
    innoventixSolutions: { src: innoventixSolutions.src, className: 'h-4 mt-8' }
  };

  const [flippedSkill, setFlippedSkill] = useState<number | null>(null);
  const [flippedDb, setFlippedDb] = useState<number | null>(null);
  const [flippedTool, setFlippedTool] = useState<number | null>(null);

  const professionalSkillList : {icon: IconType, name: string}[] = [
    {icon: SiSitecore, name: 'Sitecore'},
    {icon: SiDotnet, name: '.NET'},
    {icon: SiAngular, name: 'Angular'},
    {icon: SiJavascript, name: 'JavaScript'},
    {icon: TbBrandAdobe, name: 'Adobe Experience Manager'},
    {icon: SiJquery, name: 'jQuery'},
    {icon: SiReact, name: 'React'},
    {icon: SiNextdotjs, name: 'Next.js'},
    {icon: SiHtml5, name: 'HTML5'},
    {icon: SiCss3, name: 'CSS3'}
  ];
  const databaseList : {icon: IconType, name: string}[] = [
    {icon: SiMysql, name: 'MySQL'},
    {icon: SiMongodb, name: 'MongoDB'},
    {icon: SiRedis, name: 'Redis'}
  ];
  const toolsList : {icon: IconType, name: string}[] = [
    {icon: SiGithub, name: 'GitHub'},
    {icon: SiOctopusdeploy, name: 'Octopus Deploy'},
    {icon: SiTeamcity, name: 'TeamCity'}
  ];

  useEffect(() => {
    setTop6Projects(
      projectList.sort((a, b) => b.priority - a.priority).slice(0, 6),
    );
  }, [projectList]);



  const [roleIndex, setRoleIndex] = useState(0);
  const roles = [
    'Sitecore Certified Developer |',
    '.Net Developer |',
    'Frontened Developer |',
  ];
  const [text, setText] = useState('');
  const fullText = roles[roleIndex];

  useEffect(() => {
    let index = 0;

    const intervalId = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(intervalId);
        setTimeout(() => {
          setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        }, 1000);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, [roleIndex]);

  return (
    <div className="relative my-10 sm:my-20">
      <div className="mt-10 sm:mt-20 flex">
        <div className="">
          <div className="text-4xl md:text-5xl font-medium">
            <div>Hey, I`m Vivek Parmar</div>
            <div className="mt-4">
              <span className="hidden sm:inline-block sm:text-2xl mr-4 md:text-3xl">
                I`m a
              </span>
              <span className="text-v9-yellow whitespace-nowrap md:text-3xl sm:text-2xl text-xl">
                {text}
              </span>
            </div>
          </div>
          <div className="text-lg md:text-xl text-v9-light-grey font-light mt-4">
            Innovating the future, one line of code at a time. 🚀💡
          </div>
          <div className="text-v9-light-grey font-light mt-8">
            <p className="">
              I`m a developer based in{' '}
              <Anchor
                href="https://www.google.com/maps/place/Ahmedabad,+Gujarat/@23.0204741,72.4149257,11z"
                target="_blank"
              >
                Ahmedabad, Gujarat
              </Anchor>
              , with {yearsOfExperience} years of experience working with{' '}
              <span className="font-bold">Sitecore , .Net, Javascript</span>.
              Specialize in building , expectional website, applications and
              everything in between. Currently, I am looking for position where
              I get appreciation of my knowledge.
            </p>
          </div>
        </div>
      </div>

      {/**Experience Section */}
      <div className="mt-20 sm:mt-32">
        <div className="flex justify-between mb-6 items-center">
          <div className="text-4xl sm:text-5xl font-medium">Experience</div>
          <Button
            onClick={async () => {
              clientRouter.push('/resume');
              await sendGTMEvent("viewResume_btn_click");
            }}
          >
            View Resume
          </Button>
        </div>
        <div className="text-v9-light-grey font-light mt-2 mb-4">
          For over {yearsOfExperience} years, I have cultivated a deep understanding and expertise
          in <span className="">Software Engineering</span>, always prioritizing
          the users needs. In every project I undertake, my aim is to craft
          tailored, intuitive, and thoroughly tested experiences that align the
          goals of companies with the expectations of users.
        </div>
        
        {/** Professional Experience*/}
        {experienceData.map((exp: any, expIdx) => (
          <React.Fragment key={expIdx}>
            <Hr width="100%" />
            <div className="flex justify-between flex-col lg:flex-row">
              <div className="text-4xl xl:text-4xl mb-6 lg:mb-0 flex items-center justify-center text-v9-light-grey font-light">
                {exp.duration}
              </div>
              <div className="flex justify-center">
                {companyLogos[exp.logo] && (
                  <img
                    src={companyLogos[exp.logo].src}
                    alt={`${exp.company} Logo`}
                    className={`${companyLogos[exp.logo].className} mr-4 hidden sm:block`}
                  />
                )}
                <div className="flex flex-col justify-between ml-6 sm:w-[500px]">
                  <div className="text-xl sm:text-2xl font-semibold">
                    {exp.role}
                  </div>
                  <div className="text-v9-light-grey text-lg font-light">
                    at <Anchor data-gtm_event={exp.gtmEvent} href={exp.companyUrl} className="text-white hover:text-[#C889E6] font-medium underline">{exp.company}</Anchor>
                  </div>
                  
                  {exp.projects.map((proj: any, projIdx: number) => (
                    <React.Fragment key={projIdx}>
                      <div className="text-lg sm:text-xl mt-4 border-t border-v9-light-grey border-opacity-20 pt-4">
                        Project - {proj.projectUrl ? (
                          <Anchor data-gtm_event={proj.gtmEvent} href={proj.projectUrl} className="text-[#C889E6] hover:underline font-medium">{proj.name}</Anchor>
                        ) : (
                          <span className="text-[#C889E6] font-medium">{proj.name}</span>
                        )}
                        {proj.duration && (
                          <span className="text-sm text-v9-light-grey block sm:inline-block sm:ml-4 font-light">({proj.duration})</span>
                        )}
                      </div>
                      <div className="text-light text-v9-light-grey mt-2">
                        <ul className="list-disc">
                          {proj.highlights.map((highlight: string, highIdx: number) => (
                            <li key={highIdx}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}

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

      {/** Professional Skillset*/}
      <div className="mt-20 sm:mt-32">
        <div className="text-4x1 sm:text-5xl font-medium">
          Professional Skillset
        </div>
        <div className="mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 grids-row-auto auto-rows-fr gap-x-6 gap-y-6">
            {professionalSkillList.map((skill, index) => (
              <div
                key={index}
                className="relative h-32 [perspective:1000px] group"
                onClick={() => setFlippedSkill(flippedSkill === index ? null : index)}
              >
                <div className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ${flippedSkill === index ? '[transform:rotateY(180deg)]' : ''}`}>
                  {/* Front */}
                  <div className="absolute inset-0 flex items-center justify-center text-5xl border border-[#C889E6] rounded-md bg-v9-secondary-black [backface-visibility:hidden]">
                    <div className="flex px-6 py-6 opacity-90 justify-center">
                      {React.createElement(skill.icon as React.ElementType)}
                    </div>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 flex items-center justify-center border border-[#C573E6] border-2 rounded-md bg-v9-secondary-black [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-md shadow-[#5904A8]">
                    <div className="text-lg font-medium text-white px-4 text-center">
                      {skill.name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/**Database */}
      <div className="text-3xl font-medium mt-5 sm:mt-8">Database</div>
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 grids-row-auto auto-rows-fr gap-x-6 gap-y-6">
          {databaseList.map((db, index) => (
            <div
              key={index}
              className="relative h-32 [perspective:1000px] group"
              onClick={() => setFlippedDb(flippedDb === index ? null : index)}
            >
              <div className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ${flippedDb === index ? '[transform:rotateY(180deg)]' : ''}`}>
                {/* Front */}
                <div className="absolute inset-0 flex items-center justify-center text-5xl border border-[#C889E6] rounded-md bg-v9-secondary-black [backface-visibility:hidden]">
                  <div className="flex px-6 py-6 opacity-90 justify-center">
                    {React.createElement(db.icon as React.ElementType)}
                  </div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 flex items-center justify-center border border-[#C573E6] border-2 rounded-md bg-v9-secondary-black [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-md shadow-[#5904A8]">
                  <div className="text-lg font-medium text-white px-4 text-center">
                    {db.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/**Tools */}
      <div className="text-3xl font-medium mt-5 sm:mt-8">Tools (CI/CD)</div>
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 grids-row-auto auto-rows-fr gap-x-6 gap-y-6">
          {toolsList.map((tool, index) => (
            <div
              key={index}
              className="relative h-32 [perspective:1000px] group"
              onClick={() => setFlippedTool(flippedTool === index ? null : index)}
            >
              <div className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ${flippedTool === index ? '[transform:rotateY(180deg)]' : ''}`}>
                {/* Front */}
                <div className="absolute inset-0 flex items-center justify-center text-5xl border border-[#C889E6] rounded-md bg-v9-secondary-black [backface-visibility:hidden]">
                  <div className="flex px-6 py-6 opacity-90 justify-center">
                    {React.createElement(tool.icon as React.ElementType)}
                  </div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 flex items-center justify-center border border-[#C573E6] border-2 rounded-md bg-v9-secondary-black [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-md shadow-[#5904A8]">
                  <div className="text-lg font-medium text-white px-4 text-center">
                    {tool.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*Projects Section*/}
      <div className="mt-20 sm:mt-32">
        <div className="flex justify-between mb-10 items-center">
          <div className="flex text-4xl sm:text-5xl font-medium">Projects</div>
          <Button onClick={() => {}}>View All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grids-row-auto auto-rows-fr gap-x-5 gap-y-5">
          {top6Projects.map((project: ProjectCardProps, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>

      {/**Contact Email Section*/}
      {/*<div className="mt-20 sm:mt-32">
        <div className="text-4xl sm:text-5xl font-medium">Contact Me</div>
        <div className="font-light text-v9-light-grey mt-4 mb-10">
          Im always open to new opportunities and connections. Feel free to
          reach out to me at{' '}
          <Anchor href="mailto:curiouscreator1@proton.me">
          curiouscreator1@proton.me
          </Anchor>
          !
        </div>
        <EmailBox />
      </div>*/}
    </div>
  );
}
