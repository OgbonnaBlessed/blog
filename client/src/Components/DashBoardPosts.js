import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const DashBoardPosts = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    console.log(userPosts);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
                const data = await res.json();

                if (res.ok) {
                    setUserPosts(data.posts);
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
  return (
    <div className='dashboard-posts-list'>
        <div className="dashboard-posts-container">
            {currentUser.isAdmin && userPosts.length > 0 ?
            (<table>
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
                    <tbody>
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
                                <span className='admin-delete-post'>Delete</span>
                            </td>
                            <td>
                                <Link to={`/update-post/${post._id}`}>
                                    <span className='admin-edit-post'>Edit</span>
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </table>)
            : (<p>You have no post yet</p>)
            }
        </div>
    </div>
  )
}

export default DashBoardPosts
