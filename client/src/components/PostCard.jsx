import React, { useState, useContext } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Heart, MessageCircle, X } from "lucide-react";
import Modal from "./Modal";
import axios from "axios";
import { AuthContext } from "../AuthContext";

dayjs.extend(relativeTime);

const PostCard = ({ post: initialPost, api }) => {
  const { authToken } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [post, setPost] = useState(initialPost);
  const [newComment, setNewComment] = useState(""); // Track new comment input

  const openModal = async () => {
    setIsModalOpen(true);
    try {
      const response = await axios.get(
        `${api}/user/getPostbyId/${initialPost._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching post with comments:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      try {
        const response = await axios.post(
          `${api}/user/createComment/${post._id}`, // Sending postId
          { content: newComment }, // The comment content
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`, // Pass the authToken for authentication
            },
          }
        );

        // Once the comment is added, fetch the updated post with comments
        const updatedPost = await axios.get(
          `${api}/user/getPostbyId/${post._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        // Update the post state with the latest data
        setPost(updatedPost.data);
        setNewComment(""); // Clear the input field after submitting
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

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
          <Heart
            size={18}
            className="text-gray-600 hover:text-red-500 cursor-pointer"
          />
          <div
            className="flex items-center space-x-1 cursor-pointer"
            onClick={openModal}
          >
            <MessageCircle
              size={18}
              className="text-gray-600 hover:text-blue-500"
            />
            <span>{post.comments?.length || 0} Comments</span>
          </div>
        </div>
      </div>

      {/* Modal for Comments */}
      {isModalOpen && (
        <div className="fixed top-3 right-0 bottom-0 w-1/3 h-[600px] bg-white shadow-lg z-50 rounded-lg">
          <div className="p-4 flex justify-between items-center">
            <h3 className="font-bold text-blue-900 text-lg">Comments</h3>
            <button onClick={closeModal}>
              <X size={24} className="text-gray-500 hover:text-black" />
            </button>
          </div>

          {/* Comments List */}
          <div className="space-y-4 overflow-y-scroll p-4 h-96">
            {post.comments?.length === 0 ? (
              <p>No comments yet</p>
            ) : (
              post.comments.map((comment) => (
                <div
                  key={comment._id}
                  className="flex items-start space-x-3 border border-gray-200 rounded-md p-4"
                >
                  <img
                    className="h-10 w-10 rounded-full"
                    src={
                      comment.author?.photo
                        ? `${api}/uploads/${comment.author.photo}`
                        : "/default-avatar.png"
                    }
                    alt="Commenter profile"
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {comment.author?.name || "Unknown User"}
                    </p>
                    <p className="text-gray-700 text-sm">{comment.content}</p>
                    <div className="flex items-center mt-2 text-xs text-gray-500 space-x-3 ">
                      <span>{dayjs(comment.createdAt).fromNow()}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Write a Comment Section */}
          <div className="p-4 border-t">
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Write a comment..."
              className="w-full p-2 border rounded-lg resize-none"
            />
            <button
              onClick={handleCommentSubmit}
              className="w-full mt-2 bg-green-700 text-white py-2 rounded-lg hover:bg-green-600"
            >
              Post Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
