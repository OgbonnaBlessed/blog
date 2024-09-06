import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa';

const DashBoardPosts = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
                const data = await res.json();

                if (res.ok) {
                    setUserPosts(data.posts);
                    if (data.posts.length < 9) {
                        setShowMore(false);
                    }
                }

            } catch (error) {
                console.log(error.message);
            }
        };
        if (currentUser.isAdmin) {
            fetchPosts();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser._id]);

    const handleShowMore = async () => {
        const startIndex = userPosts.length;

        try {
            const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
            const data = await res.json();

            if (res.ok) {
                setUserPosts((prev) => [...prev, ...data.posts]);
                if (data.posts.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleDeletePost = async () => {
        setShowModal(false);
    
        try {
            const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
                method: 'DELETE',
            })

            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                setUserPosts((prev) => 
                prev.filter((post) => post._id !== postIdToDelete)
                );
            }

        } catch (error) {
            console.log(error);
        }
    } 

  return (
    <div className='dashboard-posts-list'>
        <div className="dashboard-posts-container">
            {currentUser.isAdmin && userPosts.length > 0 ?
            (<>
            <table>
                <thead>
                    <tr>
                        <th>Date updated</th>
                        <th>Post image</th>
                        <th>Post title</th>
                        <th>Category</th>
                        <th>Delete</th>
                        <th><span>Edit</span></th>
                    </tr>
                </thead>
                {userPosts.map((post) => (
                    <tbody key={post.id}>
                        <tr>
                            <td>{new Date(post.updatedAt).toLocaleDateString()}</td>
                            <td>
                                <Link to={`/post/${post.slug}`}>
                                    <img src={post.image} alt={post.title} />
                                </Link>
                            </td>
                            <td>
                                <Link to={`/post/${post.slug}`}>
                                    {post.title}
                                </Link>
                            </td>
                            <td>{post.category}</td>
                            <td>
                                <span 
                                    className='admin-delete-post'
                                    onClick={() => {
                                        setShowModal(!showModal)
                                        setPostIdToDelete(post._id);
                                    }}
                                >
                                    Delete
                                </span>
                            </td>
                            <td>
                                <Link to={`/update-post/${post._id}`}>
                                    <span className='admin-edit-post'>Edit</span>
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </table>
            {
                showMore && (
                    <p onClick={handleShowMore} className='see-more'>see more</p>
                )
            }
            </>
            ) : (<p>You have no post yet</p>)
            }
            <AnimatePresence>
          {showModal &&
            <motion.div 
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            className="modal-container"
          >
            <motion.div 
              initial={{
                translateY: -400,
                opacity: 0
              }}
              animate={{
                translateY: 0,
                opacity: 1
              }}
              exit={{
                opacity: 0,
                translateY: -400
              }}
              className="modal-box">
              <FaTimes 
                className='close-modal'
                onClick={() => setShowModal(false)}
              />
              <p className='modal-text'>Are you sure you want to delete this post?</p>
              <motion.div className="actions">
                <button type="button" onClick={() => handleDeletePost()}>Delete</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </motion.div>
            </motion.div>
          </motion.div>
          }
        </AnimatePresence>
        </div>
    </div>
  )
}

export default DashBoardPosts
