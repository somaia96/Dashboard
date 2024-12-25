import instance from '../../../api/instance'
import { IDecisions } from '../../../interfaces';
import { useToast } from "../../../hooks/use-toast";
import getToken from "../../../utils/gitToken";
import TextArea from "../../TextArea";
import Input from "../../Input";
import InputFile from "../../InputFile";
import { useForm, SubmitHandler } from "react-hook-form"
import { useMutation } from '@tanstack/react-query';
import Toast from '../../Toast';
import { DialogClose } from '../../ui/dialog';
import { useEffect } from 'react';

export default function FormEditDecision({ item }: { item: IDecisions }) {
    const { register, handleSubmit, reset } = useForm<IDecisions>()
    const { toast } = useToast();
    const { mutate,isSuccess,isError } = useMutation({
        mutationFn: (decision: IDecisions) => {
            return instance.post(`/decision/${item.id}`, { ...decision, decision_id: item.decision_id, decision_date: item.decision_date?.toString().split('T')[0], _method: "PUT", }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${getToken()}`
                }
            })
        }
    });
    useEffect(() => {
        if (isSuccess) {
            Toast("تم تعديل القرار👏 بنجاح 👏", "default", toast, "bg-blue-100");
            reset();
        }
        if (isError) {
            Toast("حدث خطأ أثناء تعديل القرار👏 ❌", "destructive", toast);
        }
    }, [isSuccess, isError, toast, reset]);

    const onSubmit: SubmitHandler<IDecisions> = decision => {
        mutate(decision)
    };

    return (
        <div className='flex gap-3 p-5 my-10 rounded-3xl bg-white'>
            <form className='w-full rounded-xl' onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <h2 className='font-bold text-xl text-center text-primary mb-5'>تعديل القرار</h2>
                    <Input value={item.title} register={register} label="العنوان" name="title" placeholder="عنوان القرار" />
                    <Input value={item.decision_date?.toString().split('T')[0]} type="date" register={register} label="التاريخ" name="decision_date" />
                    <TextArea value={item.description} label="النص" name="description" placeholder='نص القرار' register={register} />
                    <InputFile name="photo" register={register} />
                </div>
                <div className='flex justify-center gap-3 mt-5'>
                    <button
                        className="w-1/3 my-3 rounded-lg bg-primary py-2 font-semibold text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        تعديل
                    </button>
                    <DialogClose asChild>
                        <button
                            type='button'
                            className="w-1/3 my-3 rounded-lg border-2 border-red-800 py-2 font-semibold text-red-800 shadow-sm hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            الغاء
                        </button>
                    </DialogClose>
                </div>
            </form>
        </div>
    )
}
