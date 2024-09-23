import React, { useState, useEffect, useRef } from 'react'
import { FaAngleDoubleDown, FaAngleDown } from 'react-icons/fa'
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
    const [showLess, setShowLess] = useState(false);  // For "View Less"
    const [openSort, setOpenSort] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);
    const [sideBar, setSideBar] = useState(false);
    const [initialPosts, setInitialPosts] = useState([]);  // Store the initial posts for "View Less"

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm') || '';
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

            const data = await res.json();
            setPosts(data.posts);
            setInitialPosts(data.posts);  // Store initial posts
            setLoading(false);

            if (data.posts.length >= 9) {
                setShowMore(true);
            } else {
                setShowMore(false);
            }
            setShowLess(false);  // Disable "View Less" by default
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

        const data = await res.json();
        setPosts([ ...posts, ...data.posts ]);  // Add the new posts to the existing ones

        if (data.posts.length === 9) {
            setShowMore(true);
        } else {
            setShowMore(false);  // Hide "View More" when less than 9 posts are fetched
        }
        setShowLess(true);  // Enable "View Less" after "View More" is clicked
    }

    const handleViewLess = () => {
        setPosts(initialPosts);  // Reset to the initial posts
        setShowLess(false);  // Disable "View Less" after it's clicked
        setShowMore(true);  // Re-enable "View More"
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
    const sidebarRef = useRef();

    useEffect(() => {
        const closeProfileBox = (event) => {
        if (!sortRef.current.contains(event.target)) {
            setOpenSort(false);
        }

        if (!categoryRef.current.contains(event.target)) {
            setOpenCategory(false);
        }

        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setSideBar(false);
        }
        };

        document.addEventListener('mousedown', closeProfileBox);

        return () => {
            document.removeEventListener('mousedown', closeProfileBox);
        };
    });


  return (
    <div className='search-page-container'>
        <div className="search-side-bar" ref={sidebarRef}>
            <form onSubmit={handleSubmit} className={`search-form ${sideBar ? 'active' : 'inactive'}`}>
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
                                <li onClick={() => selectOption('category', 'Purpose')}>Purpose</li>
                                <li onClick={() => selectOption('category', 'Faith confessions')}>Faith confessions</li>
                                <li onClick={() => selectOption('category', 'Spiritual warfare')}>Spiritual warfare</li>
                                <li onClick={() => selectOption('category', 'Healing')}>Healing</li>
                                <li onClick={() => selectOption('category', 'Fasting')}>Fasting</li>
                                <li onClick={() => selectOption('category', 'Salvation')}>Salvation</li>
                                <li onClick={() => selectOption('category', 'Christian lifestyle')}>Christian lifestyle</li>
                                <li onClick={() => selectOption('category', 'Holy spirit')}>Holy spirit</li>
                                <li onClick={() => selectOption('category', 'Inspirational messages')}>Inspirational messages</li>
                                <li onClick={() => selectOption('category', 'Family life')}>Family life</li>
                            </ul>
                        
                    </div>
                </div>
                <button
                    className='search-form-button'
                    type="submit"
                    onClick={() => setSideBar(!sideBar)}
                >
                    Search
                </button>
            </form>
            <FaAngleDoubleDown
                className={`reveal-search-bar ${sideBar ? 'inactive' : 'active'}`}
                onClick={() => setSideBar(!sideBar)}
            />
            </div>

        <div className="search-post-display">
            <div className="search-post-display-head">
                <h1>ARTICLES RESULTS</h1>
            </div>
            <div className="search-content">
                {!loading && posts.length === 0 ? (
                    <p>No post found!</p>
                ) : ''}
                {loading ? (
                    <div className="spinner-container">
                        <div
                            style={{
                                border: '4px solid rgba(0, 0, 0, 0.1)',
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                borderTopColor: '#444444',
                                animation: 'spin 1s ease-in-out infinite',
                            }}
                        ></div>
                    </div>
                ) : ''}
                {!loading && posts && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            translateY: 200,
                        }}
                        animate={{
                            opacity: 1,
                            translateY: 0,
                        }}
                        exit={{
                            opacity: 0,
                            translateY: 200,
                        }}
                        className="posts-all-container"
                    >
                        <div className="posts-all-box">
                            {posts.map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>
                        <div className="pagination">
                            {showMore && (
                                <p className='view-more' onClick={handleViewMore}>
                                    View more
                                </p>
                            )}
                            {showLess && (
                                <p 
                                    className='view-more' 
                                    onClick={() => {
                                        handleViewLess()
                                        window.scrollTo(0, 0)
                                    }}
                                >
                                    View less
                                </p>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    </div>
);
};

export default Search;