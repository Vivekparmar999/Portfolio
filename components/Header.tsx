import Link from "next/link";

const header = ({ currentLink = "" })=>{
    return (
      <div className="sticky top-0 z-50 dark:text-slate-300 bg-v9-primary-black">
        {/**Added justify center to move below div of 1000px to center */}
        <div className="flex justify-center">
          <div className="w-full flex justify-between px-10 py-4 sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px]">
            <div className="font-semibold text-xl text-center w-40 transition ease-linear duration-1000 animateNormalWidth">
                <a className="hover:underline underline-offset-2 hover:text-white font-medium">Vivek Parmar</a>
            </div>
            <div className="flex flex-row">
              <Link href="/" className={`mx-2 w-full mb-2 sm:mb-0 sm:w-auto ${ currentLink === "" ? "text-v9-yellow" : "hover:text-white"} underline-offset-2`}>
                  Home
              </Link>
              <Link href="/resume" className={`mx-2 w-full mb-2 sm:mb-0 sm:w-auto ${ currentLink === "resume" ? "text-v9-yellow" : "hover:text-white"} underline-offset-2`}>
                Resume
              </Link>
              <Link href="https://www.linkedin.com/in/vivek-parmar-0b10b4134/" target="_blank" className={`mx-2 w-full mb-2 sm:mb-0 sm:w-auto ${ currentLink === "LinkedIn" ? "text-v9-yellow" : "hover:text-white"} underline-offset-2`}>
                LinkedIn
              </Link>
              <Link href="https://github.com/Vivekparmar999" target="_blank" className={`mx-2 w-full mb-2 sm:mb-0 sm:w-auto ${ currentLink === "Github" ? "text-v9-yellow" : "hover:text-white"} underline-offset-2`}>
                Github
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full dark:bg-gray-200 bg-black h-1">
        </div>
      </div>
    );
}
        {/**Home,Resume,Linkedin Link, Github idk */}
export default header;
