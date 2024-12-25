import { ReactNode } from "react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "../ui/dialog";

interface IProps {
    children: ReactNode;
}

const EditDialog = ({ children }: IProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="lg">
                    تعديل
                </Button>
            </DialogTrigger>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>

    )
}

export default EditDialog
