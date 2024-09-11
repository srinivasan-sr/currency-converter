export type ListItem = {
    id: string,
    value: string,
}
export type DropdownProps = {
    list: ListItem[],
    handleSelection: (item: ListItem) => void,
    defaultSelection: ListItem,
}