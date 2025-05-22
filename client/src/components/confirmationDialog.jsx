import React from 'react';

const ConfirmationDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 mr-2 bg-while border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
