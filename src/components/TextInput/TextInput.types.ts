export type TextInputProps = {
    classes?: string,
    defaultValue: string | number,
    handleChange: (value: string) => void,
    placeholder?: string,
    readOnly?: boolean,
    props?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}