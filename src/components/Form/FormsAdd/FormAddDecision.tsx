import instance from '../../../api/instance'
import { IDecisions } from '../../../interfaces';
import getToken from "../../../utils/gitToken";
import { useToast } from "../../../hooks/use-toast";
import TextArea from "../../TextArea";
import Input from "../../Input";
import InputFile from "../../InputFile";
import { useForm, SubmitHandler } from "react-hook-form"
import { useMutation } from '@tanstack/react-query';
import { Button } from '../../ui/button';
import Toast from '../../Toast';
import { useEffect } from 'react';

export default function FormAddDecision() {
    const { register, handleSubmit, reset } = useForm<IDecisions>()
    const { toast } = useToast();
    const { mutate, isSuccess, isError } = useMutation({
        mutationFn: (decision: IDecisions) => {
            return instance.post(`/decision`, decision, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${getToken()}`
                }
            })
        }
    });
    useEffect(() => {
        if (isSuccess) {
            Toast("تم ارسال قرار بنجاح 👏", "default", toast, "bg-blue-100");
            reset();
        }
        if (isError) {
            Toast("حدث خطأ أثناء ارسال القرار ✖", "destructive", toast);
        }
    }, [isSuccess, isError, toast, reset]);

    const onSubmit: SubmitHandler<IDecisions> = decision => {
        mutate(decision)
    };

    return (
        <div className='w-9/12 m-auto flex gap-3 p-5 my-10 rounded-3xl bg-white'>
            <form className='w-full rounded-xl' onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <h2 className='font-bold text-xl text-center text-primary mb-5'>اضافة قرار جديد</h2>
                    <Input register={register} label="العنوان" name="title" placeholder="عنوان القرار" />
                    <Input type="date" register={register} label="التاريخ" name="decision_date" />
                    <TextArea placeholder='نص القرار' register={register} />
                    <InputFile name="photos" register={register} />
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
