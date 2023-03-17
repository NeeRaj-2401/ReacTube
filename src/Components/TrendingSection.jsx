import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Zoom from "react-reveal";
import VideoModal from "./VideoModal.jsx";
import LoaderModal from "./LoaderModal.jsx";
import "../App.css";

const TrendingSection = () => {
  const [trending, setTrending] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [region, setRegion] = useState("IN");
  const [isLoading, setIsLoading] = useState(false);

  // function to handle the click event
  const handleVideoClick = (ID) => {
    setIsLoading(true); // set isLoading to true when the video is clicked

    try {
      axios
        .get(`https://pipedapi.kavin.rocks/streams/${ID}`)
        .then((videoclickresponse) => {
          console.log(videoclickresponse.data.hls);
          setVideoUrl(videoclickresponse.data.hls);
          //storing response in trending variable/state
          setIsLoading(false); // set isLoading to false when the video is fetched successfully
        });
    } catch (error) {
      console.log({ error });
    }


    setShowModal(true);
  };

  // get api data on every reload only
  // api = 2d50d4fed70d41aebc7baa7acf8f2a0e
  useEffect(() => {
    try {
      axios
        .get(`https://pipedapi.kavin.rocks/trending?region=${region}`)
        .then((res) => {
          console.log(res.data);
          setTrending(res.data); //storing response in trending variable/state
        });
    } catch (error) {
      console.log({ error });
    }
  }, [region]);

  // function to handle region selection
  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  // list of countries for dropdown options
  const countries = [
    { code: "IN", name: "India" },
    { code: "US", name: "US" },
    // add more countries as needed
  ];

  // video views formating
  function formatNumber(number) {
    if (number < 1000) {
      return number;
    } else if (number >= 1000 && number < 1000000) {
      return (number / 1000).toFixed(1) + "k";
    } else if (number >= 1000000 && number < 1000000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else {
      return (number / 1000000000).toFixed(1) + "B";
    }
  }

  function handleUploadTimeFormat(response) {
    // Regular expression to extract number of hours or days
    const timeRegex = /(\d+) (hours|days|day) ago/;
    const timeMatch = response.match(timeRegex);

    if (timeMatch) {
      // Extracted number of time units (hours or days)
      const time = parseInt(timeMatch[1]);

      // Convert time to "some x H/D ago" format
      const timeUnit = timeMatch[2];
      let timeAgo;

      if (timeUnit === "hours") {
        timeAgo = `${time}h ago`;
      } else if (timeUnit === "days" || timeUnit === "day") {
        timeAgo = `${time}d ago`;
      }

      return timeAgo;
    }

  }

  return (
    < >

      <div className="bg-gray-800">
    
      {/* Main Component  */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.9 }}
        className="container mx-auto bg-gray-800 text-white dark w-full"
      >
        <h1 className="text-3xl font-bold py-4 px-4">
          Trendings in{" "}
          <select value={region} onChange={handleRegionChange} className="w-40 rounded-lg border bg-white bg-opacity-10">
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </h1>
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center relative ${showModal ? 'opacity-50 blur-sm' : ''}`}>

          {trending.map((val, index) => {

            const videoUrl = val.url && val.url.split("v=").pop();

            return (
              <>
                <Zoom>
                  <div
                    className="w-full rounded-lg border-2 border-gray-600 shadow-md"
                    key={`val-${index}`}
                  >
                    <a
                      // href={"https://youtube.com" + val.ID}
                      className="h-48 w-full object-cover object-center rounded-t-lg cursor-pointer"
                    // onClick={() => { handleVideoClick(videoUrl) }}

                    >
                      <img
                        src={val.thumbnail}
                        alt="img"
                        className="h-48 w-full object-cover object-center rounded-t-lg"
                        onClick={() => { handleVideoClick(videoUrl) }}
                      />
                    </a>

                    <div className="px-6 py-1">
                      <a
                        // href={"https://youtube.com" + val.ID}
                        className="font-semibold mb-2 cursor-pointer title text-sm"
                        onClick={() => { handleVideoClick(videoUrl) }}
                      >
                        #{index + 1} - {val.title}
                      </a>

                      <div className="flex items-center mb-1">
                        <a href={"https://youtube.com" + val.uploaderUrl}>
                          {" "}
                          <img
                            className="w-8 h-8 rounded-full mr-4 "
                            src={val.uploaderAvatar}
                            alt="C"
                          />
                        </a>
                        <div className="text-sm ml-2">
                          <a
                            href={"https://youtube.com" + val.uploaderUrl}
                            className="leading-none text-sm"
                          >
                            {val.uploaderName}
                          </a>
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-gray-400 text-sm">
                              {formatNumber(val.views)}{" "}
                            </p>{" "}
                            &nbsp; &#183; &nbsp;
                            <p className="text-gray-400 text-sm">
                              {handleUploadTimeFormat(val.uploadedDate)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Zoom>

              </>
            );

          })}

        </div>
      </motion.div>
      {/* video modal component */}
      {showModal && (
        <VideoModal showModal={showModal} setShowModal={setShowModal} videoUrl={videoUrl} />
      )}
      {/* Loader modal component */}
      {isLoading && <LoaderModal />} {/* render the Loader component in a modal */}

      </div>
    </>

  );
};

export default TrendingSection;
