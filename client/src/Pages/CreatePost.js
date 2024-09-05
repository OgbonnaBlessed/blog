import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState, useRef } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('select a category');
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadEror] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();

    const handleFileUpload = (e) => {
      const file = e.target.files[0];

      if (file) {
        // Check if the selected file is an image
        if (file.type.startsWith('image/')) {
          setFile(file);
          // setImageFileUrl(URL.createObjectURL(file));
        } else {
          // File is not an image
          // setImageFileUploadError('Only image files are allowed');
          setFile(null); // Clear the image file state
          // setImageFileUrl(currentUser.profilePicture); // Retain the initial image
        }
      }
    }

    const handleUploadImage = async () => {
      try {
        if (!file) {
          setImageUploadEror('Please select an image');
          return;
        }

        setImageUploadEror(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '-' + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageUploadProgress(progress.toFixed(0));
          }, (error) => {
            setImageUploadEror('Image upload failed');
            setImageUploadProgress(null);
          }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUploadProgress(null);
              setImageUploadEror(null);
              setFormData({ ...formData, image: downloadURL })
            })
          }
        )
      } catch (error) {
        setImageUploadEror('Image upload failed');
        setImageUploadProgress(null);
        console.log(error);
      }
    }

    const selectCategory = (category) => {
        setSelectedCategory(category);
        setOpen(false);
        setFormData({ ...formData, category: category })
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

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const res = await fetch('/api/post/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();

        if (!res.ok) {
          setPublishError(data.message);
          return;
        } else {
          setPublishError(null);
          navigate(`/post/${data.slug}`);
        }

      } catch (error) {
        setPublishError('Something went wrong');
      }
    }

    const spinnerStyle = {
      border: '2px solid rgba(0, 0, 0, 0.1)',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      borderTopColor: 'rgba(4, 122, 14, 0.438)',
      animation: 'spin 1s ease-in-out infinite',
    };

  return (
    <div className='create-container'>
      <div className="create-box">
        <h1>Create a Post</h1>
        <form onSubmit={handleSubmit}>
           <div className="select">
                <input 
                  type="text" 
                  placeholder='Title' 
                  required 
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <div 
                  className='select-box' 
                  ref={selectRef}
                >
                    <button 
                      type="button" 
                      onClick={togleOpen}
                    >{selectedCategory}
                  </button>
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
            <input 
              type="file" 
              accept='image/*' 
              name="" 
              id="" 
              onChange={handleFileUpload}
            />
            <button 
              type="button" 
              onClick={handleUploadImage}
              disabled={imageUploadProgress}
              className='upload-image-button'
            >
            {imageUploadProgress ? 
              (
                <>
                  <div style={spinnerStyle}></div>
                  <span>Loading...</span>
                </>
              ) : 'Upload image'}
            </button>
           </div>
           {
              imageUploadError &&
              <p>{imageUploadError}</p>
            }
            {
              formData.image && (
                <img
                  src={formData.image}
                  alt='upload'
                  className='form-data-image'
                />
            )}
           <ReactQuill 
                theme='snow' 
                placeholder='What would you love to post?'
                className='react-quill'
                required
                onChange={(value) => {setFormData({ ...formData, content: value })}}
            />
            <button type="submit" className='publish-button'>Publish</button>
            {
              publishError &&
              <p>{publishError}</p>
            }
        </form>
      </div>
    </div>
  )
}

export default CreatePost
