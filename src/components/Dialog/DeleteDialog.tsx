import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "../ui/dialog";

interface IProps {
    handleDelete: any;
    DeleteItem: any;
    id: number;
    url?: string
}
const DeleteDialog = ({ handleDelete, DeleteItem, id, url }: IProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    onClick={() => handleDelete(id)}
                    type='button' variant="outline" size="lg">
                    حذف
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle className="font-semibold text-lg">هل أنت متأكد ؟</DialogTitle>
                <div className='flex justify-center gap-3 mt-5'>
                    <DialogClose asChild>
                        <Button
                            onClick={() => DeleteItem(id, url)}
                            size="special">
                            حذف
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="outline" size="special">
                            الغاء
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteDialog
