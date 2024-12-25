import CardNews from "../components/Card";
import { useState } from "react";
import instance from '../api/instance'
import Alerting from '../components/Alert';
import { useQuery } from '@tanstack/react-query'
import CardSkeleton from "../components/Skeleton/CardSkeleton";
import FormAddDecision from "../components/Form/FormsAdd/FormAddDecision";
import FormAddSkeleton from "../components/Skeleton/FormAddSkeleton";
import { IDecisions, INewsApi } from "../interfaces";
import PaginationComponent from "../components/Paginition";

const Decisions = () => {
  const [page, setPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const endIndex = startIndex + 2;
  const { isLoading, error, data } = useQuery({
    queryKey: [`decisionData`],
    queryFn: async () => {
      const { data } = await instance.get('/decision')
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
        <FormAddDecision />
      {data.slice(startIndex, endIndex).map((news: IDecisions) => (
        <CardNews news={news as INewsApi} key={news.id} url={"/decision"} />
      ))}
      <PaginationComponent page={page} setPage={setPage} endIndex={endIndex} count={count} setStartIndex={setStartIndex} />
    </div>
  );
};

export default Decisions;
