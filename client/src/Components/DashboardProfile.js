import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateFailure, updateStart, updateSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion'

const DashboardProfile = () => {
  const dispatch = useDispatch();
  const { currentUser, error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(currentUser.profilePicture);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Check if the selected file is an image
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file));
      } else {
        // File is not an image
        setImageFileUploadError('Only image files are allowed.');
        setImageFile(null); // Clear the image file state
        setImageFileUrl(currentUser.profilePicture); // Retain the initial image
      }
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError('Could not upload image (File must be less than 2MB)');
        setImageFileUploadProgress(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downLoadURL) => {
          setImageFileUrl(downLoadURL);
          setImageFileUploadProgress(null); // Reset progress after successful upload
          setFormData({ ...formData, profilePicture: downLoadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }

    if (imageFileUploading) {
      setUpdateUserError('Please wait for image to upload')
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);

      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  }

  const handleDeleteUser = async () => {
    setShowModal(false);

    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data))
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  return (
    <div className='profile'>
      <div className="profile-container">
        <form onSubmit={handleSubmit}>
          <input 
            type="file" 
            accept='image/*' 
            onChange={handleImageChange} 
            id="" 
            ref={filePickerRef}
            className='image-change'
          />
          <div className="img-box" onClick={() => filePickerRef.current.click()}>
            {
              imageFileUploadProgress && (
                <CircularProgressbar
                  value={imageFileUploadProgress || 0}
                  text={`${imageFileUploadProgress}%`}
                  strokeWidth={3}
                  styles={{
                    root: {
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      color: 'white',
                    },
                    path: {
                      stroke: `rgba(4, 122, 14, ${imageFileUploadProgress / 100})`,
                    },
                  }}
                />
              )
            }
            <img 
              src={imageFileUrl || currentUser.profilePicture} 
              alt="user" 
              accept='image/*'
              className={`${imageFileUploadProgress && imageFileUploadProgress < 100 && 'img-opacity'}`}
            />
          </div>
          {
            imageFileUploadError &&
            <p className='image-upload-error'>
              {imageFileUploadError}
            </p>
          }
          <input 
            type="text" 
            id='username'
            placeholder='username'
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
          <input 
            type="email" 
            id="email" 
            placeholder='Email'
            defaultValue={currentUser.email}
            onChange={handleChange}
          />
          <input 
            type="password" 
            id="password" 
            onChange={handleChange}
          />
          <button type="submit">Update</button>
        </form>
        <div className="profile-text">
          <p onClick={() => setShowModal(!showModal)}>Delete account</p>
          <p>Sign out</p>
        </div>
        {updateUserSuccess 
        && (<p>
              {updateUserSuccess}
          </p>)
        }
        {
          updateUserError 
          && (<p>
              {updateUserError}
            </p>)
        }
        {
          error &&
          (
            <p>{error}</p>
          )
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
                scale: 0
              }}
              animate={{
                scale: 1
              }}
              exit={{
                scale: 0
              }}
              className="modal-box">
              <FaTimes 
                className='close-modal'
                onClick={() => setShowModal(false)}
              />
              <p>Are you sure you want to delete your account?</p>
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
  );
};

export default DashboardProfile;