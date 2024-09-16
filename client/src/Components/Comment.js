import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { FaThumbsUp } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const Comment = ({comment, onLike, onEdit, onDelete}) => {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);
    const { currentUser } = useSelector((state) => state.user);
    
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                
                if (res.ok) {
                    setUser(data);
                }

            } catch (error) {
                console.log(error.message);
            }
        }
        getUser()
    }, [comment])

    const handleEdit = async () => {
        setIsEditing(true);    
        setEditedContent(comment.content);
    }

    const handleSave = async () => {
        try {
            const res = await fetch(`/api/comment/editcomment/${comment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: editedContent
                })
            });

            if (res.ok) {
                setIsEditing(false);
                onEdit(comment, editedContent);
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='comment-item'>
        <div className="comment-user-info">
                <img src={(user.profilePicture) || 'https://cdn-icons-png.flaticon.com/128/149/149071.png'} alt="" />
                <p className='user-name'>@{user.username || 'Anonymous'} <span>{moment(comment.createdAt).fromNow()}</span></p>
        </div>
        {isEditing 
        ? (
            <div className='comment-content edit-comment-content'>
                <motion.textarea 
                    initial={{
                        opacity: 0,
                        translateY: -50,
                      }}
                      animate={{
                        opacity: 1,
                        translateY: 0
                      }}
                      exit={{
                        opacity: 0,
                        translateY: -50,
                      }}
                    rows={4}
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                >
                </motion.textarea>
                <div className="comment-content-edit-actions">
                    <button type="button" onClick={handleSave}>Save</button>
                    <button 
                        type="button"
                        onClick={() => setIsEditing(false)}
                        >Cancel</button>
                </div>
            </div>
        )
        : (
            <div className="comment-content">
                <div>{comment.content}</div>
                <div className="actions">
                    <FaThumbsUp 
                        className={`thumb ${currentUser && comment.likes.includes(currentUser._id) && 'thumb-blue'}`} 
                        onClick={() => { onLike(comment._id)}}
                        />
                    <p>
                        {comment.numberOfLikes > 0 &&
                        comment.numberOfLikes + '  ' + (comment.numberOfLikes === 1 ? 'like' : 'likes')}
                    </p>
                    {currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                        <>
                            <p onClick={handleEdit} className='edit-comment'>Edit</p>
                            <p 
                                onClick={() => onDelete(comment._id)}
                                className='delete-comment'
                                >
                                        Delete
                                </p>
                        </>
                    )}
                </div>
            </div>
        )}
    </div>
  )
}

export default Comment
