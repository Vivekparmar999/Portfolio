import Link from "next/link";
import { useState } from "react";

const header = ({ currentLink = "" })=>{

  const [isHmMenuBtnClicked, setIsHmMenuBtnClicked] = useState(false);
    return (
      <div className="sticky top-0 z-50 dark:text-slate-300 bg-v9-primary-black">
        {/**Added justify center to move below div of 1000px to center */}
        <div className="flex justify-center">
          <div className="w-full flex justify-between px-10 py-4 sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px]">
            <div className="font-semibold text-xl text-center w-40 transition ease-linear duration-1000 animateNormalWidth">
              <a className="hover:underline underline-offset-2 hover:text-white font-medium">
                Vivek Parmar
              </a>
            </div>

          <div className="w-8 sm:hidden"
          onClick={()=>{
            setIsHmMenuBtnClicked(!isHmMenuBtnClicked);
          }}
          >
            <svg
              className="w-full cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 10 10"
              stroke="#eee"
              strokeWidth=".6"
              fill="rgba(0,0,0,0)"
              strokeLinecap="round"
            >
              <path d="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7">
                <animate
                  dur="0.2s"
                  attributeName="d"
                  values="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7;M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7"
                  fill="freeze"
                  begin="start.begin"
                />
                <animate
                  dur="0.2s"
                  attributeName="d"
                  values="M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7;M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7"
                  fill="freeze"
                  begin="reverse.begin"
                />
              </path>
              <rect width="10" height="10" stroke="none">
                <animate
                  dur="2s"
                  id="reverse"
                  attributeName="width"
                  begin="click"
                />
              </rect>
              <rect width="10" height="10" stroke="none">
                <animate
                  dur="0.001s"
                  id="start"
                  attributeName="width"
                  values="10;0"
                  fill="freeze"
                  begin="click"
                />
                <animate
                  dur="0.001s"
                  attributeName="width"
                  values="0;10"
                  fill="freeze"
                  begin="reverse.begin"
                />
              </rect>
            </svg>
          </div>

            <div className={`${isHmMenuBtnClicked? "flex":"hidden"} sm:flex absolute text-right right-0 top-full bg-v9-secondary-black border border-v9-light-grey border-opacity-40  rounded p-2 sm:p-0 sm:border-none sm:bg-transparent sm:top-0 sm:right mr-10 sm:m-0 flex-col sm:relative sm:flex-row items-center transition-none `}>
              <Link
                href="/"
                className={`mx-2 w-full mb-2 sm:mb-0 sm:w-auto ${currentLink === '' ? 'text-v9-yellow' : 'hover:text-white'} underline-offset-2`}
              >
                Home
              </Link>
              <Link
                href="/resume"
                className={`mx-2 w-full mb-2 sm:mb-0 sm:w-auto ${currentLink === 'resume' ? 'text-v9-yellow' : 'hover:text-white'} underline-offset-2`}
              >
                Resume
              </Link>
              <Link
                href="https://www.linkedin.com/in/vivek-parmar-0b10b4134/"
                target="_blank"
                className={`mx-2 w-full mb-2 sm:mb-0 sm:w-auto ${currentLink === 'LinkedIn' ? 'text-v9-yellow' : 'hover:text-white'} underline-offset-2`}
              >
                LinkedIn
              </Link>
              <Link
                href="https://github.com/Vivekparmar999"
                target="_blank"
                className={`mx-2 w-full mb-2 sm:mb-0 sm:w-auto ${currentLink === 'Github' ? 'text-v9-yellow' : 'hover:text-white'} underline-offset-2`}
              >
                Github
              </Link>
            </div>
          </div>

        </div>
        <div className="w-full dark:bg-gray-200 bg-black h-1"></div>
      </div>
    );
}
        {/**Home,Resume,Linkedin Link, Github idk */}
export default header;
