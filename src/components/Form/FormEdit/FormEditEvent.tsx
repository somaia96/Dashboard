import { useEffect, useState } from 'react';
import instance from '../../../api/instance'
import { Button } from '../../ui/button';
import { txtSlicer } from '../../../utils/functions';
import { IEvents, ITabs } from '../../../interfaces';
import getToken from "../../../utils/gitToken";
import { DialogClose } from '../../ui/dialog';
import { useToast } from "../../../hooks/use-toast";
import TextArea from "../../TextArea";
import Input from "../../Input";
import InputFile from "../../InputFile";
import { useForm, SubmitHandler } from "react-hook-form"
import { useMutation } from '@tanstack/react-query';
import Toast from '../../Toast';
import { DialogTitle } from '@radix-ui/react-dialog';

export default function FormEditEvents({ item, tabs }: { item: IEvents, tabs?: ITabs[] }) {
    const { register, handleSubmit, reset } = useForm<IEvents>()
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState(item.activity_type_name)
    const { mutate, isSuccess, isError } = useMutation({
        mutationFn: (event: IEvents) => {
            return instance.post(`/activity/${item.id}`, { ...event, activity_type_name: activeTab, activity_date: item.activity_date?.toString().split('T')[0], _method: "PUT" }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${getToken()}`,
                }
            })
        },
    });
    useEffect(() => {
        if (isSuccess) {
            Toast("تم تعديل الفعالية بنجاح 👏", "default", toast, "bg-blue-100");
            reset();
        }
        if (isError) {
            Toast("حدث خطأ أثناء تعديل الفعالية ✖", "destructive", toast);
        }
    }, [isSuccess, isError, toast, reset]);

    const onSubmit: SubmitHandler<IEvents> = event => {
        mutate(event)
    };

    return (
        <div className='flex gap-3 p-5 my-10 rounded-3xl bg-white'>
            <form className='w-full rounded-xl' onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <DialogTitle className='font-bold text-xl text-center text-primary mb-5'>تعديل الفعالية</DialogTitle>
                    <div className="flex items-center justify-between">
                        <label htmlFor="name" className="text-sm font-medium w-16 leading-6 text-gray-900">
                            النوع
                        </label>
                        <div className="flex rounded-md shadow-sm py-1 flex-1 gap-2" style={{ scrollbarWidth: "thin", scrollbarColor: "#cfcfcfb8 transparent" }}>
                            {tabs?.map((tab: ITabs) => (
                                <Button key={tab.id}
                                    type='button'
                                    onClick={() => setActiveTab(tab.name)}
                                    className={(activeTab === tab.name
                                        ? "bg-primary text-white border-primary"
                                        : "border-gray-200 bg-white text-gray-800") + ' w-28 border-1 border focus-visible:ring-0 py-1  hover:text-white hover:bg-primary text-base'}
                                >{txtSlicer(tab.name, 12)}</Button>
                            ))}
                        </div>
                    </div>
                    <Input value={item.title} register={register} label="العنوان" name="title" placeholder="عنوان الفعالية" />
                    <Input value={item.activity_date?.toString().split('T')[0]} type="date" register={register} label="التاريخ" name="activity_date" />
                    <TextArea value={item.description} placeholder='نص الفعالية' register={register} />
                    <InputFile name="photos" register={register} />
                </div>
                <div className='flex justify-center gap-3 mt-5'>
                    <DialogClose asChild>
                        <Button size="special" >
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
