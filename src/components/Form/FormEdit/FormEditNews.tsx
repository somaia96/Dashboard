import instance from '../../../api/instance'
import { INews } from '../../../interfaces';
import getToken from "../../../utils/gitToken";
import { DialogClose } from '../../ui/dialog';
import { useToast } from "../../../hooks/use-toast";
import TextArea from "../../TextArea";
import Input from "../../Input";
import InputFile from "../../InputFile";
import { useForm, SubmitHandler } from "react-hook-form"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from '../../Toast';
import { DialogTitle } from "../../ui/dialog";
import { useEffect } from 'react';
import { Button } from '../../ui/button';
export default function FormEditNews({ item }: { item: INews }) {
        const queryClient = useQueryClient();

    const { register, handleSubmit, reset, setValue } = useForm<INews>({
        defaultValues: item
    })
    const { toast } = useToast();
    const { mutate, isSuccess, isError } = useMutation({
        mutationFn: (news: INews) => {

            return instance.post(`/news/${item.id}`, { ...news,photos:news.photo, _method: "PUT" }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${getToken()}`
                }
            })
        },
         onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['newsData'] });
        }
    });
    useEffect(() => {
        if (isSuccess) {
            Toast("تم تعديل الخبر بنجاح 👏", "default", toast, "bg-blue-100");
            reset();
        }
        if (isError) {
            Toast("حدث خطأ أثناء تعديل الخبر ✖", "destructive", toast);
        }
    }, [isSuccess, isError, toast, reset]);

    const onSubmit: SubmitHandler<INews> = news => {
        mutate(news)
    };

    return (
        <div className='flex gap-3 p-5 my-10 rounded-3xl bg-white'>
            <form className='w-full rounded-xl' onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <DialogTitle className='font-bold text-xl text-center text-primary mb-5'>تعديل الخبر</DialogTitle>
                    <Input  register={register} label="العنوان" name="title" placeholder="عنوان الخبر" />
                    <TextArea  placeholder='نص الخبر' register={register} />
                    <InputFile setValue={setValue} name="photo" register={register} />
                </div>
                <div className='flex justify-center gap-3 mt-5'>
                    <DialogClose asChild>
                        <Button size="special" type='submit' >
                            تعديل
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="outline" type='button' size="special" >
                            الغاء
                        </Button>
                    </DialogClose>
                </div>
            </form>
        </div>
    )
}
