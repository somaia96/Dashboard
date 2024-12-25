import { IServices } from "@/interfaces";
import Input from "../Input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import Toast from '../Toast';
import { useToast } from "../../hooks/use-toast";
import { useMutation } from '@tanstack/react-query';
import { useForm } from "react-hook-form";
import instance from "../../api/instance";
import getToken from "../../utils/gitToken";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

interface IProps {
  label: string,
  name: string,
  placeholder: string,
}
const DialogAddCategory = ({ label, name, placeholder }: IProps) => {
  const { register, handleSubmit, reset } = useForm<IServices>();
  const { toast } = useToast();
  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: (service: string) => {
      return instance.post(`/service-categories`, service, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`
        }
      })
    }
  });
  useEffect(() => {
    if (isSuccess) {
      Toast("تم اضافة فئة بنجاح 👏", "default", toast, "bg-blue-100");
      reset();
    }
    if (isError) {
      Toast("حدث خطأ أثناء اضافة فئة", "destructive", toast);
    }
  }, [isSuccess, isError, toast, reset]);

  const onSubmit: any = (service: string) => {
    mutate(service)
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-1/4" size="special">
          اضافة فئة جديدة
          <PlusIcon className="ms-2" width={20} height={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h2 className="font-semibold text-primary text-xl mb-5 text-center">اضافة فئة خدمة جديدة</h2>
        <Input register={register} label={label} name={name} placeholder={placeholder} />
        <div className='flex justify-center gap-3 mt-5'>
          <Button
            onClick={handleSubmit(onSubmit)}
            size="special">
            نشر
          </Button>
          <DialogClose asChild>
            <Button type='button' variant="outline" size="special">
              الغاء
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default DialogAddCategory