import React from 'react';
import {Form, Button, Container, FormSelect} from 'react-bootstrap';
import './SearchBar.css';

const SearchBar = () => {
    // const [searchTerm, setSearchTerm] = useState('');
    // const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    // const handleSearchChange = (event) => {
    //     setSearchTerm(event.target.value);
    // };
    //
    // const handleCategoryChange = (event) => {
    //     setSelectedCategory(event.target.value);
    // };

    // const handleFormSubmit = (event) => {
    //     event.preventDefault();
    //     onSearch(searchTerm, selectedCategory);
    // };

    const date = ['전체', '1일', '1주', '1개월', '6개월'];
    const sellStatus = ['전체', '판매', '품절'];
    const searchBy = ['상품명', '등록자'];

    return (
        <Container className='search-container'>
            <Form className='search-form' onSubmit={null}>
                <Form.Group className="search-select">
                    <FormSelect
                        className="form-select"
                        // value={selectedCategory}
                        // onChange={handleCategoryChange}
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
                        // value={selectedCategory}
                        // onChange={handleCategoryChange}
                    >
                        {
                            sellStatus.map((sellStatus, index) => (
                                <option key={index} value={sellStatus}>
                                    {sellStatus}
                                </option>
                            ))
                        }
                    </FormSelect>
                </Form.Group>
                <Form.Group className="search-select">
                    <FormSelect
                        className="form-select"
                        // value={selectedCategory}
                        // onChange={handleCategoryChange}
                    >
                        {
                            searchBy.map((searchBy, index) => (
                                <option key={index} value={searchBy}>
                                    {searchBy}
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
                        // value={searchTerm}
                        // onChange={handleSearchChange}
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
