import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination"

interface IProps {
  size?: number;
  count: number;
  setPage: (val: ((value: number) => number) | number) => void;
  page: number;
  endIndex: number;
  setStartIndex: (val: ((prev: number) => number) | number) => void
}
const PaginationComponent = ({ page, setPage, size = 2, count, endIndex, setStartIndex }: IProps) => {
  const handleChangePage = (item: number) => {
    if (endIndex == (count * size)) return;
    setStartIndex((item - 1) * size);
    setPage(item)
  }
  const handleNextPage = () => {
    if (page === count) return;
    setPage((prev) => prev + 1);
    setStartIndex((prev: number) => prev + size)
  }
  const handlePrevPage = () => {
    if (page === 1) return;
    setPage((prev) => prev - 1);
    setStartIndex((prev: number) => prev - size)
  }

  return (
    <div className="flex justify-items-center justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious className="cursor-pointer" onClick={handlePrevPage} />
          </PaginationItem>
          {
            Array.from(Array(count + 1).keys()).slice(count <= 3 ? 1 : (page <= count - 2 ? page : page - 2), page + 3).map((item, i) => {
              return (
                <PaginationItem key={i}>
                  <PaginationLink isActive={page == item} className="cursor-pointer" onClick={() => handleChangePage(item)}>
                    {item}
                  </PaginationLink>
                </PaginationItem>
              )
            })
          }
          <PaginationItem className={page >= count - 3 ? "hidden" : ""}>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive={page == count} className={page > count - 3 ? "hidden" : "cursor-pointer"} onClick={() => { setPage(count); setStartIndex((count - 1) * size) }}>
              {count}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext className="cursor-pointer" onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default PaginationComponent
