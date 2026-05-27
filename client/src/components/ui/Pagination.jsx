import { ChevronLeft, ChevronRight } from 'lucide-react';

function getPageNumbers(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = [];
  const leftSibling = Math.max(1, current - 2);
  const rightSibling = Math.min(total, current + 2);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < total - 1;

  pages.push(1);

  if (showLeftEllipsis) {
    pages.push('...');
  }

  for (let i = leftSibling; i <= rightSibling; i++) {
    pages.push(i);
  }

  if (showRightEllipsis) {
    pages.push('...');
  }

  pages.push(total);

  return pages;
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-full p-2 text-primary-600 hover:bg-primary-50 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {pages.map((page, i) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${i}`} className="px-2 py-1 text-gray-400">
              ...
            </span>
          );
        }

        const isActive = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              min-w-[36px] rounded-full px-3 py-1.5 text-sm font-medium transition-colors
              ${
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-primary-700 hover:bg-primary-50'
              }
            `}
            aria-current={isActive ? 'page' : undefined}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-full p-2 text-primary-600 hover:bg-primary-50 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
}

export default Pagination;
