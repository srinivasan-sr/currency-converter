type ListItemProps = {
    id: string,
    value: string,
};

export type DropdownProps = {
    list: ListItemProps[],
    dropdownInnerClasses?: string,
    dropdownSelectedClasses?: string,
    hoverOnItemClasses?: string,
}