import instance from '../../../api/instance'
import { IMembers } from '@/interfaces';
import getToken from "../../../utils/gitToken";
import { useToast } from "../../../hooks/use-toast";
import TextArea from "../../TextArea";
import Input from "../../Input";
import InputFile from "../../InputFile";
import { useForm, SubmitHandler } from "react-hook-form"
import { useMutation } from '@tanstack/react-query';
import Toast from '../../Toast';
import { DialogClose } from "../../ui/dialog";
import { useEffect } from 'react';
import { Button } from '../../ui/button';
import { DialogTitle } from '@radix-ui/react-dialog';
export default function FormEditMember({ member }: { member: IMembers }) {
    const { register, handleSubmit, reset } = useForm<IMembers>()
    const { toast } = useToast();
    const { mutate, isSuccess, isError } = useMutation({
        mutationFn: (member: IMembers) => {
            return instance.post(`/council-members/${member.id}`, { ...member, _method: "PUT", }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${getToken()}`
                }
            })
        }
    });
    useEffect(() => {
        if (isSuccess) {
            Toast("تم تعديل معلومات العضو بنجاح 👏", "default", toast, "bg-blue-100");
            reset();
        }
        if (isError) {
            Toast("حدث خطأ أثناء تعديل معلومات العضو ✖", "destructive", toast);
        }
    }, [isSuccess, isError, toast, reset]);

    const onSubmit: SubmitHandler<IMembers> = member => {
        mutate(member)
    };

    return (
        <div className='flex gap-3 p-5  rounded-3xl bg-white'>
            <form className='w-full rounded-xl' onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <DialogTitle className='font-bold text-xl text-center text-primary mb-5'>تعديل العضو</DialogTitle>
                    <Input value={member.name} register={register} label="الاسم" name="name" placeholder="اسم العضو" />
                    <Input value={member["job_title"]} register={register} label="المنصب" name="job_title" placeholder="المنصب" />
                    <TextArea value={member.description} label="نبذة" placeholder='نبذة عن العضو' register={register} />
                    <InputFile name="photo" register={register} />
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
