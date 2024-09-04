import React, { useEffect, useState, useRef } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('select a category');

    const selectCategory = (category) => {
        setSelectedCategory(category);
        setOpen(false);
    }

    const selectRef = useRef();

    const togleOpen = () => {
        setOpen(!open)
    }

    useEffect(() => {
        const closeProfileBox = (event) => {
        if (!selectRef.current.contains(event.target)) {
            setOpen(false);
         }
        };

        document.addEventListener('mousedown', closeProfileBox);

        return () => {
            document.removeEventListener('mousedown', closeProfileBox);
        };
    });

  return (
    <div className='create-container'>
      <div className="create-box">
        <h1>Create a Post</h1>
        <form>
           <div className="select">
                <input type="text" placeholder='Title' required />
                <div className='select-box' ref={selectRef}>
                    <button type="button" onClick={togleOpen}>{selectedCategory}</button>
                    <ul className={`select-drop-down ${open ? 'active' : 'inactive'}`}>
                        <li onClick={() => selectCategory('React')}>React</li>
                        <li onClick={() => selectCategory('Tailwind')}>Tailwind</li>
                        <li onClick={() => selectCategory('Firebase')}>Firebase</li>
                        <li onClick={() => selectCategory('Bootstrap')}>Bootstrap</li>
                        <li onClick={() => selectCategory('React Native')}>React Native</li>
                    </ul>
                </div>
           </div>
           <div className="file">
            <input type="file" name="" id="" />
            <button type="button">upload image</button>
           </div>
           <div className="box"></div>
           <ReactQuill 
                theme='snow' 
                placeholder='What would you love to post?'
                className='react-quill'
                required
            />
            <button type="submit" className='publish-button'>Publish</button>
        </form>
      </div>
    </div>
  )
}

export default CreatePost
