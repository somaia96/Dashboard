import { TABLE_HEAD } from "../../data"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"
import { IComplaints, Status } from "../../interfaces";
import instance from "../../api/instance";
import getToken from "../../utils/gitToken";
import Details from "./Details";
import { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";


interface IProps {
    endIndex: number;
    startIndex: number;
    filteredComp: IComplaints[];
    activeTab: string;
    tabs: { name: string; value: Status; }[];
}
const TableCom = ({ endIndex, tabs, activeTab, filteredComp, startIndex }: IProps) => {
    const [detail, setDetail] = useState<IComplaints>({
        id: 0,
        name: "",
        number: "",
        description: "",
        status: Status.Resolved,
        created_at: "",
        photos: []
    })
    const queryClient = useQueryClient();
console.log(filteredComp);

    const forceDeleteHandler = async (id: number) => {
        try {
            await instance.delete(`/complaints/${id}/force`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
            queryClient.invalidateQueries({ queryKey: ['complaint'] });


        } catch (error) {
            console.log(error);

        }
    };

    // Axios post syntax: (url, data, config). 
    // We must pass an empty body {} so the headers remain in the 3rd argument.
    // Removing it will misplace the headers and trigger a "401 Unauthorized" error.
    const restoreHandler = async (id: number) => {
        try {
            await instance.post(`/complaints/${id}/restore`, {}, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`
                }
            })
            queryClient.invalidateQueries({ queryKey: ['complaint'] });

        } catch (error) {
            console.log(error);

        }
    };
    const clickHandler = ({ id, name, number, description, status, created_at, photos }: IComplaints) => {
        setDetail({ id, name, number, description, status, created_at, photos })
    }
    return (
        <Table className="h-full w-full my-7 min-w-max table-auto text-center rounded-3xl">
            {/* Modal Edit Item */}
            {/* <Dialog>
                    <DialogContent>
                        <Details tabs={tabs} data={detail} />
                    </DialogContent>
            </Dialog> */}
            <TableHeader>
                <TableRow>
                    {TABLE_HEAD.map((head, i) => <TableHead key={i}>{head}</TableHead>)}
                </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
                {filteredComp.slice(startIndex, endIndex).map(({ id, name, number, description, status, created_at, photos }: IComplaints) => {
                    return (
                        <TableRow className="even:bg-blue-gray-50/50" key={id}>
                            <TableCell>
                                <p className="text-blue-gray">{name ? name : "غير مسجل"}</p>
                            </TableCell>
                            <TableCell>
                                <p className="leading-2 text-blue-gray" >{number ? number : "غير مسجل"}</p>
                            </TableCell>
                            <TableCell>
                                <p className="text-blue-gray">{created_at.toString().split('T')[0]}</p>
                            </TableCell>
                            <TableCell className={"flex justify-between items-center px-5"}>
                                <p className="text-blue-gray text-base">{photos.length > 0 ? "شكوى + صورة" : "شكوى"} </p>
                                {activeTab !== Status.Trash ?
                                    <Dialog>
                                        <DialogTrigger>
                                            <a href="#"
                                                onClick={() => clickHandler({ id, name, number, description, status, created_at, photos })}
                                                className="text-blue-gray-900 text-sm font-semibold me-5 hover:text-primary" >
                                                عرض المزيد
                                            </a>
                                        </DialogTrigger>
                                        <DialogContent className="w-full">
                                            <Details tabs={tabs} data={detail} />
                                        </DialogContent>
                                    </Dialog>
                                    : <div className="flex gap-2 items-center">
                                        <span
                                            onClick={() => restoreHandler(id!)}
                                            className="cursor-pointer hover:border-b-2 border-gray-600 font-semibold text-sm">استعادة</span>
                                        <span
                                            onClick={() => forceDeleteHandler(id!)}
                                            className="cursor-pointer hover:border-b-2 border-red-500 font-semibold text-red-500 text-sm">حذف نهائي</span>
                                    </div>}
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}

export default TableCom
