import instance from '../../../api/instance'
import { INews } from '../../../interfaces';
import getToken from "../../../utils/gitToken";
import { useToast } from "../../../hooks/use-toast";
import TextArea from "../../TextArea";
import Input from "../../Input";
import InputFile from "../../InputFile";
import { useForm, SubmitHandler } from "react-hook-form"
import { useMutation } from '@tanstack/react-query';
import { Button } from '../../ui/button';
import Toast from '../../Toast';
import { useEffect, useState } from 'react';

export default function FormAddNews() {
    const { register, handleSubmit, reset,setValue } = useForm<INews>()
    const { toast } = useToast();
    const [fileKey, setFileKey] = useState(0);

    const { mutate,isSuccess,isError } = useMutation({
        mutationFn: (news: INews) => {
        
            return instance.post(`/news`, news, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${getToken()}`
                }
            })
        }
    });
    useEffect(() => {
        if (isSuccess) {
            Toast("تم ارسال الخبر بنجاح 👏", "default", toast, "bg-blue-100");
            reset();
            setFileKey(prev => prev + 1);
        }
        if (isError) {
            Toast("حدث خطأ أثناء ارسال الخبر ✖", "destructive", toast);
        }
    }, [isSuccess, isError, toast, reset]);

    const onSubmit: SubmitHandler<INews> = news => {
        mutate(news)
    };

    return (
        <div className='w-9/12 m-auto flex gap-3 p-5 my-10 rounded-3xl bg-white'>
            <form className='w-full rounded-xl' onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <h2 className='font-bold text-xl text-center text-primary mb-5'>اضافة خبر جديد</h2>
                    <Input register={register} label="العنوان" name="title" placeholder="عنوان الخبر" />
                    <TextArea placeholder='نص الخبر' register={register} />
                    <InputFile key={fileKey} setValue={setValue} name="photos" register={register} />
                </div>
                <div className='flex justify-center gap-3 mt-5'>
                    <Button size="special">
                        نشر
                    </Button>
                    <Button type='button' variant="outline" size="special">
                        الغاء
                    </Button>
                </div>
            </form>
        </div>
    )
}
