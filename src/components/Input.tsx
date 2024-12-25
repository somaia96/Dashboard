import { Input as Inputs } from "./ui/input"

interface IProps {
  placeholder?: string;
  name: string;
  label: string;
  register: any;
  type?: string;
  value?: string | Date;
}

const Input = ({ value, type, placeholder, name, label, register }: IProps) => {
  return (
    <div className="flex items-center justify-between">
      <label htmlFor={name} className="font-medium w-16 text-sm text-gray-600">
        {label} :
      </label>
      <div className="rounded-md w-full">
        <Inputs
          {...register(`${name}`)}
          id={name}
          name={name}
          defaultValue={value ? value : ""}
          type={type ? type : ""}
          placeholder={placeholder}
          autoComplete={name}
        />
      </div>
    </div>
  )
}

export default Input
