import { useEffect, useState } from "react";

import { Container } from "./styles";

interface PaginationProps {
  total: number;
  transactionsPerPage: number;
  current: number;
  setCurrentPage: (pageNumber: number) => void
}

export const Pagination = ({ total, transactionsPerPage, current, setCurrentPage }: PaginationProps) => {

  const [pages, setPages] = useState<number[]>([])

  useEffect(() => {
    const pages: number[] = []
    for (let i = 1; i <= Math.ceil(total / transactionsPerPage); i++) {
      pages.push(i)
    }
    setPages(pages)
  }, [total, transactionsPerPage])


  return (
    <Container>
      {pages.map((page) => (
        <button
          key={page}
          className={current === page ? 'active' : ''}
          onClick={() => {
            setCurrentPage(page)
            setTimeout(() => {
              window.scrollTo({
                top: 700,
                behavior: "smooth"
              })
            }
              , 200)
          }
          }
        >
          {page}
        </button>
      ))}
    </Container>
  )
}
