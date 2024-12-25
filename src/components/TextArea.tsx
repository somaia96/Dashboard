import { Textarea } from "./ui/textarea"

interface IProps {
  register: any;
  label: string;
  placeholder: string;
  name: string;
  value?: string;

}
const TextArea = ({ value, register, label, placeholder, name }: IProps) => {
  return (
    <div className="flex items-center justify-between">
      <label htmlFor={name} className="font-medium w-16 text-sm text-gray-700">
        {label} :
      </label>
      <div className="w-full">
        <Textarea
          {...register(name, { required: true })}
          id={name}
          name={name}
          defaultValue={value ? value : ""}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

export default TextArea
