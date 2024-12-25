import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel"
import { useQuery } from "@tanstack/react-query";
import instance from "../api/instance";
import Alerting from "../components/Alert";
import { IMembers } from "../interfaces";
import Member from "../components/AboutUs/Member";
import MemberSkeleton from "../components/Skeleton/MemberSkeleton";
import FormAddSkeleton from "../components/Skeleton/FormAddSkeleton";
import FormAddMember from "../components/Form/FormsAdd/FormAddMember";


const Members = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: [`council-members`],
    queryFn: async () => {
     const { data } = await instance.get('/council-members')
      return data.data
    }
  })

  if (isLoading) return (
    <div className="flex flex-col items-center">
      <FormAddSkeleton />
        <MemberSkeleton />
    </div>
  )

  if (error) return <Alerting />

  return (
    <div className="my-5">
        <FormAddMember/>
      <div className="mb-10 mt-5 overflow-x-hidden md:overflow-visible">
        <h3 className="text-lg font-bold  text-primary my-5">أعضاء مجلس البلدية:</h3>
        <Carousel className="w-full h-[60vh]" dir="ltr">
          <CarouselContent className="-ml-1">
            {data.map((member: IMembers) => (
              <CarouselItem key={member.id} className="overflow-hidden p-0 md:p-2 md:basis-1/3">
                <Member member={member} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-transparent hidden md:inline-flex" />
          <CarouselNext className="bg-transparent hidden md:inline-flex" />
        </Carousel>
      </div>
    </div>
  )
}
export default Members

