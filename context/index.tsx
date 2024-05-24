import { createContext, useState } from 'react';
import { ProjectCardProps } from "../components/ProjectCard";
import projectsData from "../data/projects.json";

export const projectListContext = createContext<{
    projectList: ProjectCardProps[];
    setProjectList:(projectList: ProjectCardProps[]) => void;
}>({
    projectList:[],
    setProjectList:() => {}
});

export default function context({children}:{children: React.ReactNode}) {
    const [projectList, setProjectList] = useState<ProjectCardProps[]>(projectsData);
    return (
        <projectListContext.Provider value={{ projectList, setProjectList }}>
            {children}
        </projectListContext.Provider>
    );
}
