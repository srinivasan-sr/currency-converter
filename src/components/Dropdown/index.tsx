import {useState, useRef, useEffect} from 'react';
import { DropdownProps, ListItem } from './types';
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { TextInput } from '../TextInput';

export const Dropdown = ({list, handleSelection, defaultSelection}: DropdownProps) => {
    
    const divElement = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState(list || []);
    const defaultElement: ListItem = defaultSelection.id !== "" ? defaultSelection : {id: "-1", value: "Select"};
    const [selectedOption, setSelectedOption] = useState<ListItem>(defaultElement);

    const handleSelectedOption = (item: ListItem) => {
        setSelectedOption(item);
        toggleDropdownDisplay();
        handleSelection(item);
    }
    const toggleDropdownDisplay = () => {
        // console.log(`value=${isOpen}`);
        setIsOpen(!isOpen);
    };
    

    const displayList = items.map((item) => {
        return <div 
        className={`pt-2 px-1 cursor-pointer hover:border-dotted hover:bg-yellow-200 ${item.id === selectedOption.id && `font-extralight`}`}
        key={item.id}
        onClick={() => {handleSelectedOption(item)}}
        >{item.value}</div>
    });
    const handleFilterChange = (value: string) => {
        if(value !== ''){
        const filteredItems = list.filter((item) => {
            if((item.value).toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1){
                return item;
            }
        });
        setItems(filteredItems);
    } else {
        setItems(list);
    }
    }
    useEffect(() => {
        if(defaultSelection.id !== "" && defaultSelection.id !== "-1"){
            setSelectedOption(defaultSelection);
        }
    }, [defaultSelection]);
    // useEffect(() => {
    //     const handler = (event:React.FormEvent<HTMLDivElement>) => {
    //         if(!divElement.current)
    //         {
    //             return;
    //         }
    //         if(!divElement.current.contains(event.currentTarget)){
    //             setIsOpen(false);
    //         }
    //     }
    //     document.body.addEventListener('click', handler, true);
    //     return(() => {
    //         document.body.removeEventListener('click', handler);
    //     })
    // }, []);

    return (
    <div id='outer' className='border dark:inherit' ref={divElement}>
            <div className="flex flex-row align-middle w-full pt-1 cursor-pointer" onClick={() => toggleDropdownDisplay()}>
                <div className="w-10/12 text-ellipsis line-clamp-1 pl-1">{selectedOption.value}</div>
                <div className="pt-0.5">{!isOpen ? <HiChevronDown/> : <HiChevronUp />}</div>
            </div>
            {isOpen && <div id='contents' className="absolute mt-1 w-2/12 border shadow opacity-100 bg-white dark:bg-inherit">
                    <div className="border mt-2 ml-0.5 w-fit pl-1 mb-1 rounded-sm">
                            <TextInput placeholder='Filter' handleChange={handleFilterChange} defaultValue=""  />
                        </div>
                    <div className="flex flex-col h-60 overflow-y-auto">{displayList}</div>
                </div>}
        </div>
    );
    
}