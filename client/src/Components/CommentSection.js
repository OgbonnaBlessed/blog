import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const CommentSection = ({postId}) => {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState('')

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
            }

        } catch (error) {
            setCommentError(error.message)
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
                rows={8}
                placeholder='Add a comment...'
                maxLength={200}
                onChange={(e) => setComment(e.target.value)}
                value={comment}
            ></textarea>
            <div className="form-box">
                <p>{200 - comment.length} characters left</p>
                <button type='submit'>Submit</button>
            </div>
        </form>
        {commentError &&
        <p>
            {commentError}
        </p>
        }
        </>
     )}
    </div>
  )
}

export default CommentSection
