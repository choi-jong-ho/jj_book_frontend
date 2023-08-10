import React from 'react';
import { Pagination } from 'react-bootstrap';
import './ItemPagination.css';

const ItemPagination = ({ totalPages, currentPage, onPageChange }) => {
    const items = [];

    for (let page = 1; page <= totalPages; page++) {
        items.push(
            <Pagination.Item
                key={page}
                active={page - 1 === currentPage}
                onClick={() => onPageChange(page - 1)}
            >
                {page}
            </Pagination.Item>
        );
    }

    return (
        <div className="item-pagination-container">
            <Pagination>
                {/*<Pagination.First />*/}
                <Pagination.Prev
                    disabled={currentPage === 0}
                    onClick={() => onPageChange(currentPage - 1)}
                />
                {items}
                <Pagination.Next
                    disabled={currentPage === totalPages - 1}
                    onClick={() => onPageChange(currentPage + 1)}
                />
                {/*<Pagination.Last />*/}
            </Pagination>
        </div>
    );
}

export default ItemPagination;

