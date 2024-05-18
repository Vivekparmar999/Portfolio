import { Button } from "./customHtml";

export default function EmailBox(){

    return(
        <div className="grid grid-cols-1 gap-y-2">
            <input
            type="text"
            data-cursor-focusable="true"
            className="border border-v9-light-grey border-opacity-50 bg-v9-primary-black p-4 rounded flex-1 focus:border-v9-yellow active:border-v9-yellow outline-none"
            placeholder="xyz@v9.com"
            />
            <textarea
            data-cursor-focusable="true"
            className="border border-v9-light-grey custom-scroll-bar-x border-opacity-50 bg-v9-primary-black p-4 rounded flex-1 focus:border-v9-yellow active:border-v9-yellow outline-none"
            rows={5}
            placeholder="Hey Vivek, This is an awesome website!"
            ></textarea>
            <Button>Send me Email !</Button>
        </div>
    );

};