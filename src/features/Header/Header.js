import Search from '../Search/Search';
import { FaReddit } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';
import './Header.css';

const Header = () => {
    return (
        <header>
            <div id="header-main">
                <a href="/">
                    <div className="logo-container">
                        <FaReddit className="logo" />
                        <h1>go/Reddit</h1>
                    </div>
                </a>
                <Search className="search-component" />
            </div>
            <div id="header-contacts">
                <a href="#" className="github-link">
                    <AiFillGithub />
                </a>
            </div>
        </header>
    );
};

export default Header;
