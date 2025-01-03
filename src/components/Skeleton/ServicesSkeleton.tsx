import  FormAddSkeleton  from "./FormAddSkeleton";
import  TabSkeleton  from "./TabSkeleton";
import  CardSkeleton  from "./CardSkeleton";

const ServicesSkeleton = () => {
    return (
        <div className="my-10 space-y-5 flex flex-col items-center justify-center">
        <FormAddSkeleton serv={true} />
        <div className="font-header font-bold text-center md:text-3xl text-primary">الخدمات</div>
        <div className='flex items-center justify-center gap-4 my-3'>
          {Array.from({ length: 5 }).map((_, i) => <TabSkeleton key={i} />)}
        </div>
        <div className='grid md:grid-cols-2 gap-20'>
          {Array.from({ length: 5 }).map((_, i) => <CardSkeleton noPic={false} key={i} />)}
        </div>
      </div>
    )
}

export default ServicesSkeleton
