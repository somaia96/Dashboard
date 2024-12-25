import CardNews from "../components/Card";
import { useState } from "react";
import { INews, INewsApi } from "@/interfaces";
import instance from '../api/instance'
import Alerting from '../components/Alert';
import { useQuery } from '@tanstack/react-query'
import CardSkeleton from "../components/Skeleton/CardSkeleton";
import FormAddNews from "../components/Form/FormsAdd/FormAddNews";
import FormAddSkeleton from "../components/Skeleton/FormAddSkeleton";
import PaginationComponent from "../components/Paginition";

const NewsPage = () => {
  const [page, setPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const endIndex = startIndex + 2;
  const { isLoading, error, data } = useQuery({
    queryKey: [`newsData`],
    queryFn: async () => {
      const { data } = await instance.get('/news')
      return data.data
    }
  })

  const count = Math.ceil(data?.length / 2);

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center">
      <FormAddSkeleton />
      <div className="my-10 container space-y-5">
        {Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    </div>
  )

  if (error) return <Alerting />

  return (
    <div className="my-10">
        <FormAddNews />
      {data.slice(startIndex,endIndex).map((news: INews) => (
        <CardNews news={news as INewsApi} key={news.id} url="/news" />
      ))}
      <PaginationComponent page={page} setPage={setPage} endIndex={endIndex} count={count} setStartIndex={setStartIndex} />
    </div>
  );
};

export default NewsPage;
