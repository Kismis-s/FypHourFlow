import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";import { Heart, MessageCircle } from "lucide-react";

dayjs.extend(relativeTime);

const PostCard = ({ post, api }) => {
  return (
    <div className="bg-white rounded shadow-sm p-6">
      {/* Author Info */}
      <div className="flex items-start space-x-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={`${api}/uploads/${post.author.photo}`}
          alt="User profile"
        />
        <div>
          <h3 className="font-bold text-gray-800">{post.author.name}</h3>
          <p className="text-gray-500 text-sm">
            Posted {dayjs(post.createdAt).fromNow()}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <div className="mt-4">
        <p className="text-gray-700 mb-2">{post.content}</p>
      </div>

      {/* Like / Comment Buttons */}
      <div className="mt-6 flex items-center justify-between text-gray-500">
      <div className="flex items-center space-x-4 mt-2">
  <Heart size={18} className="text-gray-600 hover:text-red-500 cursor-pointer" />
  <MessageCircle size={18} className="text-gray-600 hover:text-blue-500 cursor-pointer" />
</div>
      </div>
    </div>
  );
};

export default PostCard;
