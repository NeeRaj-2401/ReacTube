import React, { useState } from "react";
import "../App.css";
import VideoModal from "./VideoModal.jsx";
import LoaderModal from "./LoaderModal";
import SearchResults from "./SearchResults";

const Navbar = ({baseUrl}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [nextPage, setNextPage] = useState(1); // for load more, hence to store nextpage url fetched from API

  const [showModal, setShowModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  // funtion to fetch search suggestion on realtime user input
  function handleSearchQueryChange(event) {
      setSearchQuery(event.target.value);
      if (event.target.value.trim() === "") {
        //if input/searching section is empty then set suggestions to empty too.
        setSearchSuggestions([]);
        return;
      }

      // Call API for Search Suggestions
      fetch(
          `${baseUrl}/suggestions?query=${event.target.value}`
        )
        .then(response => response.json())
        .then((data) => {
          //console.log(data);
          setSearchSuggestions(data);
        })
        .catch((error) => {
          console.log({error});
        });
  }

  // function to Fetch Actual search results
  function handleSearchSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

      // call API or perform search here
  
      fetch(
          `${baseUrl}/search?q=${searchQuery}&filter=videos`
        )
        .then(response => response.json())
        .then((data) => {
          //console.log(data);
          console.log(data.items);
          setSearchResults(data.items);
          setNextPage(data.nextpage);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log({ error })
        });
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
      <div
        className="bg-custom"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">

            <a href="#" className="cursor-pointer flex-shrink-0 flex items-center mr-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3820/3820291.png"
                alt="Logo"
                className="block h-10 w-auto logo" // Add custom class `logo` and increase height
              />
              <span className="ml-2 text-white font-bold text-2xl sm:flex hidden custom-text-color">
                ReacTube
              </span>

            </a>


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

            {searchResults.length > 0 && <SearchResults setShowModal={setShowModal} setIsLoading={setIsLoading} setVideoUrl={setVideoUrl} searchResults={searchResults} setSearchResults={setSearchResults} searchQuery={searchQuery} nextPage={nextPage} baseUrl={baseUrl}/>}

          </div>
        </div>
      </div>

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
