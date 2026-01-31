'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const renderPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const range = 2;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > range + 1) {
        pageNumbers.push("...");
      }
      for (let i = Math.max(currentPage - range, 2); i <= Math.min(currentPage + range, totalPages - 1); i++) {
        pageNumbers.push(i);
      }
      if (currentPage < totalPages - range) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-wrap justify-center mt-6 gap-2 sm:gap-3">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="ml-1 hidden sm:inline">Trước</span>
      </button>

      {renderPageNumbers().map((pageNum, index) => (
        <button
          key={index}
          onClick={() => pageNum !== "..." && onPageChange(Number(pageNum))}
          disabled={pageNum === "..."}
          className={`px-3 py-1 rounded text-sm ${
            currentPage === pageNum
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        <span className="mr-1 hidden sm:inline">Sau</span>
        <ChevronRight className="w-4 h-4" />
      </button>
      
    </div>
  );
}
