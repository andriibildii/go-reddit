import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectFilters,
    setCurrentFilter,
    selectCurrentFilter,
} from './filtersSlice';
import { loadPostsHot, loadPostsNew, loadPostsTop } from '../../app/postSlice';
import { selectCurrentSubreddit } from '../SubredditsAside/subredditsAsideSlice';
import { MdLocalFireDepartment, MdAutorenew, MdBarChart } from 'react-icons/md';
import './Filters.css';

const Filters = () => {
    const dispatch = useDispatch();
    const filters = useSelector(selectFilters);
    const currentFilter = useSelector(selectCurrentFilter);
    const currentSubreddit = useSelector(selectCurrentSubreddit);

    const icons = {
        hot: <MdLocalFireDepartment />,
        new: <MdAutorenew />,
        top: <MdBarChart />,
    };

    const handleCurrentFilter = (event, filter) => {
        event.preventDefault();
        dispatch(setCurrentFilter(filter));
        switch (filter) {
            case 'hot':
                dispatch(loadPostsHot(currentSubreddit));
                break;
            case 'new':
                dispatch(loadPostsNew(currentSubreddit));
                break;
            case 'top':
                dispatch(loadPostsTop(currentSubreddit));
                break;
            default:
                return;
        }
    };

    const createFilterLink = filter => {
        return (
            <li key={filter}>
                <Link
                    className={
                        currentFilter === filter
                            ? 'nav-link selected'
                            : 'nav-link'
                    }
                    to="#"
                    onClick={event => {
                        handleCurrentFilter(event, filter);
                    }}
                >
                    {icons[filter]}
                    go/{filter}
                </Link>
            </li>
        );
    };
    return (
        <Card className="filters-card">
            <nav>
                <ul className="filters-list">
                    {filters.map(createFilterLink)}
                </ul>
            </nav>
        </Card>
    );
};

export default Filters;
