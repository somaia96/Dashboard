import CardNews from "../components/Card";
import { useState } from "react";
import instance from '../api/instance'
import { Button } from '../components/ui/button';
import Alerting from '../components/Alert';
import { useQuery } from '@tanstack/react-query'
import { txtSlicer } from "../utils/functions";
import CardSkeleton from "../components/Skeleton/CardSkeleton";
import TabSkeleton from "../components/Skeleton/TabSkeleton";
import FormAddEvents from "../components/Form/FormsAdd/FormAddEvent";
import FormAddSkeleton from "../components/Skeleton/FormAddSkeleton";
import { IEvents, INewsApi, ITabs } from "../interfaces";
import PaginationComponent from "../components/Paginition";

const Events = () => {
  const [page, setPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const endIndex = startIndex + 2;
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [activeTab, setActiveTab] = useState<string>("");
  const { isLoading, error, data } = useQuery({
    queryKey: [`activityData`],
    queryFn: async () => {
      const eventRes = await instance.get('/activity')
      const tabRes = await instance.get('/activity-type');
      setFilteredEvents(eventRes.data.data)
      return { eventRes, tabRes }
    }
  })

  const tabs = data?.tabRes.data.data;

  const handlActiveTabClick = (tab: string) => {
    setPage(1);
    setStartIndex(0);
    setActiveTab(tab);
    setFilteredEvents(data?.eventRes.data.data.filter((eveData: IEvents) => eveData.activity_type_name === tab));
  };

  const count = Math.ceil(filteredEvents?.length / 2);

  if (isLoading) return (
    <div className="space-y-5 flex flex-col items-center justify-center">
      <FormAddSkeleton />
      <div className="font-header md:text-3xl font-bold text-center text-primary">الفعاليات</div>
      <div className='flex items-center justify-center gap-4 my-3'>
        {Array.from({ length: 5 }).map((_, i) => <TabSkeleton key={i} />)}
      </div>
      {Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
  )

  if (error) return <Alerting />

  return (
    <div className="my-10">
        <FormAddEvents tabs={tabs} />
      <div className="font-header md:text-3xl font-bold text-center text-primary">الفعاليات</div>
      <div className='flex lg:justify-center items-center gap-3 py-2'>
        {tabs.map((tab: ITabs) => (
          <Button key={tab.id}
            onClick={() => handlActiveTabClick(tab.name!)}
            className={(activeTab === tab.name
              ? "bg-primary text-white border-primary"
              : "border-gray-200 bg-white text-gray-800") + ' w-28 md:w-36 border-1 border focus-visible:ring-0 py-1 hover:text-white hover:bg-primary md:text-lg'}>{txtSlicer(tab.name, 12)}</Button>
        ))}
      </div>
      {filteredEvents.slice(startIndex, endIndex).map((news: IEvents) => (
        <CardNews news={news as INewsApi} key={news.id} url="/activity" tabs={tabs} />
      ))}
      <PaginationComponent page={page} setPage={setPage} endIndex={endIndex} count={count} setStartIndex={setStartIndex} />
    </div>
  );
};

export default Events;
