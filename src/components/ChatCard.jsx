import React from "react";

export default function ChatCard({ image, title, buttonLabel = "Abrir", onClick }) {
  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow p-4 flex items-center gap-4">
      <img
        src={image}
        alt={title}
        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>
      <button
        onClick={onClick}
        className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
      >
        {buttonLabel}
      </button>
    </div>
  );
}