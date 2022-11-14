import { FaReddit } from 'react-icons/fa';
import './Loading.css';

const Loading = () => {
    return (
        <div>
            <div className="loading">
                <div className="logo-holder">
                    <FaReddit className="logo" />
                </div>
            </div>
        </div>
    );
};

export default Loading;
