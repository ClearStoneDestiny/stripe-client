import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/ui/pagination";

interface ICatalogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const CatalogPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: ICatalogPaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const getPages = (): (number | "ellipsis")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis")[] = [1];

    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent className="gap-1">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className={[
              "border border-white/8 bg-white/5 text-surface-hero-muted",
              "hover:border-brand/30 hover:bg-brand/10 hover:text-white",
              "transition-colors duration-200",
              currentPage === 1 && "pointer-events-none opacity-40",
            ].join(" ")}
          />
        </PaginationItem>

        {getPages().map((page, idx) =>
          page === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis className="text-white/30" />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => onPageChange(page)}
                className={[
                  "border transition-colors duration-200",
                  page === currentPage
                    ? "border-brand/40 bg-brand/20 text-brand-soft"
                    : "border-white/8 bg-white/5 text-surface-hero-muted hover:border-brand/30 hover:bg-brand/10 hover:text-white",
                ].join(" ")}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className={[
              "border border-white/8 bg-white/5 text-surface-hero-muted",
              "hover:border-brand/30 hover:bg-brand/10 hover:text-white",
              "transition-colors duration-200",
              currentPage === totalPages && "pointer-events-none opacity-40",
            ].join(" ")}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
