'use client'

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {revalidatePath} from "next/cache";

export default function PhotoModal({ id, src, alt, onClose }) {
    const [comment, setComment] = useState("");
    const router= useRouter()
    // Handle comment submission
    const handleCommentSubmit = async () => {
        if (!comment.trim()) return;

        const response = await fetch('/api/comment-photo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ photoId: id, comment }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log("Comment updated:", data);
            setComment(""); // Reset comment input
            onClose();
            router.refresh();
        } else {
            console.error("Error:", data.message);
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
