import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchWithAuth } from '../../Auths/userAuth';
import Cookies from 'js-cookie';

function DeleteAccount({ setUsers, setFilteredUsers }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userId = Cookies.get('userId');
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDeleteUser = async () => {
    try {
      if (!userId) {
        throw new Error("User ID not found.");
      }
      
      await fetchWithAuth("delete", `Profile/${userId}`);
      toast.success("User Deleted Successfully");
      toggleModal();
    } catch (error) {
      setError(error.message);
      toast.error("Failed to delete user.");
    }
  };

  return (
    <div className="text-start">
      <h1 className="text-2xl font-bold mb-4">Confirmation: Delete Account</h1>

      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" className="fill-current text-red-600 inline-block mr-2">
        <path fill="currentColor" d="M12 7.25a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75M12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2"/>
        <path fill="currentColor" fillRule="evenodd" d="M8.294 4.476C9.366 3.115 10.502 2.25 12 2.25c1.498 0 2.634.865 3.706 2.226c1.054 1.34 2.17 3.32 3.6 5.855l.436.772c1.181 2.095 2.115 3.75 2.605 5.077c.5 1.358.62 2.59-.138 3.677c-.735 1.055-1.962 1.486-3.51 1.69c-1.541.203-3.615.203-6.274.203h-.85c-2.66 0-4.733 0-6.274-.203c-1.548-.204-2.775-.635-3.51-1.69c-.758-1.087-.639-2.32-.138-3.677c.49-1.328 1.424-2.982 2.605-5.077l.436-.772c1.429-2.535 2.546-4.516 3.6-5.855m1.179.928C8.499 6.641 7.437 8.52 5.965 11.13l-.364.645c-1.226 2.174-2.097 3.724-2.54 4.925c-.438 1.186-.378 1.814-.04 2.3c.361.516 1.038.87 2.476 1.06c1.432.188 3.406.19 6.14.19h.727c2.733 0 4.707-.002 6.14-.19c1.437-.19 2.114-.544 2.474-1.06c.339-.486.4-1.114-.038-2.3c-.444-1.201-1.315-2.751-2.541-4.925l-.364-.645c-1.472-2.61-2.534-4.489-3.508-5.726C13.562 4.18 12.813 3.75 12 3.75c-.813 0-1.562.429-2.527 1.654" clipRule="evenodd"/>
      </svg>

      <p className="text-lg font-bold my-4">Are you sure you want to delete your account? This action cannot be undone.</p>
      <p className="text-sm mb-4">By deleting your account, you will lose access to all your data and any associated services.</p>
      
      <p className="text-lg font-bold">Please consider the following:</p>
      <h3 className="text-lg my-4 list-disc list-inside">
        <p className="text-sm">1. Once deleted, your account information, including your profile, settings, and history, will be permanently removed from our system.</p>
        <p className="text-sm">2. You will no longer be able to log in or access any features tied to your account.</p>
      </h3>

      <p className="text-sm mb-4">If you're certain about deleting your account, please click the "Confirm Delete" button below.</p>
      
      <p className="text-sm">Are you sure you want to delete your account? (yes/no)</p><br></br>
      
      <button onClick={toggleModal} className="bg-white text-red-600 border border-red-600 py-2 px-4 rounded cursor-pointer hover:bg-red-600 hover:text-white" type="button">Confirm Delete</button>
      
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto ">
          <div className="flex items-center justify-center min-h-screen bg-slate-900 opacity-90">
            <div className="relative bg-white  p-12 rounded-sm max-w-lg mx-auto">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  Delete Confirmation
                </h2>
                <button
                  onClick={toggleModal}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none relative top-[-15px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.2rem"
                    height="1.2rem"
                    viewBox="0 0 15 15"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687L4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-4">
                <p>
                  Are you sure you want to delete this item?
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleDeleteUser}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mr-4 focus:outline-none"
                >
                  Delete
                </button>
                <button
                  onClick={toggleModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteAccount;
