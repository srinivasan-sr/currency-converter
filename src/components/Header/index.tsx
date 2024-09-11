import { HiMiniCurrencyRupee, HiMiniSwatch } from "react-icons/hi2";
import { APP_TITLE } from "../../constants/textConstants";
export const Header = () => {
    return <div>
        <div className="
        w-full h-1/4 bg-yellow-400 bg-opacity-80 shadow
         text-black text-lg dark:inherit flex flex-row">
            <div className="flex justify-center text-center w-11/12">
            <HiMiniCurrencyRupee className="text-2xl text-center" />
            <div>{APP_TITLE}</div>
            </div>
            <div className="w-1/12 flex justify-end mr-2">
                <HiMiniSwatch className="text-2xl cursor-pointer"/>
            </div>
        </div>
            
    </div>
}