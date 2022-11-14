import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    selectSearchTerm,
    setSearchTerm,
    clearSearchTerm,
} from './searchSlice';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import './Search.css';

const Search = () => {
    const searchTerm = useSelector(selectSearchTerm);
    const dispatch = useDispatch();

    const onSearchTermChangeHandler = event => {
        const { value } = event.target;
        dispatch(setSearchTerm(value));
    };

    const onClearSearchTermHandler = () => {
        dispatch(clearSearchTerm());
    };

    const onKeyDownHandler = event => {
        if (searchTerm.trim() === '') {
            return;
        } else if (event.keyCode === 13) {
            document.getElementById('search-btn').click();
            dispatch(setSearchTerm(''));
        }
    };

    const onSearchButtonClick = e => {
        if (searchTerm.trim() === '') {
            e.preventDefault();
            return;
        }
        dispatch(setSearchTerm(''));
    };

    return (
        <div className="search-outer-container">
            <div className="search-container">
                <input
                    autoComplete="off"
                    id="search"
                    type="text"
                    value={searchTerm}
                    onChange={onSearchTermChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    placeholder="Go and Search reddits"
                    aria-label="Go and Search reddits"
                />
                {searchTerm.length > 0 && (
                    <button
                        type="button"
                        onClick={onClearSearchTermHandler}
                        aria-label="Clear search button"
                        className="clear-search-button"
                    >
                        <AiOutlineCloseCircle className="clear-search-icon" />
                    </button>
                )}
            </div>
            <Link
                id="search-btn"
                to={`/search/${searchTerm.trim()}`}
                onClick={onSearchButtonClick}
            >
                <BiSearch className="search-btn" />
            </Link>
        </div>
    );
};

export default Search;
