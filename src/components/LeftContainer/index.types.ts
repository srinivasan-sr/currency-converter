export type DropdownList = {
    id: string, 
    value: string,
}
export type LeftContainerProps = {
    list: DropdownList[],
    inputOnChangeHandler: (value: string) => void,
    dropdownChangeHandler: (value: DropdownList) => void,
    defaultSelection: DropdownList,
}