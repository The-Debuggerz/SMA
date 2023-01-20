import { useState } from 'react';

export let useProfileImageUpload = (uploadMutation) => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [profileBox, setProfileBox] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewUrl(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    // upload the image to server
    const imageData = new FormData();
    imageData.append('image', image);

    await uploadMutation(imageData);

    setImage(null);
    setProfileBox((current) => !current);
  };

  const profileImageBox = () => {
    setProfileBox((current) => !current);
  };

  return {
    handleImageChange,
    handleUpload,
    image,
    previewUrl,
    profileBox,
    profileImageBox,
  };
};

export let usePostUpload = (uploadMutation) => {
  const [inputText, setInputText] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [postImagePreview, setPostImagePreview] = useState(null);
  const [inputBox, setInputBox] = useState(false);

  const handlePostImageChange = (event) => {
    const file = event.target.files[0];
    setPostImage(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      setPostImagePreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  let makePost = async (e) => {
    e.preventDefault();

    if (!inputText && !postImage) return;

    const imageData = new FormData();
    imageData.append('text', inputText);
    imageData.append('image', postImage);

    await uploadMutation(imageData);

    setInputText('');
    setPostImage(null);
    setPostImagePreview(null);
    setInputBox((current) => !current);
  };

  // Pop up model box for create post
  const createPostBox = () => {
    setInputBox((current) => !current);
  };

  return {
    handlePostImageChange,
    inputText,
    setInputText,
    makePost,
    postImage,
    postImagePreview,
    createPostBox,
    inputBox,
  };
};
