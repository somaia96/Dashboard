import { Textarea } from "./ui/textarea"

interface IProps {
  register: any;
  label?: string;
  placeholder: string;
  value?: string;

}
const TextArea = ({ value, register, label="النص", placeholder }: IProps) => {
  return (
    <div className="flex items-center justify-between">
      <label htmlFor="description" className="font-medium w-16 text-sm text-gray-700">
        {label} :
      </label>
      <div className="w-full">
        <Textarea
          {...register("description", { required: true })}
          id="description"
          name="description"
          defaultValue={value ? value : ""}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

export default TextArea
