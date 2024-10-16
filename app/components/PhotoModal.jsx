'use client';

import { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { updatePhotoComment } from '@/redux/photosSlice';

export default function PhotoModal({ id, src, alt, onClose }) {
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();

    // Handle comment submission
    const handleCommentSubmit = async () => {
        if (!comment.trim()) return;

        try {
            // Dispatch the Redux action to update the comment
            await dispatch(updatePhotoComment({ photoId: id, comment }));

            // If successful, reset the comment input and close the modal
            setComment(""); // Reset comment input
            onClose();
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-4 rounded-lg relative border border-gray-600 w-[80vw]">
                <button onClick={onClose} className="text-gray-300 hover:text-white mb-2">
                    Close
                </button>
                <div className="relative w-full h-[60vh] mb-4">
                    <Image
                        src={src}
                        alt={alt}
                        fill={true}
                        style={{ objectFit: "cover", objectPosition: "center" }}
                        className="rounded-lg"
                    />
                </div>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add or update comment..."
                        className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white"
                    />
                    <button
                        onClick={handleCommentSubmit}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg"
                    >
                        Comment
                    </button>
                </div>
            </div>
        </div>
    );
}
