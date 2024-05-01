import React from "react";
const Index = () => {

    
    return (
        <div className="container mx-auto px-5 overflow-hidden h-[90dvh] my-6">
            
          <button className='text-white w-24 md:w-fit mr-6 md:mr-auto text-[9px] md:text-[14px] font-semibold px-4 py-2 rounded-md hover:bg-green-800 border hover:border-green-800 bg-green-700 my-6'>
            {/* <Link to="/admin/createRole">Create</Link> */}
            Create
          </button>
          <h2 className="text-2xl font-bold mb-6">Role List</h2>
          {/* {error && <div className="text-red-500 mb-4">Error: {error}</div>} */}
          <div className="overflow-x-auto">
            <table className="table-auto min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              {/* <tbody>
                {roles.map((role, index) => (
                  <tr key={role.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{role.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{role.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{role.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/admin/editRole/${role.id}`} className="text-white bg-blue-500 px-3 py-2 rounded-md hover:bg-blue-300 mr-2">
                        <i className="fa-regular fa-pen-to-square"></i>
                      </Link>
                      <div className="text-white bg-blue-500 px-3 py-2 rounded-md hover:bg-blue-300 mr-2">
                        <i className="fa-regular fa-pen-to-square"></i>
                      </div>
                      <button
                        className="text-white bg-red-500 px-3 py-2 rounded-md hover:bg-red-300"
                        onClick={() => openDeleteConfirmation(role.id)}
                      >
                        <i className="fa-regular fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody> */}
                 <tbody>
                
                  <tr className= "bg-gray-50" >
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">1</td>
                    <td className="px-6 py-4 whitespace-nowrap">Sajit Sapkota</td>
                    <td className="px-6 py-4 whitespace-nowrap">sajit@gmail.com</td>
                    <td className="px-6 py-4 whitespace-nowrap">9876543210</td>
                    <td className="px-6 py-4 whitespace-nowrap">User</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* <Link to={`/admin/editRole/${role.id}`} className="text-white bg-blue-500 px-3 py-2 rounded-md hover:bg-blue-300 mr-2">
                        <i className="fa-regular fa-pen-to-square"></i>
                      </Link> */}
                      <div className="grid grid-cols-2 w-fit">
                      <div className="text-white text-center cursor-pointer bg-green-700 px-3 py-2 rounded-md hover:bg-green-800 mr-2">
                        <i className="">Edit</i>
                      </div>
                      <div className="text-white text-center cursor-pointer bg-red-700 px-3 py-2 rounded-md hover:bg-red-800 mr-2">
                        <i className="">Delete</i>
                      </div>
                      </div>
                      {/* <button
                        // className="text-white bg-red-500 px-3 py-2 rounded-md hover:bg-red-300"
                        // onClick={() => openDeleteConfirmation(role.id)}
                      >
                        <i className="">Delete</i>
                      </button> */}
                    </td>
                  </tr>
                
              </tbody>
            </table>
          </div>
          {/* <DeleteConfirmationModal
            isOpen={selectedRoleId !== null}
            onClose={closeDeleteConfirmation}
            onConfirm={handleDeleteRole}
          /> */}
        </div>
    );

}
export default Index;