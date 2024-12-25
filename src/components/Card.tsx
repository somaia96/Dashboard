import { IDecisions, IEvents, INews, INewsApi, IServices, ITabs } from "../interfaces";
import { txtSlicer } from "../utils/functions";
import instance from "../api/instance";
import FormEditNews from "./Form/FormEdit/FormEditNews";
import FormEditServ from "./Form/FormEdit/FormEditServ";
import FormEditEvents from "./Form/FormEdit/FormEditEvent";
import FormEditDecision from "./Form/FormEdit/FormEditDecision";
import getToken from "../utils/gitToken";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import DeleteDialog from "./Dialog/DeleteDialog";
import EditDialog from "./Dialog/EditDialog";

interface IProps {
  news: INewsApi,
  noPic?: boolean,
  url: string,
  tabs?: ITabs[],
  order?: number;
}
export default function CardNews({ order = 0, noPic = true, news, url, tabs }: IProps) {

  let timestamp = news.activity_date ? new Date(news.activity_date!) : new Date(news.created_at!);
  const DeleteItem = async (id: number, url: string) => {

    try {
       await instance.delete(`${url}/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        }
      });
      // (res.status === 200 || res.status === 201) ? Toast("تم الحذف بنجاح 👏", "default", toast, "bg-blue-100") : null;

    } catch (error) {
      // toasty("error", "حدث خطأ أثناء الحذف")
      // Toast("حدث خطأ أثناء الحذف", "destructive", toast)

    }
  }
  return (
    <Card className={(order != 0 ? "max-w-full md:max-w-[49%] " : "") + "flex flex-col md:flex-nowrap w-full max-w-[100%] p-3 md:gap-5 md:flex-row my-3"}>

      {noPic && <CardHeader
        className={(order != 0 ? "hidden md:block " : "") + " relative m-0 w-full lg:w-1/4 lg:shrink-0 lg:rounded-l-none"}
        style={order != 0 ? { order: order, marginRight: "auto" } : {}}
      >
        {news.photos && news.photos.length > 0 ? (
          <img
            src={news.photos[0]}
            alt="card-image"
            className="lg:h-[224px] w-full object-cover"
          />
        ) : <img
          src={`/images/empty.jpg`}
          alt="card-image"
          className="lg:h-[224px] w-full object-cover"
        />}
      </CardHeader>}

      <CardContent className="flex w-full flex-col lg:p-0 lg:py-6 lg:my-0">
        <div className="flex justify-between items-center w-full">

          <CardTitle className="mb-4 text-xl text-primary uppercase">
            {news.title}
          </CardTitle>
          <div className='flex justify-center mx-5 gap-2 items-center'>
            {/* Modal Edit Item */}
            <EditDialog>
              {(url === "/news") ? <FormEditNews item={news as INews} />
                : (url === "/services") ? <FormEditServ item={news as IServices} tabs={tabs} />
                  : (url === "/activity") ? <FormEditEvents item={news as IEvents} tabs={tabs} />
                    : (url === "/decision") ? <FormEditDecision item={news as IDecisions} />
                      : null}
            </EditDialog>

            <DeleteDialog url={url} id={news.id} DeleteItem={DeleteItem} />
          </div>
        </div>
        {timestamp && <CardDescription className="mb-2 text-sm text-gray-600">
          {timestamp.toUTCString()}
        </CardDescription>}
        <CardDescription color="gray" className="mb-3 text-base text-gray-900">
          {txtSlicer(news.description, (news.photos ? undefined : 250))}
        </CardDescription>
        {news.photos && news.photos?.length > 0 ? <div className="flex max-w-full justify-center items-center md:justify-start w-full gap-3 mb-5 md:mb-0 -order-1 md:order-12">
          {news.photos.map((img, i) => (
            <img className="w-auto h-14" key={i} src={img} />
          ))}
        </div> : null
        }
      </CardContent>
    </Card>
  );
}