import { useEffect, useState } from 'react'

const usePagination = (amountPages: number, pageActive: number) => {
  const [paginationButtons, setPaginationButtons] = useState<
    (number | string)[]
  >([])

  useEffect(() => {
    const generatePagination = () => {
      const pages: (number | string)[] = []
      if (amountPages <= 5) {
        for (let i = 1; i <= amountPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        if (pageActive > 3) pages.push('...')
        if (pageActive > 2) pages.push(pageActive - 1)
        if (pageActive !== 1 && pageActive !== amountPages) {
          pages.push(pageActive)
        }
        if (pageActive < amountPages - 1) pages.push(pageActive + 1)
        if (pageActive < amountPages - 2) pages.push('...')
        pages.push(amountPages)
      }
      return pages
    }

    setPaginationButtons(generatePagination())
  }, [amountPages, pageActive])

  return paginationButtons
}

export default usePagination
