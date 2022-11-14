import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useWindowSize from '../../utils/useWindowSize';
import './SubredditsAside.css';

import {
    selectBeSubreddit,
    loadAsideSubreddits,
    selectCurrentSubreddit,
    selectAsideError,
} from './subredditsAsideSlice';
import Card from '../../components/Card/Card';
import { MdHome, MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import { IoLogoReddit } from 'react-icons/io5';

const SubredditsAside = () => {
    const [showList, setShowList] = useState(false);
    const { width } = useWindowSize();

    const dispatch = useDispatch();
    const subreddits = useSelector(selectBeSubreddit);
    const currentSubreddit = useSelector(selectCurrentSubreddit);
    const asideError = useSelector(selectAsideError);

    useEffect(() => {
        dispatch(loadAsideSubreddits());
    }, [dispatch]);

    const subredditList = () => {
        return (
            <li>
                <ul>
                    {subreddits
                        .filter(subreddit => subreddit.prefix_name !== 'r/Home')
                        .map(subreddit => {
                            return (
                                <li key={subreddit.id}>
                                    <Link
                                        to={`/${subreddit.prefix_name}`}
                                        className={
                                            currentSubreddit ===
                                            subreddit.prefix_name
                                                ? 'nav-link selected'
                                                : ' nav-link'
                                        }
                                        id={
                                            currentSubreddit ===
                                            subreddit.prefix_name
                                                ? 'subreddit-link-selected'
                                                : 'subreddit-link'
                                        }
                                    >
                                        {subreddit.icon ? (
                                            <img
                                                src={subreddit.icon}
                                                alt={subreddit.name}
                                            />
                                        ) : (
                                            <IoLogoReddit />
                                        )}
                                        {subreddit.prefix_name}
                                    </Link>
                                </li>
                            );
                        })}
                </ul>
            </li>
        );
    };

    if (width <= 768) {
        return (
            <Card className="subreddits-card">
                <ul id="categories-container">
                    <li id="home-link-container">
                        <Link
                            to="/"
                            className={
                                currentSubreddit === ''
                                    ? 'nav-link selected'
                                    : 'nav-link'
                            }
                        >
                            {<MdHome />}go/Home
                        </Link>
                    </li>
                    <li id="subreddits-link-container">
                        <Link
                            to="#"
                            onClick={() =>
                                showList
                                    ? setShowList(false)
                                    : setShowList(true)
                            }
                            className={
                                currentSubreddit !== '' &&
                                currentSubreddit !== 'searchresults' &&
                                showList
                                    ? 'nav-link selected'
                                    : 'nav-link'
                            }
                        >
                            go/Subreddits/
                            {showList ? (
                                <MdKeyboardArrowUp />
                            ) : (
                                <MdKeyboardArrowDown />
                            )}
                        </Link>
                    </li>
                </ul>
                <ul id="subreddits-container">{showList && subredditList()}</ul>
            </Card>
        );
    }

    if (asideError) {
        return (
            <Card className="subreddits-card">
                <h3 className="asideErrorMessage">
                    Failed loading subreddits.
                    <br /> Try refresh
                </h3>
            </Card>
        );
    }

    return (
        <Card className="subreddits-card">
            <ul id="subreddits-container">
                <li>
                    <ul id="categories-container">
                        <li id="home-link-container">
                            <Link
                                to="/"
                                className={
                                    currentSubreddit === ''
                                        ? 'nav-link selected'
                                        : 'nav-link'
                                }
                            >
                                {<MdHome />}go/Home
                            </Link>
                        </li>
                        {subredditList()}
                    </ul>
                </li>
            </ul>
        </Card>
    );
};

export default SubredditsAside;
