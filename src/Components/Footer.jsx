
import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-custom h-12 sm:h-20 flex items-center ">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex justify-between items-center w-full">
            <div className="flex items-center text-white">
                <a
                    href="https://github.com/NeeRaj-2401/ReacTube"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center cursor-pointer"
                >
                    <FaGithub className="text-white ml-2" size={26} />
                </a>
            </div>
            <span className="text-white sm:text-xl ml-2 cursor-pointer ">
                <a
                    href="https://github.com/NeeRaj-2401"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                >
                    NRJ YDV &copy;
                </a>
            </span>
            <div className="flex items-center justify-center">
                <a
                    href="https://github.com/TeamPiped"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center cursor-pointer"
                >
                    <img
                        src="https://avatars.githubusercontent.com/u/74294114?s=200&v=4"
                        alt=""
                        className="h-6 w-6 sm:h-12 sm:w-12 object-cover mr-4"
                    />
                </a>
            </div>
        </div>
    </footer>
    

    );
};

export default Footer;
