import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../App.css";
import VideoModal from "./VideoModal.jsx";
import LoaderModal from "./LoaderModal";


// https://watchapi.whatever.social/search?q=atifaslam&filter=music_songs

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // function to handle the click event
  const handleVideoClick = (ID) => {
    setIsLoading(true);

    try {
      axios
        .get(`https://pipedapi.kavin.rocks/streams/${ID}`)
        .then((videoclickresponse) => {
          console.log(videoclickresponse.data.hls);
          setVideoUrl(videoclickresponse.data.hls);
          //storing response in trending variable/state
          setIsLoading(false);
        });
    } catch (error) {
      console.log({ error });
    }


    setShowModal(true);
  };


  // funtion to fetch search suggestion on realtime user input
  function handleSearchQueryChange(event) {
    try {
      setSearchQuery(event.target.value);
      if (event.target.value.trim() === "") {
        //if input/searching section is empty then set suggestions to empty too.
        setSearchSuggestions([]);
        return;
      }

      // Call API for Search Suggestions
      axios
        .get(
          `https://pipedapi.kavin.rocks/suggestions?query=${event.target.value}`
        )
        .then((res) => {
          console.log(res.data);
          setSearchSuggestions(res.data);
        });
    } catch (error) {
      console.log({ error });
    }
  }

  // function to Fetch Actual search results
  function handleSearchSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      // call API or perform search here
      axios
        .get(
          `https://pipedapi.kavin.rocks/search?q=${searchQuery}&filter=videos&filter=music_songs&filter=music_videos`
        )
        .then((res) => {
          console.log(res.data);

          setSearchResults(res.data.items);
          setNextPage(res.data.nextpage);
          setIsLoading(false);
        });
    } catch (error) {
      console.log({ error });
    }
  }

  // Load More Results
  function handleLoadMore(event) {
    event.preventDefault();

    try {
      // call API or perform search here
      axios
        .get(
          `https://pipedapi.kavin.rocks/nextpage/search?nextpage=${encodeURIComponent(nextPage)}&q=${encodeURIComponent(searchQuery)}&filter=videos&filter=music_songs&filter=music_videos`
        )
        .then((res) => {
          // console.log(res.data.items);
          setSearchResults([...searchResults, ...res.data.items]);
          console.log(searchResults);
          setCurrentPage(currentPage + 1);
        });
    } catch (error) {
      console.log({ error });
    }
  }

  // clicking on search suggestions will fill the input tag
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSearchSuggestions([]);
    handleSearchSubmit({ preventDefault: () => { }, target: {} })
    // above line simulate a click event on a button or a submit event on a form, which would normally trigger the handleSearchSubmit() function.
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.9 }}
        className="bg-custom"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">

            <div className="cursor-pointer flex-shrink-0 flex items-center mr-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3820/3820291.png"
                alt="Logo"
                className="block h-10 w-auto logo" // Add custom class `logo` and increase height
              />
              <span className="ml-2 text-white font-bold text-2xl sm:flex hidden custom-text-color">
                ReacTube
              </span>

            </div>


            <div className="relative">
              <form
                onSubmit={handleSearchSubmit}
                className="flex w-full max-w-sm space-x-3"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchQueryChange}
                  placeholder="Search"
                  className="px-4 py-2 w-full text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
                <button type="submit" className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring focus:border-purple-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="#fff">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.5 15.5L20 20M10 17a7 7 0 1 1 4.24-12.24 7 7 0 0 1-4.24 12.24z" />
                  </svg>
                </button>



              </form>
              <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg z-10 top-10">
                {searchSuggestions.map((suggestion, index) => (
                  <div
                    key={`suggestion-${index}`}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>

            {/* Results Modal */}

            {searchResults.length > 0 && (
              <div className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75 dark:bg-gray-900 dark:opacity-50"></div>
                  </div>
                  <div className="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl sm:align-middle sm:max-w-lg max-w-3xl">
                    <button
                      className="absolute top-0 right-0 m-4 font-bold text-xl text-gray-500 hover:text-gray-200 dark:text-gray-200 dark:hover:text-gray-500"
                      onClick={() => {
                        setSearchResults([]);
                        setCurrentPage(1);
                      }}
                    >
                      X
                    </button>
                    <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Search Results</h2>
                    <ul className="max-h-60vh overflow-y-auto">
                      {searchResults.map((result, index) => {

                        const videoUrl = result.url && result.url.split("v=").pop();

                        return (

                          <li key={`result-${index}`} className="mb-2">
                            <div className="flex items-center space-x-4">
                              {result.thumbnail && (
                                <div className="flex-shrink-0 w-4/12">
                                  <img
                                    src={result.thumbnail}
                                    alt="Thumbnail"
                                    className="w-full h-auto object-cover rounded cursor-pointer"
                                    onClick={() => { handleVideoClick(videoUrl) }}
                                  />
                                </div>
                              )}
                              <div className="flex-grow w-8/12">
                                <a
                                  title="Title"
                                  rel="noreferrer"
                                  className="title cursor-pointer text-base font-semibold text-blue-600 hover:underline text-black dark:text-white hover:text-purple-400 !important"
                                  onClick={() => { handleVideoClick(videoUrl) }}
                                >
                                  {result.title}
                                </a>
                                <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                                  <div className="flex-shrink-0 w-6 h-6">
                                    <img
                                      src={result.uploaderAvatar}
                                      alt="Uploader"
                                      className="w-full h-auto object-cover rounded-full cursor-pointer"
                                    />
                                  </div>
                                  <span>{result.uploaderName}</span>
                                </div>
                              </div>
                            </div>

                            <hr className="my-2 border-gray-300 dark:border-gray-600" />
                          </li>


                        )
                      })}
                    </ul>
                    <button
                      className="w-full py-2 text-white bg-purple-500 rounded mt-4 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-800"
                      onClick={handleLoadMore}
                    >
                      Load More
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </motion.nav>

      {/* video modal component */}
      {showModal && (
        <VideoModal showModal={showModal} setShowModal={setShowModal} videoUrl={videoUrl} />
      )}

      {/* Loader modal component */}
      {isLoading && <LoaderModal />} {/* render the Loader component in a modal */}
    </>
  );
};

export default Navbar;
