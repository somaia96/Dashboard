import React, { useEffect, useState } from 'react';
import instance from '../../../api/instance'
import { Button } from '../../ui/button';
import { IEvents, ITabs } from '../../../interfaces';
import getToken from "../../../utils/gitToken";
import { useToast } from "../../../hooks/use-toast"
import TextArea from "../../TextArea";
import Input from "../../Input";
import InputFile from "../../InputFile";
import { useForm, SubmitHandler } from "react-hook-form"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Tabs from '../../Tabs';
import Toast from '../../Toast';
import { getTodayDateString } from '../../../utils/functions';

export default function FormAddEvents({ tabs }: { tabs: ITabs[] }) {
    
    const [activeTab, setActiveTab] = useState("")
        const queryClient = useQueryClient();

    const { register, handleSubmit, reset, setValue } = useForm<IEvents>()
    const { toast } = useToast();
    const { mutate, isSuccess, isError } = useMutation({
        mutationFn: (event: IEvents) => {
            return instance.post(`/activity`, event, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${getToken()}`,
                }
            })
        },
         onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['activityData'] });
        }
    });
    useEffect(() => {
        if (isSuccess) {
            Toast("تم ارسال الفعالية بنجاح 👏", "default", toast, "bg-blue-100");
            reset();
        }
        if (isError) {
            Toast("حدث خطأ أثناء ارسال الفعالية ✖", "destructive", toast);
        }
    }, [isSuccess, isError, toast, reset]);

    const onSubmit: SubmitHandler<IEvents> = event => {
        mutate(event)
    };

    return (
        <div className='w-9/12 m-auto flex gap-3 p-5 my-10 rounded-3xl bg-white'>
            <form className='w-full rounded-xl' onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <h2 className='font-bold text-xl text-center text-primary mb-5'>اضافة فعالية جديدة</h2>
                    <Tabs name="activity_type_name" type='name' register={register} activeTab={activeTab} tabs={tabs} setActiveTab={setActiveTab} />
                    <Input register={register} label="العنوان" name="title" placeholder="عنوان الفعالية" />
                    <Input value={getTodayDateString()} type="date" register={register} label="التاريخ" name="activity_date" />
                    <TextArea placeholder='نص الفعالية' register={register} />
                    <InputFile setValue={setValue} name="photos" register={register} />
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
