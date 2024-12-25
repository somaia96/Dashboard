import { INavLink,Status } from "../interfaces";

export const navLink:INavLink[] = [
    {
        id:1,
        link:"/",
        text:"الرئيسية"
    },
    {
        id:2,
        link:"news",
        text:"الأخبار"
    },
    {
        id:3,
        link:"decisions",
        text:"القرارات"
    },
    {
        id:4,
        link:"events",
        text:"الفعاليات"
    },
    {
        id:5,
        link:"services",
        text:"الخدمات"
    },
    {
        id:6,
        link:"about",
        text:"الأعضاء"
    },
    {
        id:7,
        link:"complaints",
        text:"الشكاوي والتواصل"
    }

]

export const tabs = [{ name: "غير معالجة", value: Status.Unresolved },
    { name: "قيد المعالجة", value: Status.InProgress },
    { name: "تمت المعالجة", value: Status.Resolved },
    { name: "سلة المحذوفات", value: Status.Trash },
    ]

export const TABLE_HEAD = ["الاسم", "رقم الهاتف", "التاريخ", "التفاصيل"];