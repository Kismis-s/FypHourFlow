import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

const ShareModal = ({ isOpen, onClose, shareUrl, title, quote, hashtag }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50">
      {/* Modal Content */}
      <div className="bg-white w-full md:w-1/2 rounded-t-lg p-6 animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Share this Group</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="flex justify-around">
          <FacebookShareButton url={shareUrl} quote={quote} hashtag={hashtag}>
            <FacebookIcon size={48} round />
          </FacebookShareButton>
          <EmailShareButton url={shareUrl} subject={title} body={quote}>
            <EmailIcon size={48} round />
          </EmailShareButton>
          <WhatsappShareButton url={shareUrl} title={title}>
            <WhatsappIcon size={48} round />
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
