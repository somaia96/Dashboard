import { useEffect, useState } from 'react';
import instance from '../../../api/instance'
import { txtSlicer } from '../../../utils/functions';
import { Button } from '../../ui/button';
import { IServices, ITabs } from '@/interfaces';
import getToken from "../../../utils/gitToken";
import { useToast } from "../../../hooks/use-toast"
import TextArea from "../../TextArea";
import Input from "../../Input";
import { useForm, SubmitHandler } from "react-hook-form"
import { useMutation } from '@tanstack/react-query';
import Toast from '../../Toast';

export default function FormEditServ({item,tabs}:{item:IServices,tabs?: ITabs[]}) {
    const [activeTab, setActiveTab] = useState(item.service_category_id)
    const { register, handleSubmit, reset } = useForm<IServices>()
    const { toast } = useToast();
    const { mutate,isSuccess,isError} = useMutation({
        mutationFn: (services: IServices) => {
            return instance.post(`/services/${item.id}`, { ...services,service_category_id: activeTab, _method: "PUT" }, {
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
            Toast("حدث خطأ أثناء تعديل القرار ❌", "destructive", toast);
        }
    }, [isSuccess, isError, toast, reset]);

    const onSubmit: SubmitHandler<IServices> = services => {
        mutate(services)
  };

    const handleTabClick = (tab: number) => {
        setActiveTab(tab);
    }  

    return (
        <div className='flex gap-3 p-5 my-10 rounded-3xl bg-white'>
            <form className='w-full rounded-xl' onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <h2 className='font-bold text-xl text-center text-primary mb-5'>تعديل الخدمة</h2>
                    <div className="flex items-center justify-between">
                        <label htmlFor="name" className="text-sm font-medium w-16 leading-6 text-gray-900">
                            النوع
                        </label>
                        <div style={{scrollbarWidth:"thin", scrollbarColor: "#cfcfcfb8 transparent" }} className="overflow-x-scroll py-1 flex rounded-md shadow-sm flex-1 gap-2">
                            {tabs?.map((tab: ITabs) => (
                                <Button key={tab.id}
                                    type='button'
                                    onClick={() => handleTabClick(tab.id!)}
                                    className={(activeTab === tab.id
                                        ? "bg-primary text-white border-primary"
                                        : "border-gray-200 bg-white text-gray-800") + ' w-28 border-1 border focus-visible:ring-0 py-1  hover:text-white hover:bg-primary text-base'}
                                >{txtSlicer(tab.name, 12)}</Button>
                            ))}
                        </div>
                    </div>
                    <Input value={item.title} register={register} label="العنوان" name="title" placeholder="عنوان الخدمة" />
                    <TextArea value={item.description} label="النص" name="description" placeholder='نص الخدمة' register={register} />
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
