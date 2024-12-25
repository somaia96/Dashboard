import { useState } from "react"
import { Button } from "../ui/button"
import instance from "../../api/instance"
import { IComplaints, Status } from "../../interfaces"
import getToken from "../../utils/gitToken";
import { DialogClose } from "@radix-ui/react-dialog";

interface IPutComp {
    status: Status,
    _method: string,
}

const Details = ({ tabs, data }: { tabs: { name: string; value: Status; }[], data: IComplaints }) => {
    const [compData, setCompData] = useState<IPutComp>({
        status: data.status,
        _method: "PUT",
    })

    const [activeTab, setActiveTab] = useState(data.status)

    const handlActiveTabClick = (tab: Status) => {
        setActiveTab(tab);
        if (tab !== Status.Trash) {
            setCompData((prev: IPutComp) => {
                return {
                    ...prev,
                    status: tab
                }
            })
        }
    };
    const handleCancel = () => {
        setActiveTab(Status.Unresolved);
        setCompData((prev: IPutComp) => {
            return {
                ...prev,
                status: Status.Unresolved
            }
        })
    };

    const handleSave = async (tab: string, id: number) => {

        if (tab === Status.Trash) {
            try {
                 await instance.delete(`/complaint/${id}`, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    }
                });
                // (res.status === 200 || res.status === 201) ? toasty("success","تم الارسال لسلة المهملات") : null;

            } catch (error) {
                // toasty("error","حدث خطأ أثناء الحذف")
            }

            return;
        }

        try {
             await instance.post(`/complaint/${id}`, compData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${getToken()}`,
                }
            });
            // (res.status === 200 || res.status === 201) ? toasty("success","تم ارسال الشكوى بنجاح") : null;

        } catch (error) {
            // toasty("error","حدث خطأ أثناء ارسال الشكوى")
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-3 p-10 rounded-3xl">
            <div className="flex justify-between border-red-500 gap-1">
                <div className="flex-1 flex flex-col gap-5" >
                    <div className="flex">
                        <h3 className="w-32 font-semibold text-gray-800">الاسم :</h3>
                        <p className="text-gray-800">{data.name}</p>
                    </div>
                    <div className="flex ">
                        <h3 className="w-32 font-semibold text-gray-800">رقم الهاتف :</h3>
                        <p className="text-gray-800">{data.number}</p>
                    </div>
                    <div className="flex">
                        <h3 className="w-32 font-semibold text-gray-800">تاريخ التقديم :</h3>
                        <p className="text-gray-800">{data.created_at}</p>
                    </div>
                    <div className="flex">
                        <h3 className="w-32 font-semibold text-gray-800">نص الشكوى :</h3>
                        <p className="text-gray-800">{data.description}</p>
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="w-32 font-semibold text-gray-800">الصورة :</h3>
                    <div className="overflow-hidden w-full max-h-80">
                        {
                            data.photos?.length > 0 ?
                                <img className="w-full h-auto" src={data.photos[0]} alt="complaint" />
                                :
                                <img className="w-full h-auto" src="/images/empty.jpg" alt="empty" />
                        }
                    </div>
                </div>
            </div>
            <div>
                <h2 className="text-lg font-semibold text-gray-800">الرجاء اختيار الحالة:</h2>
                <div className='flex justify-center items-center gap-3 py-2' >
                    {tabs.map((tab, i) => (
                        <Button key={i}
                            variant={activeTab === tab.value ? "default" : "link"}
                            onClick={() => handlActiveTabClick(tab.value)}
                        >{tab.name}</Button>
                    ))}
                </div>
            </div>
            <div className='flex justify-center gap-3 mt-5 w-full px-10'>
                <DialogClose asChild>
                    <Button
                        onClick={() => handleSave(activeTab, data.id!)}
                        size="special">
                        حفظ التعديلات
                    </Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button
                        onClick={handleCancel}
                        type='button' variant="outline" size="special">
                        الغاء
                    </Button>
                </DialogClose>
            </div>
        </div>
    )
}

export default Details
