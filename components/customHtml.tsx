import { sendGTMEvent } from "@/helpers/helpers";
import { AnchorHTMLAttributes , ButtonHTMLAttributes } from "react";
import Link from "next/link";

const buttonClassName = "font-light whitespace-nowrap flex justify-center items-center bg-v9-secondary-black px-3 py-1 border-2 rounded-md border-opacity-5 transition-colors";

const Anchor = (props:AnchorHTMLAttributes<HTMLAnchorElement>)=>{

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        props.onClick?.(event);
        if (event.defaultPrevented) return;
        const targetElement = event.currentTarget;
        if (targetElement.dataset.gtm_event) {
            void sendGTMEvent(targetElement.dataset.gtm_event, {
                link_url: targetElement.href,
            }).catch((error) => console.error("Failed to track link:", error));
        }
    }

return (
    <a
        {...props}
        onClick={handleClick}
        data-cursor={true}
        target={props.target ?? "_blank"}
        rel={props.rel ?? "noopener noreferrer"}
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
        className={`${buttonClassName} ${props.disabled?"opacity-50":"hover:border-v9-pink hover:border-opacity-30"} ${props.className ? props.className : ""}`}
        />
    );
}

const ButtonLink = (props: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <Link
        {...props}
        data-cursor={true}
        className={`${buttonClassName} hover:border-v9-pink hover:border-opacity-30 ${props.className ?? ""}`}
    />
);

export { Anchor , Hr , Button, ButtonLink }