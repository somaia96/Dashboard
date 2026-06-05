import { tabs } from "../data"
import Alerting from "../components/Alert";
import instance from "../api/instance";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ComplaintSkeleton from "../components/Skeleton/ComplaintSkeleton";
import getToken from "../utils/gitToken";
import PaginationComponent from "../components/Paginition";
import TableCom from "../components/Complaint/TableCom";
import Tabs from "../components/Complaint/Tabs";

export default function Complaints() {
    const [page, setPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const endIndex = startIndex + 9;
    const [activeTab, setActiveTab] = useState("")
    const [filteredComp, setFilteredComp] = useState([]);

    const { isLoading, error, data } = useQuery({
        queryKey: [`complaint`],
        queryFn: async () => {
            const comp = await instance.get('/complaint', {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
            const trash = await instance.get('/complaints/trashed', {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
            setFilteredComp(comp.data.data)
            return { comp, trash }
        }
    })

    const count = Math.ceil(filteredComp?.length / 9);

    if (isLoading) return <ComplaintSkeleton />
    if (error) return <Alerting />

    return (
        <div>
            <h2 className="font-semibold text-xl mb-2 text-gray-800">صندوق الشكاوي الواردة :</h2>
            <Tabs data={data} setFilteredComp={setFilteredComp} tabs={tabs} setStartIndex={setStartIndex} setPage={setPage} activeTab={activeTab} setActiveTab={setActiveTab} />
            <TableCom tabs={tabs} activeTab={activeTab} startIndex={startIndex} filteredComp={filteredComp} endIndex={endIndex} />
            <PaginationComponent page={page} setPage={setPage} size={9} endIndex={endIndex} count={count} setStartIndex={setStartIndex} />
        </div>
    );
}