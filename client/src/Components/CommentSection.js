import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa';

const CommentSection = ({postId}) => {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null)
    const [comments, setComments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            if (comment.length > 200) {
                return;
            }
    
            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',},
                body: JSON.stringify({ content: comment, postId, userId: currentUser._id })
            })
    
            const data = await res.json();
    
            if (res.ok) {
                setComment('');
                setCommentError(null);
                setComments([data, ...comments]);
            }

        } catch (error) {
            setCommentError(error.message)
        }
    }

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`/api/comment/getpostcomments/${postId}`);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }

            } catch (error) {
                console.log(error.message);
            }
        }
        getComments();

    }, [postId])

    const handleCommentLike = async (commentId) => {
        try {
            if (!currentUser) {
                navigate('/signin');
                return;
            }
            const res = await fetch(`/api/comment/likecomment/${commentId}`, {
                method: 'PUT',
            });
            if (res.ok) {
                const data = await res.json();
                setComments(comments.map((comment) => (
                    comment._id === commentId ? {
                        ...comment,
                        likes: data.likes,
                        numberOfLikes: data.likes.length,
                    } : comment
                )))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = async (comment, editedContent) => {
        setComments(comments.map((c) => c._id === comment._id ? { ...c, content: editedContent } : c));
    }

    const handleDeleteComment = async (commentId) => {
        setShowModal(false);
        try {
            if (!currentUser) {
                navigate('/signin');
                return;
            }
            const res = await fetch(`/api/comment/deletecomment/${commentId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                const data = await res.json();
                setComments(comments.filter((comment) => comment._id !== commentId));
            }

        } catch (error) {
            console.log(error.message);
        }
    }

  return (
    <div className='comment-section'>
      {currentUser 
      ? (
        <div className='signed-in-user'>
            <p>Signed in as:</p>
            <div className="signed-in-user-info">
                <img src={currentUser.profilePicture} alt="" />
                <Link to={'/dashboard?tab=profile'}>
                    <p>{currentUser.username}</p>
                </Link>
            </div>
        </div>
      )
     : (
        <div className="not-signed-in">
            <p>You have to be signed in to comment</p>
            <Link to={'/signin'}>Sign in</Link>
        </div>
     )}

     {currentUser &&
     (  <>
        <form onSubmit={handleSubmit}>
            <textarea 
                rows={5}
                placeholder='Add a comment...'
                maxLength={200}
                onChange={(e) => setComment(e.target.value)}
                value={comment}
            ></textarea>
            <div className="form-box">
                <p>{200 - comment.length} characters left</p>
                <button type='submit'>Submit</button>
            </div>
        {commentError &&
        <p>
            {commentError}
        </p>
        }
        </form>
        </>
     )}
     <div className="comment-display">
        {comments.length === 0 ? (
            <p>No comments to show</p>
        ): (
            <>
                <div className='comment-total-box'>
                    <p>Comments</p>
                    <div className='comment-total-number'>{comments.length}</div>
                </div>
                <div className="comment-show">
                    {comments.map((comment) => (
                        <Comment 
                            key={comment._id}
                            comment={comment}
                            onLike={handleCommentLike}
                            onEdit={handleEdit}
                            onDelete={(commentId) => {
                                setShowModal(true);
                                setCommentToDelete(commentId)
                            }}
                        />
                    ))}
                </div>
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
                <button type="button" onClick={() => handleDeleteComment(commentToDelete)}>Delete</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </motion.div>
            </motion.div>
          </motion.div>
          }
        </AnimatePresence>
        </>
        )}
     </div>
    </div>
  )
}

export default CommentSection
