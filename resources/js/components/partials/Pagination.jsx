import React, { useState } from 'react';
import '../../../css/pagination.css'; // Import your CSS file for styling if needed

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const pages = [];
    let start = 1;
    let end = 5;
    const handlePageClick = (page) => {
        if (1 <= page && page <= totalPages)
            onPageChange(page);
    };


    if (currentPage > 3) {
        start = currentPage - 2;
    }

    if (currentPage > 3 && currentPage < totalPages - 2) {
        end = currentPage + 2;
    }

    if (currentPage > totalPages - 3) {
        start = totalPages - 4;
        end = totalPages;
    }

    for (let i = 1; i <= totalPages; i++) {
        if (i >= start && i <= end) {
            pages.push(i);
        }
    }

    return (
        <div className="pagination-container">
            <button className="pagination-button" onClick={() => handlePageClick(1)}>
                &laquo;&laquo;
            </button>
            <button className="pagination-button" onClick={() => handlePageClick(currentPage - 1)}>
                &laquo;
            </button>
            {pages.map((page, index) => (
                <button
                key={page}
                className={`pagination-button ${currentPage === page ? 'active' : ''}`}
                onClick={() => handlePageClick(page)}
                >
                    {page}
                </button>
            ))}
            <button className="pagination-button" onClick={() => handlePageClick(currentPage + 1)}>
                &raquo;
            </button>
            <button className="pagination-button" onClick={() => handlePageClick(totalPages)}>
                &raquo;&raquo;
            </button>
        </div>
  );
};

export default Pagination;
