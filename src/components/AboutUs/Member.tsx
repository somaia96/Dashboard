import { IMembers } from "../../interfaces";
import instance from "../../api/instance";
import FormEditMember from "../Form/FormEdit/FormEditMember";
import { txtSlicer } from "../../utils/functions";
// import toasty from "../../utils/toast";
import getToken from "../../utils/gitToken";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "../ui/card";
import DeleteDialog from "../Dialog/DeleteDialog";
import EditDialog from "../Dialog/EditDialog";

function Member({ member }: { member: IMembers }) {



  const DeleteItem = async (id: number) => {
    try {
       await instance.delete(`/council-members/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        }
      });
      // (res.status === 200 || res.status === 201) ? toasty("success","تم الحذف بنجاح") : null;

    } catch (error) {
      console.error('Error fetching news:', error);
      // toasty("error","حدث خطأ أثناء الحذف")
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  
  return (
    <Card className="mb-5">
      <CardHeader className="overflow-hidden h-50">
        {member.photo ? <img src={typeof (member.photo) == "string" ? member.photo : ""}
        // {/* {member.photo ? <img src="images/logo.png" */}
          alt="card-image"
          className="w-full object-cover" /> : <img
          src={`/images/empty.jpg`}
          alt="card-image"
          className="w-full object-cover"
        />}
      </CardHeader>
      <CardContent className="h-50 flex flex-col items-center space-y-3">
        <CardTitle className="text-primary text-xl">
          {member.name}
        </CardTitle>
        <CardDescription className="text-gray-800">
          {member.job_title}
        </CardDescription>
        <CardDescription className="h-20 text-gray-700 text-center">
          {txtSlicer(member.description, 150)}
        </CardDescription>
      </CardContent>
      <CardFooter className="justify-center">
        <div className='flex justify-center gap-2 items-end h-auto'>
          {/* Modal Edit Item */}
          <EditDialog>
            <FormEditMember member={member} />
          </EditDialog>
          <DeleteDialog id={member.id!} DeleteItem={DeleteItem} />
        </div>
      </CardFooter>
    </Card >
  );
}

export default Member;
