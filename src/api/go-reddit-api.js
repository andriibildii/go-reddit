const url = 'https://www.reddit.com';

//SUBREDDIT ASIDE MENU
export const fetchAsideSubreddits = async () => {
    const response = await fetch(`${url}/subreddits.json`);
    const jsonResponse = await response.json();

    return jsonResponse.data.children.map(sub => {
        return {
            name: sub.data.display_name,
            prefix_name: sub.data.display_name_prefixed,
            icon: sub.data.icon_img,
            id: sub.data.id,
            url: sub.data.url,
        };
    });
};

//FETCH FOT POSTS
export const fetchPostsHot = async subreddit => {
    let endpoint;
    if (subreddit) {
        endpoint = `${url}/${subreddit}/hot.json`;
    } else {
        endpoint = `${url}/hot.json`;
    }
    const response = await fetch(endpoint);
    const jsonResponse = await response.json();

    return jsonResponse.data.children;
};

//FETCH NEW POSTS
export const fetchPostsNew = async subreddit => {
    let endpoint;
    if (subreddit) {
        endpoint = `${url}/${subreddit}/new.json`;
    } else {
        endpoint = `${url}/new.json`;
    }
    const response = await fetch(endpoint);
    const jsonResponse = await response.json();

    return jsonResponse.data.children;
};

//FETCH TOP POSTS
export const fetchPostsTop = async subreddit => {
    let endpoint;
    if (subreddit) {
        endpoint = `${url}/${subreddit}/top.json`;
    } else {
        endpoint = `${url}/top.json`;
    }
    const response = await fetch(endpoint);
    const jsonResponse = await response.json();

    return jsonResponse.data.children;
};

//FETCH SUBREDDIT ABOUT
export const fetchSubredditAbout = async subreddit => {
    const response = await fetch(`${url}/${subreddit}/about.json`);
    const jsonResponse = await response.json();

    return jsonResponse.data;
};

// FETCH SEARCH RESULTS
export const fetchSearchResults = async searchTerm => {
    const response = await fetch(`${url}/search.json?q=${searchTerm}`);
    const jsonResponse = await response.json();

    return jsonResponse.data.children;
};

//FETCH COMMENTS
export const fetchPostComments = async permalink => {
    const response = await fetch(`${url}/${permalink}/.json`);
    const jsonResponse = await response.json();

    return jsonResponse[1].data.children.map(comment => comment.data);
};

//FETCH AVATAR
export const fetchUserAvatar = async user => {
    const response = await fetch(
        `https://www.reddit.com/user/${user}/about.json`,
    );
    const jsonResponse = await response.json();

    return jsonResponse.data;
};
