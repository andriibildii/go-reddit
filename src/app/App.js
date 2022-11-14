import { Routes, Route } from 'react-router-dom';

import Header from '../features/Header/Header';
import PostsFeedMain from '../features/PostsFeedMain/PostsFeedMain';

import PostsFeedAside from '../features/PostsFeedAside/PostsFeedAside';
import PostsFeedSearch from '../features/PostsFeedSearch/PostsFeedSearch';
import SubredditsAside from '../features/SubredditsAside/SubredditsAside';
import './App.css';

function App() {
    return (
        <div id="app-container">
            <Header />
            <main>
                <Routes>
                    <Route exact path="/" element={<PostsFeedMain />} />
                    <Route path="/r/:id" element={<PostsFeedAside />} />
                    <Route path="/search/:id" element={<PostsFeedSearch />} />
                </Routes>
            </main>
            <aside>
                <SubredditsAside />
            </aside>
        </div>
    );
}

export default App;
