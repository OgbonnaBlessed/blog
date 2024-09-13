import React, { useEffect, useState } from 'react'

const Author = ({post}) => {
    const [user, setUser] = useState({});
    
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${post.userId}`);
                const data = await res.json();
                
                if (res.ok) {
                    setUser(data);
                }

            } catch (error) {
                console.log(error.message);
            }
        }
        getUser()
    }, [post])

  return (
    <button type='button' className='Author'>
      {user.username}
    </button>
  )
}

export default Author
