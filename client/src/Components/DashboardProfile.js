import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashboardProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(currentUser.profilePicture);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Check if the selected file is an image
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file));
        setImageFileUploadError(null); // Reset any previous errors
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
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downLoadURL) => {
          setImageFileUrl(downLoadURL);
          setImageFileUploadProgress(null); // Reset progress after successful upload
        });
      }
    );
  };

  return (
    <div className='profile'>
      <div className="profile-container">
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
        <form>
          <input 
            type="text" 
            id='username'
            placeholder='username'
            defaultValue={currentUser.username}
          />
          <input 
            type="email" 
            id="email" 
            placeholder='Email'
            defaultValue={currentUser.email}
          />
          <input 
            type="password" 
            id="password" 
          />
          <button type="submit">Update</button>
        </form>
        <div className="profile-text">
          <p>Delete account</p>
          <p>Sign out</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;