import CardNews from '../components/Card';
import { useState } from "react";
import { INewsApi, IServices ,ITabs } from "@/interfaces";
import { Button } from '../components/ui/button';
import Alerting from '../components/Alert';
import instance from '../api/instance'
import { useQuery } from '@tanstack/react-query'
import { txtSlicer } from '../utils/functions';
import ServicesSkeleton from '../components/Skeleton/ServicesSkeleton';
import FormAddServ from '../components/Form/FormsAdd/FormAddServ';
import getToken from "../utils/gitToken";
import PaginationComponent from "../components/Paginition";
// import Toast from '../components/Toast';
import DialogAddCategory from "../components/Services/DialogAddCategory"
import DialogEditCategory from "../components/Services/DialogEditCategory"
// import { useToast } from "../hooks/use-toast";

 const Services = () => {
  const [page, setPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const endIndex = startIndex + 4;
  // const { toast } = useToast();
  const [addArr, setAddArr] = useState([]);
  const [delArr, setDelArr] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [filteredServices, setFilteredServices] = useState([]);
  const { isLoading, error, data } = useQuery({
    queryKey: [`serviceData`],
    queryFn: async () => {
      const serviceRes = await instance.get('/services')
      const tabRes = await instance.get('/service-categories');
      setFilteredServices(serviceRes.data.data)
      setAddArr(tabRes.data.data)
      return { serviceRes, tabRes }
    }
  })
// (status === "success") ? Toast('تم اضافة فئة جديدة بنجاح👏', "default", toast, "bg-blue-100") : (status === "error") ? Toast("حدث خطأ أثناء اضافة فئة", "destructive", toast) : null;
  
  const addToDelArr = (idDel: number) => {
    setDelArr((prev: number[]) => [idDel, ...prev])
    setAddArr((prev) => prev.filter((item: ITabs) => item.id !== idDel))
  }
  
  // const cancelEditHandler = () => {
  //   setAddArr(data?.tabRes.data.data)
  //   setDelArr([])
  // }
  
  const submitEditCatHandler = async () => {
    try {
      delArr.forEach((id) => {
        instance.delete(`/service-categories/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          }
        });
      });
      setDelArr([])
      setAddArr(data?.tabRes.data.data)
    } catch (error) {
      // Toast("حدث خطأ أثناء حذف الفئة", "destructive", toast)
    }
  }
  const tabs = data?.tabRes.data.data;

  const handlActiveTabClick = (tab: number) => {
    setStartIndex(0);
    setPage(1);
    setActiveTab(tab);
    setFilteredServices(data?.serviceRes.data.data.filter((servData: IServices) => servData.service_category_id === tab));
  };
  const count = Math.ceil(filteredServices?.length / 4);

  if (isLoading) return <ServicesSkeleton/>

  if (error) return <Alerting />
  return (
    <div className='my-5'>
        <div className='flex justify-center gap-3 mt-5'>
          <DialogAddCategory  label="اسم الفئة" name="name" placeholder='يجب ألا تتجاوز الفئة 12 حرف'/>
          <DialogEditCategory addToDelArr={addToDelArr} addArr={addArr} submitEditCatHandler={submitEditCatHandler}/>
        </div>
          <FormAddServ tabs={tabs} />
        <div className="font-header font-bold text-center md:text-3xl text-primary">الخدمات</div>
        <div className='flex lg:justify-center items-center gap-3 overflow-x-scroll py-2' style={{ scrollbarWidth: "thin", scrollbarColor: "#cfcfcfb8 transparent" }}>
          {tabs.map((tab: ITabs) => (
            <Button key={tab.id}
              onClick={() => handlActiveTabClick(tab.id!)}
              className={(activeTab === tab.id
                ? "bg-primary text-white border-primary"
                : "border-gray-200 bg-white text-gray-800") + ' w-28 md:w-36 border-1 border focus-visible:ring-0 py-1 hover:text-white hover:bg-primary md:text-lg'}>{txtSlicer(tab.name, 12)}</Button>
          ))}
        </div>
        <div className='flex gap-3 flex-col md:flex-row md:flex-wrap md:justify-between'>
          {filteredServices.slice(startIndex,endIndex).map((item: IServices) => <CardNews order={1} tabs={tabs} noPic={false} key={item.id} news={item as INewsApi} url='/services' />)}
        </div>
        <PaginationComponent page={page} setPage={setPage} size={4} endIndex={endIndex} count={count} setStartIndex={setStartIndex} />
    </div>
  )
}
export default Services