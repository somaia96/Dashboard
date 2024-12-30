import { Input as Inputs } from "./ui/input"

interface IProps {
  placeholder?: string;
  name: string;
  label: string;
  register: any;
  type?: string;
  value?: string | Date;
  style?:{};
  styleLabel?:{};
}

const Input = ({ value, type, placeholder, name,styleLabel, label,style, register }: IProps) => {
  return (
    <div className="flex items-center justify-between" style={style} >
      <label style={styleLabel} htmlFor={name} className="font-medium w-16 text-sm text-gray-600">
        {label} :
      </label>
      <div className="rounded-md w-full">
        <Inputs
          {...register(name)}
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
