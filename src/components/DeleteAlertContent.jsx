import React from 'react';

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-full">
      <p className="text-sm sm:text-base md:text-[15px] text-gray-800">{content}</p>
      <div className="flex justify-end mt-4 sm:mt-6">
        <button
          type="button"
          className="px-4 py-2 text-sm sm:text-base bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;
