import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { FaThumbsUp } from 'react-icons/fa'

const Comment = ({comment}) => {
    const [user, setUser] = useState({});
    
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
  return (
    <div className='comment-item'>
        <div className="comment-user-info">
            <img src={user.profilePicture} alt="" />
            <p className='user-name'>@{user.username} <span>{moment(comment.createdAt).fromNow()}</span></p>
        </div>
        <div className="comment-content">
            <div>{comment.content}</div>
            <div className="actions">
                <FaThumbsUp className='thumb'/>
                <p>1</p>
                <p>likes</p>
                <p>Edit</p>
                <p>Delete</p>
            </div>
        </div>
    </div>
  )
}

export default Comment
