import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../../Auths/apiAuth";
import { Link } from "react-router-dom";

const Index = () => {
  const [roles, setRoles] = useState([]);
  const [filteorangeroles, setFilteorangeroles] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rolesPerPage] = useState(5); 


  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchroles = async () => {
      try {
        const response = await fetchWithAuth("get", "Roles");
        setRoles(response.data);
        setFilteorangeroles(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchroles();
  }, []);

  useEffect(() => {
    const filteorangeResults = roles.filter(
      (role) =>
        (role.name &&
          role.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteorangeroles(filteorangeResults);
  }, [searchQuery, roles]);

  const handleDeleterole = async (roleId) => {
    try {
      await fetchWithAuth("delete", `Roles/${roleId}`);
      setRoles(roles.filter((role) => role.id !== roleId));
      setFilteorangeroles(filteorangeroles.filter((role) => role.id !== roleId));
      toggleModal();
    } catch (error) {
      setError(error.message);
    }
  };

  const indexOfLastrole = currentPage * rolesPerPage;
  const indexOfFirstrole = indexOfLastrole - rolesPerPage;
  const currentroles = filteorangeroles.slice(indexOfFirstrole, indexOfLastrole);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl flex items-center font-semibold mb-[2rem]">
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2rem"
          height="2rem"
          className="mr-3"
          viewBox="0 0 640 512"
        >
          <path
            fill="currentColor"
            d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64m448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64m32 32h-64c-17.6 0-33.5 7.1-45.1 18.6c40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64m-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32S208 82.1 208 144s50.1 112 112 112m76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2m-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4"
          />
        </svg>{" "}
        All Roles
      </h2>
      <div className="float-right">
        <Link
          to="/admin/createrole"
          className="bg-gradient-to-br from-orange-500 to-yellow-500 hover:bg-slate-600 text-white px-7 py-2 rounded-sm text-md transition duration-300 ease-in-out flex items-center"
        >
          <i className="fa-solid fa-plus mr-2"></i> Create role
        </Link>
      </div>
      <div className="my-4 w-[40%] border flex justify-center items-center border-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.7rem"
          height="1.7rem"
          className=" ml-4 mr-2"
          viewBox="0 0 50 50"
        >
          <path
            fill="currentColor"
            d="M23 36c-7.2 0-13-5.8-13-13s5.8-13 13-13s13 5.8 13 13s-5.8 13-13 13m0-24c-6.1 0-11 4.9-11 11s4.9 11 11 11s11-4.9 11-11s-4.9-11-11-11"
          />
          <path
            fill="currentColor"
            d="m32.682 31.267l8.98 8.98l-1.414 1.414l-8.98-8.98z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-none rounded-sm px-3 py-3 w-full focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="">
        <hr className="my-4" />
        {error ? (
          <p className="text-orange-500">Error: {error}</p>
        ) : currentroles.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 divide-y divide-gray-200">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-4 text-white py-3 text-[.7rem] xl:text-[.9rem] font-semibold uppercase tracking-wider">
                    SN
                  </th>
                  <th className="px-4 text-white py-3 text-[.7rem] xl:text-[.9rem] font-semibold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 text-white py-3 text-[.7rem] xl:text-[.9rem] font-semibold uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 text-white py-3 text-[.7rem] xl:text-[.9rem] font-semibold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentroles.map((role, index) => (
                  <tr
                    key={role.id}
                    className={index % 2 === 0 ? "bg-orange-50" : "bg-white"}
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-md text-center">
                      {(currentPage - 1) * rolesPerPage + index + 1}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-md text-center">
                      {role.name}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-md text-center">
                      {role.description}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-md mt-6 text-center grid grid-cols-2 gap-4">
                    <Link to={`/admin/editRole/${role.id}`}>
                      <button className="bg-green-500 hover:bg-green-700 justify-center text-white px-3 py-2 rounded-sm transition duration-300 ease-in-out flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 1792 1408"
                          >
                            <path
                              fill="currentColor"
                              d="m888 1056l116-116l-152-152l-116 116v56h96v96zm440-720q-16-16-33 1L945 687q-17 17-1 33t33-1l350-350q17-17 1-33m80 594v190q0 119-84.5 203.5T1120 1408H288q-119 0-203.5-84.5T0 1120V288Q0 169 84.5 84.5T288 0h832q63 0 117 25q15 7 18 23q3 17-9 29l-49 49q-14 14-32 8q-23-6-45-6H288q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113V994q0-13 9-22l64-64q15-15 35-7t20 29m-96-738l288 288l-672 672H640V864zm444 132l-92 92l-288-288l92-92q28-28 68-28t68 28l152 152q28 28 28 68t-28 68"/></svg>
                      </button>
                      </Link>
                      <button
                        onClick={toggleModal}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-sm transition duration-300 ease-in-out flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 2048 2048"
                        >
                          <path
                            fill="currentColor"
                            d="M1792 384h-128v1472q0 40-15 75t-41 61t-61 41t-75 15H448q-40 0-75-15t-61-41t-41-61t-15-75V384H128V256h512V128q0-27 10-50t27-40t41-28t50-10h384q27 0 50 10t40 27t28 41t10 50v128h512zM768 256h384V128H768zm768 128H384v1472q0 26 19 45t45 19h1024q26 0 45-19t19-45zM768 1664H640V640h128zm256 0H896V640h128zm256 0h-128V640h128z"
                          />
                        </svg>
                      </button>
                    </td>
                    <td>
                      {isOpen && (
                        <div className="fixed z-10 inset-0 overflow-y-auto ">
                          <div className="flex items-center justify-center min-h-screen bg-slate-900 opacity-20">
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
                                  onClick={() => handleDeleterole(role.id)}
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center py-4">
  <ul className="pagination flex gap-2">
    <li className="page-item">
      <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="page-link bg-orange-500 text-white px-4 py-2 rounded-sm">
        Previous
      </button>
    </li>
    {Array.from({ length: Math.ceil(filteorangeroles.length / rolesPerPage) }, (_, i) => (
      <li key={i} className="page-item">
        <button onClick={() => paginate(i + 1)} className={`page-link ${currentPage === i + 1 ? 'bg-orange-500 text-white' : 'bg-orange-200 text-white'} px-4 py-2 rounded-sm`}>
          {i + 1}
        </button>
      </li>
    ))}
    <li className="page-item">
      <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteorangeroles.length / rolesPerPage)} className="page-link bg-orange-500 text-white px-4 py-2 rounded-sm">
        Next
      </button>
    </li>
  </ul>
</div>

          </div>
        ) : (
          <p className="text-center">
            No Role found with the provided search criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default Index;
