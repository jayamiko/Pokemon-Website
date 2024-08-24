import React from "react";
import Pagination from "react-bootstrap/Pagination";
import { LIMIT_PAGINATION } from "../../utils/constants";

function PaginationList({ count, currentPage, setCurrentPage, setOffset }) {
  const startIdx = currentPage > 1 ? currentPage - 2 : currentPage - 1;
  const endIdx = startIdx + 4;
  const totalPage = count && Math.ceil(count / LIMIT_PAGINATION);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setOffset(pageNumber * LIMIT_PAGINATION - LIMIT_PAGINATION);
  };

  const prevPageChange = () => {
    handlePageChange(currentPage > 1 ? currentPage - 1 : 1);
  };

  const nextPageChange = () => {
    handlePageChange(currentPage < totalPage ? currentPage + 1 : totalPage);
  };
  return (
    <Pagination>
      <Pagination.First onClick={() => handlePageChange(1)} />
      <Pagination.Prev onClick={prevPageChange} disabled={currentPage === 1} />

      {[...Array(totalPage).keys()].slice(startIdx, endIdx).map((page) => (
        <Pagination.Item
          key={page + 1}
          active={currentPage === page + 1}
          onClick={() => handlePageChange(page + 1)}
        >
          {page + 1}
        </Pagination.Item>
      ))}

      {currentPage < totalPage && (
        <>
          <Pagination.Ellipsis />
          <Pagination.Item onClick={() => handlePageChange(totalPage)}>
            {totalPage}
          </Pagination.Item>
        </>
      )}
      <Pagination.Next
        onClick={nextPageChange}
        disabled={currentPage === totalPage}
      />
      <Pagination.Last
        onClick={() => handlePageChange(totalPage)}
        disabled={currentPage === totalPage}
      />
    </Pagination>
  );
}

export default PaginationList;
