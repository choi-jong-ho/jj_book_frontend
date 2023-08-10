import React, {useState} from 'react';
import {Form, Button, Container, FormSelect} from 'react-bootstrap';
import './SearchBar.css';
import axios from "axios";

const SearchBar = ({handleFilterChange, handleSearch}) => {
    // const [searchDateType, setSearchDateType] = useState('all');
    // const [searchSellStatus, setSearchSellStatus] = useState('전체');
    // const [searchBy, setSearchBy] = useState('상품명');
    // const [searchQuery, setSearchQuery] = useState('');

    // const handleDateTypeChange = (e) => {
    //     setSearchDateType(e.target.value);
    // };
    //
    // const handleSellStatusChange = (e) => {
    //     setSearchSellStatus(e.target.value);
    // };
    //
    // const handleSearchByChange = (e) => {
    //     setSearchBy(e.target.value);
    // };
    //
    // const handleSearchQueryChange = (e) => {
    //     setSearchQuery(e.target.value);
    // };
    //
    // const handleSubmit = async (e, page = 0) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.get('/admin/items', {
    //             params: {
    //                 // searchDateType,
    //                 // searchSellStatus,
    //                 // searchBy,
    //                 // query: encodeURIComponent(searchQuery),
    //                 page,
    //             },
    //         });
    //
    //         console.log('검색 데이터', response);
    //
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const date = ['전체', '1일', '1주', '1개월', '6개월'];
    const Status = ['전체', '판매', '품절'];
    const search = ['상품명', '등록자'];

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
                            date.map((date, index) => (
                                <option key={index} value={date}>
                                    {date}
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
                            Status.map((x, index) => (
                                <option key={index} value={x}>
                                    {x}
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
                            search.map((x, index) => (
                                <option key={index} value={x}>
                                    {x}
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
