import { Button } from '../../components/ui/button';
import { Status, IComplaints } from "@/interfaces";
interface IProps {
  tabs: { name: string; value: Status; }[];
  setActiveTab: (val: string) => void;
  activeTab: string;
  data: any;
  setFilteredComp: any;
  setStartIndex: (val: ((prev: number) => number) | number) => void
  setPage: (val: ((value: number) => number) | number) => void;
}

const Tabs = ({ setPage, setFilteredComp, data, setStartIndex, tabs, setActiveTab, activeTab }: IProps) => {

  const handlActiveTabClick = (tab: string) => {
    setStartIndex(0);
    setPage(1);
    setActiveTab(tab);
    setStartIndex(0);
    if (tab === "trash") {
      setFilteredComp(data?.trash.data.data)
      return;
    }
    setFilteredComp(data?.comp.data.data.filter((compData: IComplaints) => compData.status === tab));
  };

  return (
    <div className='flex lg:justify-center text-gray-800 items-center gap-3' style={{ scrollbarColor: "transparent transparent" }}>
      <h3 className="font-semibold text-gray-700">عرض :</h3>
      {tabs.map((tab, i) => (
        <Button key={i}
          onClick={() => handlActiveTabClick(tab.value)}
          size="lg"
          variant={activeTab === tab.value
            ? "default"
            : "link"}
          >{tab.name}</Button>
      ))}
    </div>
  )
}

export default Tabs
