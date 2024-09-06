import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa';

const DashBoardUsers = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`/api/user/getusers`);
                const data = await res.json();

                if (res.ok) {
                    setUsers(data.users);
                    if (data.users.length < 9) {
                        setShowMore(false);
                    }
                }

            } catch (error) {
                console.log(error.message);
            }
        };
        if (currentUser.isAdmin) {
            fetchUsers();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser._id]);

    const handleDeleteUser = async () => {
        try {
            const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
                method: 'DELETE',
            });

            const data = await res.json();

            if (res.ok) {
                setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
                setShowModal(false);
            } else {
                console.log(data.message);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleShowMore = async () => {
        const startIndex = users.length;

        try {
            const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
            const data = await res.json();

            if (res.ok) {
                setUsers((prev) => [...prev, ...data.users]);
                if (data.users.length < 9) {
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
            {currentUser.isAdmin && users.length > 0 ?
            (<>
            <table>
                <thead>
                    <tr>
                        <th>Date created</th>
                        <th>User image</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                {users.map((user, i) => (
                    <tbody key={i}>
                        <tr>
                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td>
                                <img src={user.profilePicture} alt={user.username} className='dash-board-user-image' />
                            </td>
                            <td>
                                {user.username}
                            </td>
                            <td>{user.email}</td>
                            <td>
                                {user.isAdmin
                                ? <p>Yes</p>
                                : <p>No</p>
                                }
                            </td>
                            <td>
                                <span 
                                    className='admin-delete-post'
                                    onClick={() => {
                                        setShowModal(!showModal)
                                        setUserIdToDelete(user._id);
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
            ) : (<p>You have no user yet</p>)
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
              <p className='modal-text'>Are you sure you want to delete this user?</p>
              <motion.div className="actions">
                <button type="button" onClick={() => handleDeleteUser()}>Delete</button>
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

export default DashBoardUsers