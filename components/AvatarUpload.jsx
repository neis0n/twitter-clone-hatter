"use client";

import { useRef } from "react";

export default function AvatarUpload({ avatarUrl, onUpload, isOwner }) {
  const fileRef = useRef(null);

  const handleClick = () => {
    if (isOwner) fileRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onUpload(file);
  };

  return (
    <div className="flex flex-col items-center">
      <img
        src={avatarUrl}
        className={`w-20 h-20 rounded-full object-cover border border-gray-700  
            ${isOwner ? "cursor-pointer hover:opacity-80" : ""}`}
        onClick={handleClick}
      />

      {isOwner && (
        <input
          type="file"
          ref={fileRef}
          className="hidden"
          accept="image/*"
          onChange={handleChange}
        />
      )}
    </div>
  );
}