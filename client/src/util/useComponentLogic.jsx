import { useState, useEffect } from 'react';
import { useLazySelectedGifQuery } from '../Store/GIFApi';
import useDebounce from './Debounce';
import { useGetAllPostsQuery } from '../Store/AllPosts';
import { usePostCommentMutation } from '../Store/ProfileApi';
import { useFollowingUsersPostQuery } from '../Store/UsersPostApi';

const useComponentLogic = () => {
  const [commentText, setCommentText] = useState('');
  //
  const [showGrid, setShowGrid] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchInputTerm, setSearchInputTerm] = useState('');
  const [isShowingOriginal, setIsShowingOriginal] = useState(true);
  const [originalCategories, setOriginalCategories] = useState([]);
  const [isSearchResult, setIsSearchResult] = useState(false);

  const debouncedQuery = useDebounce(searchInputTerm, 1000);

  const { refetch: refetchh } = useFollowingUsersPostQuery(null, {});

  const { refetch } = useGetAllPostsQuery();
  const [selectedGif] = useLazySelectedGifQuery();
  const [createComment] = usePostCommentMutation();

  // <-------- -------- * ---------------- >

  useEffect(() => {
    let gData = async () => {
      let mData = await fetch(
        `https://tenor.googleapis.com/v2/categories?key=${
          import.meta.env.VITE_GIF_API_KEY
        }&client_key=${import.meta.env.VITE_GIF_API_CLIENT_KEY}`
      );

      let res = await mData.json();
      setCategories(res?.tags);
      setOriginalCategories(res?.tags);
    };

    gData();
  }, []);

  // search gif via input box
  useEffect(() => {
    let search = async () => {
      let sData = await fetch(
        `https://tenor.googleapis.com/v2/search?q=${searchInputTerm}&key=${
          import.meta.env.VITE_GIF_API_KEY
        }&client_key=${import.meta.env.VITE_GIF_API_CLIENT_KEY}&limit=${12}`
      );

      let res = await sData.json();

      setIsSearchResult(true);
      setCategories(res?.results);
    };

    if (debouncedQuery) {
      search();
    }
  }, [debouncedQuery]);

  // ************************************************************************************************
  // 🚀 Helper Functions 🚀
  // ************************************************************************************************

  const handleGIFButtonClick = async () => {
    setShowGrid((showGrid) => !showGrid);
  };

  const commentGif = async (e) => {
    const newTerm = e.target.alt || e.target.getAttribute('aria-label');

    selectedGif(newTerm).then(({ data }) => {
      setSearchInputTerm(newTerm);
      setIsSearchResult(true);
      setCategories(data.results);
    });
  };

  const handleGoBack = () => {
    setIsSearchResult(false);
    setIsShowingOriginal(false);

    if (isShowingOriginal) {
      setSearchInputTerm('');
      setCategories(originalCategories);
    } else {
      setIsShowingOriginal(true);
      setCategories(originalCategories);
    }
  };

  const handleChange = async (e) => {
    const newTerm = e.target.value;

    if (e.target.value === '') {
      setIsSearchResult(false);
      setIsShowingOriginal(false);
      setCategories(originalCategories);

      setSearchInputTerm('');
      return;
    }

    setSearchInputTerm(newTerm);
  };

  // get link of gif on click and comment it
  const getGifSrc = async (e, postId) => {
    if (!isSearchResult) return;

    let gifLink = e.target.src;

    isSearchResult && (await createComment({ gifLink, postId }));
    // setIsShowingOriginal(true);
    setCategories(originalCategories);
    setSearchInputTerm('');
    setIsSearchResult(false);

    setShowGrid(!showGrid);
    refetchh();
    refetch();
  };

  // Return the state variables and functions you want to expose
  return {
    commentText,
    setCommentText,
    showGrid,
    setShowGrid,
    categories,
    setCategories,
    searchInputTerm,
    setSearchInputTerm,
    isShowingOriginal,
    setIsShowingOriginal,
    originalCategories,
    setOriginalCategories,
    isSearchResult,
    setIsSearchResult,
    handleGIFButtonClick,
    commentGif,
    handleGoBack,
    handleChange,
    getGifSrc,
  };
};

export default useComponentLogic;
