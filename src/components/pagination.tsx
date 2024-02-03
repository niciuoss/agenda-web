import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from './ui/button'

export interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
}
export function Pagination({
  pageIndex,
  totalCount,
  perPage,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>

      <div className="lg:gal-8 flex items-center gap-6">
        <div className="flex text-sm font-medium">
          Página {pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <ChevronsLeft />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button variant="outline">
            <ChevronLeft />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button variant="outline">
            <ChevronRight />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button variant="outline">
            <ChevronsRight />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
