import { ITabs } from '@/interfaces';
import { txtSlicer } from '../utils/functions';
import { Button } from './ui/button';

interface IProps {
    setActiveTab: (val: string) => void;
    tabs: ITabs[];
    activeTab: string;
    register: any;
}

const Tabs = ({ activeTab, setActiveTab, tabs, register }: IProps) => {

    return (
        <div className="flex items-center justify-between">
            <label
                htmlFor="name" className="font-medium w-16 text-sm text-gray-600">
                الفئة :
            </label>
            <div className="flex rounded-md py-1 flex-1 gap-2" style={{ scrollbarWidth: "thin", scrollbarColor: "#cfcfcfb8 transparent" }}>
                {tabs.map((tab: ITabs) => (
                    <Button
                        key={tab.id}
                        type='button'
                        size="lg"
                        onClick={() => setActiveTab(tab.name!)}
                        variant={activeTab === tab.name ? "default" : "link"}
                    >
                        <input
                            {...register("activity_type_name")}
                            hidden
                            type="radio" id={tab.name} value={tab.name} />
                        <label htmlFor={tab.name}>{txtSlicer(tab.name, 12)}</label>
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default Tabs
