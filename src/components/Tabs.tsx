import { ITabs } from '@/interfaces';
import { txtSlicer } from '../utils/functions';
import { Button } from './ui/button';
import { Dispatch, SetStateAction } from 'react';

interface IProps {
    setActiveTab: Dispatch<SetStateAction<any>>;
    tabs: ITabs[];
    activeTab: string | number;
    register: any;
    type: "name" | "id";
    name: string;
}

const Tabs = ({ activeTab, setActiveTab, name, type, tabs, register }: IProps) => {

    return (
        <div className="flex items-center">
            <label
                htmlFor="name" className="font-medium w-16 text-sm text-gray-600">
                الفئة :
            </label>
            <div className="flex gap-2" style={{ scrollbarWidth: "thin", scrollbarColor: "#cfcfcfb8 transparent" }}>
                {tabs.map((tab: ITabs) => (
                    <Button
                        key={tab.id}
                        type='button'
                        size="lg"
                        onClick={() => setActiveTab(tab[type]!)}
                        variant={activeTab === tab[type] ? "default" : "link"}
                    >
                        <input
                            {...register(name)}
                            name={name}
                            hidden
                            type="radio" id={tab.name} value={tab[type]} />
                        <label htmlFor={tab.name}>{txtSlicer(tab.name, 12)}</label>
                    </Button>
                )
                )}
            </div>
        </div>
    )
}

export default Tabs
