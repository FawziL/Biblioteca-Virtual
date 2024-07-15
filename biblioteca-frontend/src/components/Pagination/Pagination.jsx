import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalResults, resultsPerPage, nextPage, prevPage }) => {
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;

    return (
        <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>
                Anterior
            </button>
            <span>
                Página {currentPage} de {Math.ceil(totalResults / resultsPerPage)}
            </span>
            <button onClick={nextPage} disabled={indexOfLastResult >= totalResults}>
                Siguiente
            </button>
        </div>
    );
};

export default Pagination;
