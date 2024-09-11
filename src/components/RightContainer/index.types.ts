type DropdownList = {
    id: string,
    value: string,
}
export type RightContainerProps = {
    list: DropdownList[],
    baseCurrencyAmount: string,
    dropdownChangeHandler: (item: DropdownList) => void,
    defaultSelection: DropdownList,
}