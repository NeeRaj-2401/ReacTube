import React from 'react'
import ReactPlayer from "react-player";
import "../App.css";

function VideoModal({ showModal, setShowModal, videoUrl }) {

    return (
        <>
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center ">
                    <div className="relative w-11/12 sm:w-8/12 md:w-7/12 lg:w-6/12 xl:w-5/12">

                        <ReactPlayer url={videoUrl} onError={(e) => console.log(e)} controls={true} width="100%" height="100%" playing={true} className="border border-white border-opacity-25" />

                        <button className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 cursor-pointer" onClick={() => setShowModal(false)}>X</button>

                    </div>
                </div>
            )}
        </>
    );
}
export default VideoModal;