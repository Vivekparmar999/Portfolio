import { sendGTMEvent } from "@/helpers/helpers";
import { AnchorHTMLAttributes , ButtonHTMLAttributes } from "react";

const Anchor = (props:AnchorHTMLAttributes<HTMLAnchorElement>)=>{

    const handleClick = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();

        var targetElement = event.currentTarget as HTMLAnchorElement 
        if(targetElement.dataset.gtm_event){
            await sendGTMEvent(targetElement.dataset.gtm_event);
        }
        
        const href = props.href as string;

        if(href)
        {
            window.open(href,'_blank');
        }   
    }

return (
    <a
        onClick={handleClick}
        {...props}
        data-cursor={true}
        target="_blank"
        className={`text-v9-pink whitespace-nowrap underline underline-offset-2 hover:text-v9-yellow p-1 hover:no-underline${props.className ? props.className: ""}`}
    ></a>
);
}

const Hr = ({width='100%'}) => {
return ( 
    <div className="flex justify-center">
        <div style={{height:"1px",width}} className="my-6 bg-gray-600 w-full"></div>
    </div>
);
}

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>)=>{
    return(
        <button
        {...props}
        data-cursor={true}
        className={`font-light whitespace-nowrap flex justify-center items-center bg-v9-secondary-black px-3 py-1 border-2 rounded-md border-opacity-5 transition-colors ${props.disabled?"opacity-50":"hover:border-v9-pink hover:border-opacity-30"} ${props.className ? props.className : ""}`}
        />
    );
}

export { Anchor , Hr , Button }