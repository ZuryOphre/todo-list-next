import React from "react";
import { BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <footer
      className="bg-gray-800 text-gray-400 fixed bottom-0 w-full h-16"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="max-w-3xl mx-auto py-4 px-5 flex flex-col items-center justify-between md:flex-row">
        <p className="text-sm text-xs text-center md:text-left">
          Developed by Zury Martinez with Next.js. All rights reserved. &copy;{" "}
          {new Date().getFullYear()}
        </p>
        <div className="social-media mt-4 md:mt-0">
          <a
            href="https://github.com/ZuryOphre"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-gray-200"
          >
            <BsGithub size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;