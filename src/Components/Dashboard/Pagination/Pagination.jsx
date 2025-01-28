import React from 'react';
import ReactPaginate from 'react-paginate';


export default function PaginatedItems({ limit, total, setPage }) {
  const pageCount = Math.ceil(total / limit);
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => setPage(e.selected + 1)}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName='d-flex align-items-center justify-content-end'
        pageLinkClassName='pagination-tag-anchor mx-1 text-black rounded-circle'
        activeLinkClassName='pagination-tag-anchor text-primary bg-white rounded-circle'
      />
    </>
  );
}