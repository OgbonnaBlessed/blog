import React, { useState, useEffect, useRef } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../Components/PostCard';
import { motion } from 'framer-motion';

const Search = () => {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: 'All',
    });
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [openSort, setOpenSort] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const categoryFromUrl = urlParams.get('category') || 'All';

        if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
            setSidebarData({
                ...sidebarData,
                searchTerm: searchTermFromUrl,
                sort: sortFromUrl,
                category: categoryFromUrl,
            })
        }

        const fetchPosts = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/post/getposts?${searchQuery}`);

            if (!res.ok) {
                setLoading(false);
                return;
            }

            if (res.ok) {
                const data = await res.json();
                setPosts(data.posts);
                setLoading(false);

                if (data.posts.length === 9) {
                    setShowMore(true);
                } else {
                    setShowMore(false);
                }
            }
        }
        fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);

    const handleChange = (e) => {
        setSidebarData({
            ...sidebarData, [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.sort);
        

        if (sidebarData.category === 'All') {
            urlParams.delete('category');  // Remove category filter for "All"
        } else {
            urlParams.set('category', sidebarData.category);
        }

        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    const handleViewMore = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);

        if (!res.ok) {
            return;
        }

        if (res.ok) {
            const data = await res.json();
            setPosts([ ...posts, ...data.posts ]);

            if (data.posts.length === 9) {
                setShowMore(true);
            } else {
                setShowMore(false);
            }
        }
    }

    const toggleDropdown = (type) => {
        if (type === 'sort') {
            setOpenSort(!openSort);
            setOpenCategory(false); // Close the other dropdown
        } else if (type === 'category') {
            setOpenCategory(!openCategory);
            setOpenSort(false); // Close the other dropdown
        }
    }

    const selectOption = (type, value) => {
        if (type === 'sort') {
            setSidebarData({ ...sidebarData, sort: value });
            setOpenSort(false); // Close dropdown after selecting
        } else if (type === 'category') {
            setSidebarData({ ...sidebarData, category: value });
            setOpenCategory(false); // Close dropdown after selecting
        }
    }

    const categoryRef = useRef()
    const sortRef = useRef();

    useEffect(() => {
        const closeProfileBox = (event) => {
        if (!sortRef.current.contains(event.target)) {
            setOpenSort(false);
        }

        if (!categoryRef.current.contains(event.target)) {
            setOpenCategory(false);
        }
        };

        document.addEventListener('mousedown', closeProfileBox);

        return () => {
            document.removeEventListener('mousedown', closeProfileBox);
        };
    });

    return (
        <div className='search-page-container'>
            <div className="search-side-bar">
                <motion.form 
                initial={{
                  opacity: 0,
                  translateY: 200,
                }}
                animate={{
                  opacity: 1,
                  translateY: 0
                }}
                exit={{
                  opacity: 0,
                  translateY: 200
                }}
                onSubmit={handleSubmit}>
                    <div className="form-search-item">
                        <p>Term:</p>
                        <input 
                            type="text" 
                            id='searchTerm'
                            value={sidebarData.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-search-item">
                        <label>Sort:</label>
                        <div 
                            className='select-box' 
                            ref={sortRef} 
                            onClick={() => toggleDropdown('sort')}>
                            <button type="button" className="dropdown-button">
                                {sidebarData.sort === 'desc' ? 'Latest' : 'Oldest'} <FaAngleDown />
                            </button>
                                <ul className={`select-drop-down ${openSort ? 'active' : 'inactive'}`}>
                                    <li onClick={() => selectOption('sort', 'desc')}>Latest</li>
                                    <li onClick={() => selectOption('sort', 'asc')}>Oldest</li>
                                </ul>
                        </div>
                    </div>
                    <div className="form-search-item">
                        <label>Category:</label>
                        <div 
                            className='select-box' 
                            ref={categoryRef} 
                            onClick={() => toggleDropdown('category')}>
                            <button type="button" className="dropdown-button">
                                {sidebarData.category} <FaAngleDown />
                            </button>
                            
                                <ul className={`select-drop-down ${openCategory ? 'active' : 'inactive'}`}>
                                    <li onClick={() => selectOption('category', 'All')}>All</li>
                                    <li onClick={() => selectOption('category', 'React')}>React</li>
                                    <li onClick={() => selectOption('category', 'Tailwind')}>Tailwind</li>
                                    <li onClick={() => selectOption('category', 'Bootstrap')}>Bootstrap</li>
                                    <li onClick={() => selectOption('category', 'Firebase')}>Firebase</li>
                                    <li onClick={() => selectOption('category', 'React Native')}>React Native</li>
                                </ul>
                          
                        </div>
                    </div>
                    <button className='search-form-button' type="submit">
                        Search
                    </button>
                </motion.form>
            </div>
            <div className="search-post-display">
                <div className="search-post-display-head">
                    <h1>POSTS RESULTS</h1>
                </div>
                <div className="search-content">
                    {!loading && posts.length === 0 ? (
                        <p>No post found!</p>
                    ) : ''}
                    {loading ? (
                    <div className="spinner-container">
                        <div style={{
                            border: '4px solid rgba(0, 0, 0, 0.1)',
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            borderTopColor: '#444444',
                            animation: 'spin 1s ease-in-out infinite',
                        }}></div>
                    </div>
                    ) : ''}
                    {!loading && posts && 
                    <motion.div 
                    initial={{
                        opacity: 0,
                        translateY: 200,
                      }}
                      animate={{
                        opacity: 1,
                        translateY: 0
                      }}
                      exit={{
                        opacity: 0,
                        translateY: 200
                      }}
                    className="posts-all-container">
                        <div className="posts-all-box">
                            {posts.map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>
                        {showMore && (
                            <p className='view-more' onClick={handleViewMore}>View more</p>
                        )}
                    </motion.div>}
                </div>
            </div>
        </div>
    )
}

export default Search;