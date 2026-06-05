import { Toaster } from "../components/ui/toaster";
import instance from "../api/instance";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import Toast from '../components/Toast';
import Input from "../components/Input";
import { useForm, SubmitHandler } from "react-hook-form"
import { useMutation } from "@tanstack/react-query";
import { Button } from "../components/ui/button";

interface IUser {
    email: string;
    password: string;
}

const Login = () => {
    const { register, handleSubmit, reset } = useForm<IUser>()
    let navigate = useNavigate();
    const { toast } = useToast();
    const storeToken = (token: string) => {
        localStorage.setItem('tokenMunicipality', token);
    };

    const { mutate, isSuccess, isError, data,error } = useMutation({
        mutationFn: (user: IUser) => {
            return instance.post('/admin/login', user);
        }
    });
    useEffect(() => {
        if (isSuccess) {
            storeToken(data.data.token);
            setTimeout(() => {
                navigate("/")
            }, 2000);
            Toast("تم تسجيل الدخول بنجاح 👏", "default", toast, "bg-blue-100");
            reset();
        }
        if (isError) {
            console.log(error);
            
            Toast("تأكد من صحة المعلومات ✖", "destructive", toast);
        }
    }, [isSuccess, isError, toast, reset]);

    const onSubmit: SubmitHandler<IUser> = user => {
        mutate(user)
    };

    return (
        <div className="h-screen flex container items-center justify-center">
            <div className="flex rounded-lg overflow-hidden w-3/4">
                <Toaster />
                <form className='w-2/5 bg-white p-10 space-y-5 rounded-xl' onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='font-bold text-xl text-center text-primary mb-5'>مرحبا بكم في لوحة تحكم بلدية ضاحية</h2>
                    <Input styleLabel={{ width: "auto" }} style={{ gap: "8px", flexDirection: "column", alignItems: "start" }} register={register} label="الحساب الالكتروني" name="email" placeholder="الحساب الالكتروني" type="email" />
                    <Input styleLabel={{ width: "auto" }} style={{ gap: "8px", flexDirection: "column", alignItems: "start" }} register={register} label="كلمة السر" name="password" placeholder="كلمة السر" type="password" />
                    <Button className="w-full">
                        تسجيل الدخول
                    </Button>
                </form>
                <div className="flex-1">
                    <img className="h-full w-auto" src="/images/headerBG.jpg" alt="background" />
                </div>
            </div>
        </div>
    )
}

export default Login
