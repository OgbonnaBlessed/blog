import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';

const CommentSection = ({postId}) => {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null)
    const [comments, setComments] = useState([]);
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
                        />
                    ))}
                </div>
        </>
        )}
     </div>
    </div>
  )
}

export default CommentSection
