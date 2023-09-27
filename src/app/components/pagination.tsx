'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export default function Pagination({ page, numPages }: { page: number; numPages: number }) {
  const pathname = usePathname();

  const pageNumbers = Array.from({ length: numPages }).map((_, i) => {
    const pageNum = i + 1;
    return (
      <Link
        key={pageNum}
        href={{
          pathname,
          query: {
            page: pageNum,
          },
        }}
        className={twMerge('text-gray-500 hover:text-white', pageNum === page && 'pointer-events-none text-white')}
      >
        {pageNum}
      </Link>
    );
  });

  return (
    <div className="justify-between col-span-3 flex">
      <Link
        href={{
          pathname,
          query: { page: page > 1 ? page - 1 : 1 },
        }}
        className={twMerge('text-gray-500 hover:text-white', page <= 1 && 'pointer-events-none text-white')}
      >
        Previous
      </Link>
      {pageNumbers}
      <Link
        href={{
          pathname,
          query: { page: page + 1 },
        }}
        className={twMerge('text-gray-500 hover:text-white', page >= numPages && 'pointer-events-none text-white')}
      >
        Next
      </Link>
    </div>
  );
}
