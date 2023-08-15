import React, {useState} from 'react';
import {Form, Button, Container, FormSelect} from 'react-bootstrap';
import './SearchBar.css';
import axios from "axios";

const SearchBar = ({handleFilterChange, handleSearch}) => {

    const date = {전체:'all', '1일': '1d', '1주': '1w', '1달': '1m', '6달': '6m' };
    const Status = {전체: '', 판매: 'SELL', 품절: 'SOLD_OUT'};
    const search = {상품명: 'itemNm', 판매자: 'createBy'};

    return (
        <Container className='search-container'>
            <Form className="search-form" onSubmit={handleSearch}>
                <Form.Group className="search-select">
                    <FormSelect
                        className="form-select"
                        name="searchDateType"
                        onChange={handleFilterChange}
                    >
                        {
                            Object.entries(date).map(([key, value], index) => (
                                <option key={index} value={value}>
                                    {key}
                                </option>
                            ))
                        }
                    </FormSelect>
                </Form.Group>
                <Form.Group className="search-select">
                    <FormSelect
                        className="form-select"
                        name="searchSellStatus"
                        onChange={handleFilterChange}
                    >
                        {
                            Object.entries(Status).map(([key, value], index) => (
                                <option key={index} value={value}>
                                    {key}
                                </option>
                            ))
                        }
                    </FormSelect>
                </Form.Group>
                <Form.Group className="search-select">
                    <FormSelect
                        className="form-select"
                        name="searchBy"
                        onChange={handleFilterChange}
                    >
                        {
                            Object.entries(search).map(([key, value], index) => (
                                <option key={index} value={value}>
                                    {key}
                                </option>
                            ))
                        }
                    </FormSelect>
                </Form.Group>
                <Form.Group className="search-bar">
                    <Form.Control
                        type="text"
                        className="form-control"
                        placeholder="검색어를 입력하세요"
                        name="searchQuery"
                        onChange={handleFilterChange}
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                >
                    검색
                </Button>
            </Form>
        </Container>
    );
}

export default SearchBar;
