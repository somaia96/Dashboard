import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { ITabs } from "@/interfaces";
interface IProps {
  addArr: never[],
  addToDelArr: (val: number) => void,
  submitEditCatHandler: () => void,
}
const DialogEditCategory = ({ addArr, addToDelArr, submitEditCatHandler }: IProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="w-1/4 border-primary text-primary hover:bg-primary" size="special">
          تعديل الفئات الحالية
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h2 className="font-semibold text-xl mb-5 text-primary text-center">اضافة فئة خدمة جديدة</h2>
        <div className='flex flex-col gap-2'>
          {addArr.map((tab: ITabs) => {
            return <div key={tab.id} className="flex items-center shadow-md p-4 rounded-lg justify-between gap-7">
              <div className=" font-medium text-lg leading-6 text-gray-700">
                {tab.name}
              </div>
              <div
                onClick={() => addToDelArr(tab.id!)}
                className="flex cursor-pointer rounded-md text-sm text-red-800 justify-end flex-1">
                حذف
              </div>
            </div>
          })}
        </div>
        <div className='flex justify-center gap-3 mt-5'>
          <button
            onClick={submitEditCatHandler}
            className="w-1/3 my-3 rounded-lg bg-primary py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            حفظ التعديلات
          </button>
          <DialogClose asChild>
            <Button type='button' variant="outline" size="special">
              الغاء
            </Button>
          </DialogClose>

        </div>
      </DialogContent>
    </Dialog>
  )
}
export default DialogEditCategory