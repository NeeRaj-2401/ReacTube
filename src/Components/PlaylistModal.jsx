import React, { useState } from 'react'

function PlaylistModal({ setIsPlaylistClicked, setShowModal, setIsLoading, setVideoUrl, playlistVideoResults, setPlaylistVideoResults, playlistInfo, setPlaylistInfo, playlistID, baseUrl }) {
    const [loadingMore, setLoadingMore] = useState(false);
    const [nextPage, setNextPage] = useState(playlistInfo.nextpage)

    // function to handle the click event
    const handleVideoClick = (ID) => {
        setIsLoading(true);
            fetch(`${baseUrl}/streams/${ID}`)
                .then(response => response.json())
                .then((data) => {
                    //console.log(data.hls);
                    setVideoUrl(data.hls); //storing response in trending variable/state
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log({ error })
                });
        setShowModal(true);
    };

    // load more
    function handleLoadMore(event) {
        event.preventDefault();
        setLoadingMore(true); // Set loading to true when the button is clicked



            // call API or perform search here
            fetch(
                    `${baseUrl}/nextpage/playlists/${playlistID}?nextpage=${encodeURIComponent(nextPage)}`
                )
                .then(response => response.json())
                .then((data) => {
                    console.log(data);
                    setPlaylistVideoResults((prevResults) => [
                        ...prevResults,
                        ...data.relatedStreams,
                    ]);
                    //console.log(searchResults);
                    setLoadingMore(false); // Set loading back to false after the results are loaded

                    setNextPage(data.nextpage || false);
                })
                .catch((error) => {
                    console.log({ error });
                });
    }


    return (
        <>
            <div className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-100 dark:bg-gray-900 dark:opacity-50"></div>
                    </div>
                    <div className="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl sm:align-middle sm:max-w-lg max-w-3xl border border-white border-opacity-25">
                        <button
                            className="absolute top-0 right-0 m-4 font-bold text-xl text-gray-500 hover:text-gray-200 dark:text-gray-200 dark:hover:text-gray-500"
                            onClick={() => {
                                setPlaylistVideoResults([]);
                                setPlaylistInfo([]);
                                setIsPlaylistClicked(false);
                            }}
                        >
                            X
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white title"> {playlistInfo.name} </h2>

                        <ul className="max-h-60vh overflow-y-auto">
                            {playlistVideoResults.map((result, index) => {

                                const videoUrl = result.url && result.url.split("v=").pop();

                                return (

                                    <li key={`result-${index}`} className="mb-2">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0 w-4/12">
                                                <img
                                                    src={result.thumbnail}
                                                    alt="Thumbnail"
                                                    className="w-full h-auto object-cover rounded cursor-pointer"
                                                    onClick={() => { handleVideoClick(videoUrl) }}
                                                />
                                            </div>
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
                                                    {result.uploaderAvatar && (<div className="flex-shrink-0 w-6 h-6">
                                                        <img
                                                            src={result.uploaderAvatar}
                                                            alt="Uploader"
                                                            className="w-full h-auto object-cover rounded-full cursor-pointer"
                                                        />
                                                    </div>)}
                                                    <span>{result.uploaderName}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <hr className="my-2 border-gray-300 dark:border-gray-600" />
                                    </li>
                                )

                            })}
                        </ul>

                        {nextPage && (

                            <button className="w-full py-2 text-white bg-purple-500 rounded mt-4 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-800"
                                onClick={handleLoadMore}
                            >
                                {loadingMore ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 016.05 13H4.007c.11.626.284 1.239.528 1.837zm3.472-3.471A3.978 3.978 0 018 12c0-.708-.191-1.373-.522-1.958l-1.421 1.422zm4.722-4.721l-1.422.522A3.978 3.978 0 0112 8c0 .708.191 1.373.522 1.958zm3.472 3.472A7.962 7.962 0 0117.95 13h-2.043a15.936 15.936 0 00-.526-1.837zm1.046 3.174A9.96 9.96 0 0122 12c0 2.146-.684 4.125-1.834 5.746l-1.416-1.416z"></path>
                                        </svg>
                                        <span>Loading...</span>
                                    </div>
                                ) : (
                                    <span>Load More</span>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlaylistModal
