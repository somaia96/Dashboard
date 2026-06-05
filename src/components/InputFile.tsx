import { ChangeEvent, useRef, useState } from 'react'
import { Input as Inputs } from "./ui/input"
import { ImageIcon } from '@radix-ui/react-icons'

const InputFile = ({ register, name,single ,setValue }: {single?:boolean, register: any, name: string,setValue:any }) => {

const [reader, setReader] = useState("")
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const singleFile = files[0];
            
            const blobUrl = URL.createObjectURL(singleFile); 
            setReader(blobUrl);
            
        setValue(name,single ? singleFile:Array.from(files), { shouldValidate: true });
        }
    };

    const handleRemoveImage = () => {
        setReader("");
        setValue(name, null, { shouldValidate: true });
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const { ref: registerRef, ...registerProps } = register(name);
    return (
        <div className="flex items-center justify-between">
            <label htmlFor={name} className="font-medium w-16 text-sm text-gray-600">
                الصور المرفقة :
            </label>
            <div className="w-full border flex justify-center rounded-lg px-6 py-5">
                {reader ? <div className='relative h-44'>
                    <img className='w-auto h-full' src={reader} alt='upload' /><span
                        onClick={handleRemoveImage}
                        className='text-red-900 cursor-pointer font-semibold text-xl absolute right-2 top-0'>x</span>
                </div> :
                    <div className="text-center">
                        <div className="items-center justify-center flex text-xs leading-6 text-gray-600">
                            <label
                                htmlFor={name}
                                className="relative cursor-pointer rounded-md font-semibold"
                            >
                                <ImageIcon width={50} height={50} className="mx-auto text-gray-300" />
                                <span className='text-gray-500'>اضغط لإضافة صور أو اسحب الصور وافلت هنا</span>
                                <Inputs
                                    {...registerProps}
                                   onChange={(e) => {
                                        registerProps.onChange(e);
                                        handleFileChange(e);
                                    }}
                                    ref={(e) => {
                                        registerRef(e);           
                                        fileInputRef.current = e;  
                                    }}
                                    id={name}
                                    name={name}
                                    accept="image/*"
                                    type="file"
                                    className="sr-only"
                                    multiple={!single}
                                />
                                <p className="text-xs font-semibold leading-6 text-gray-500">يجب ألا يتجاوز حجم الصورة 2 ميغابايت وعدد الصور 1</p>
                            </label>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default InputFile
