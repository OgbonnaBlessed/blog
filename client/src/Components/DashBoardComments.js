import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa';

const DashBoardComments = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [commentIdToDelete, setCommentIdToDelete] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`/api/comment/getcomments`);
                const data = await res.json();

                if (res.ok) {
                    setComments(data.comments);
                    if (data.comments.length < 9) {
                        setShowMore(false);
                    }
                }

            } catch (error) {
                console.log(error.message);
            }
        };
        if (currentUser.isAdmin) {
            fetchComments();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser._id]);

    const handleDeleteComment = async () => {
        setShowModal(false);
        try {
            const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`, {
                method: 'DELETE',
            });

            const data = await res.json();

            if (res.ok) {
                setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
                
            } else {
                console.log(data.message);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleShowMore = async () => {
        const startIndex = comments.length;

        try {
            const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`);
            const data = await res.json();

            if (res.ok) {
                setComments((prev) => [...prev, ...data.comments]);
                if (data.comments.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

  return (
    <div className='dashboard-posts-list'>
        <div className="dashboard-posts-container">
            {currentUser.isAdmin && comments.length > 0 ?
            (<>
            <table>
                <thead>
                    <tr>
                        <th>Date created</th>
                        <th>Comment content</th>
                        <th>Number of likes</th>
                        <th>PostId</th>
                        <th>UserId</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                {comments.map((comment, i) => (
                    <tbody key={i}>
                        <tr>
                            <td>{new Date(comment.updatedAt).toLocaleDateString()}</td>
                            <td>
                                {comment.content}
                            </td>
                            <td>
                                {comment.numberOfLikes}
                            </td>
                            <td>{comment.postId}</td>
                            <td>
                                {comment.userId}
                            </td>
                            <td>
                                <span 
                                    className='admin-delete-post'
                                    onClick={() => {
                                        setShowModal(!showModal)
                                        setCommentIdToDelete(comment._id);
                                    }}
                                >
                                    Delete
                                </span>
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
            ) : (<p>You have no comment yet</p>)
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
              <p className='modal-text'>Are you sure you want to delete this comment?</p>
              <motion.div className="actions">
                <button type="button" onClick={() => handleDeleteComment()}>Delete</button>
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

export default DashBoardComments