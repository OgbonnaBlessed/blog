import React, { useState, useEffect } from 'react'
import { FaComments } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { FaUsers } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi';
import { HiOutlineArrowNarrowUp } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const DashBoardCollection = () => {
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [lastMonthUsers, setLastMonthUsers] = useState(0);
    const [lastMonthPosts, setLastMonthPosts] = useState(0);
    const [lastMonthComments, setLastMonthComments] = useState(0);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`/api/user/getusers?limit=5`);
                const data = await res.json();

                if (res.ok) {
                    setUsers(data.users);
                    setTotalUsers(data.totalUsers);
                    setLastMonthUsers(data.lastMonthUsers);
                }

            } catch (error) {
                console.log(error.message);
            }
        }

        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/post/getposts?limit=5`);
                const data = await res.json();

                if (res.ok) {
                    setPosts(data.posts);
                    setTotalPosts(data.totalPosts);
                    setLastMonthPosts(data.lastMonthPosts);
                }
                
            } catch (error) {
                console.log(error.message);
            }
        }

        const fetchComments = async () => {
            try {
                const res = await fetch(`/api/comment/getcomments?limit=5`);
                const data = await res.json();

                if (res.ok) {
                    setComments(data.comments);
                    setTotalComments(data.totalComments);
                    setLastMonthComments(data.lastMonthComments);
                }
                
            } catch (error) {
                console.log(error.message);
            }
        }

        if (currentUser.isAdmin) {
            fetchUsers();
            fetchPosts();
            fetchComments();
        }
    }, [currentUser]);

  return (
    <div className='collection-container'>
      <div className="collection-summary">
        <div className="summary">
            <div className="total">
                <div className="total-text">
                    <p className='head-text'>TOTAL USERS</p>
                    <h2>{totalUsers}</h2>
                </div>
                <FaUsers className='summary-icon' />
            </div>
            <div className="increased">
                <div className="icon-box">
                    <HiOutlineArrowNarrowUp size={20}/>
                    <p>{lastMonthUsers}</p>
                </div>
                <p>Last month</p>
            </div>
        </div>
        <div className="summary">
            <div className="total">
                <div className="total-text">
                    <p className='head-text'>TOTAL COMMENTS</p>
                    <h2>{totalComments}</h2>
                </div>
                <FaComments className='summary-icon'/>
            </div>
            <div className="increased">
                <div className="icon-box">
                    <HiOutlineArrowNarrowUp size={20}/>
                    <p>{lastMonthComments}</p>
                </div>
                <p>Last month</p>
            </div>
        </div>
        <div className="summary">
            <div className="total">
                <div className="total-text">
                    <p className='head-text'>TOTAL POSTS</p>
                    <h2>{totalPosts}</h2>
                </div>
                <HiDocumentText className='summary-icon'/>
            </div>
            <div className="increased">
                <div className="icon-box">
                    <HiOutlineArrowNarrowUp size={20}/>
                    <p>{lastMonthPosts}</p>
                </div>
                <p>Last month</p>
            </div>
        </div>
      </div>
      <div className="collection-info">
        <div className="users-info">
            <div className="top-box-info">
                <p>Recent users</p>
                <Link to={'/dashboard?tab=users'}>
                     <button type="button">see all</button>
                </Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>User image</th>
                        <th>username</th>
                    </tr>
                </thead>
                {users.map((user, i) => (
                <tbody key={i}>
                    <tr>
                        <td>
                            <img src={user.profilePicture} alt="" />
                        </td>
                        <td>
                            {user.username}
                        </td>
                    </tr>
                </tbody>
                ))}
            </table>
        </div>
        <div className="users-info">
            <div className="top-box-info">
                <p>Recent comments</p>
                <Link to={'/dashboard?tab=comments'}>
                     <button type="button">see all</button>
                </Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Comment content</th>
                        <th>Likes</th>
                    </tr>
                </thead>
                {comments.map((comment, i) => (
                <tbody key={i}>
                    <tr>
                        <td>{comment.content}</td>
                        <td>{comment.numberOfLikes}</td>
                    </tr>
                </tbody>
                ))}
            </table>
        </div>
      </div>
      <div className="posts-info users-info">
      <div className="top-box-info">
            <p>Recent posts</p>
            <Link to={'/dashboard?tab=posts'}>
                    <button type="button">see all</button>
            </Link>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Post Image</th>
                    <th>Post Title</th>
                    <th>Category</th>
                </tr>
            </thead>
            {posts.map((post, i) => (
            <tbody key={i}>
                <tr>
                    <td>
                        <img src={post.image} alt="" />
                    </td>
                    <td>{post.title}</td>
                    <td>{post.category}</td>
                </tr>
            </tbody>
            ))}
        </table>
      </div>
    </div>
  )
}

export default DashBoardCollection
