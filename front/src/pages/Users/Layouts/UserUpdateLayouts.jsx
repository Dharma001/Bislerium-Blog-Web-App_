import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../../Auths/userAuth';
import Cookies from 'js-cookie';
import { Link, Outlet, useLocation } from 'react-router-dom';

function UserUpdateLayouts() {
    const [userData, setUserData] = useState(null);

    const userId = Cookies.get('userId');
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await fetchWithAuth('get', `Profile/${userId}`);
                setUserData(userResponse.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };
        
        if (userId) {
            fetchUserData();
        }
    }, [userId]);
    return (
        <>
            <div className="flex ml-[20%] my-6  items-center space-x-4">
            <img src="https://cdn.discordapp.com/attachments/1217051055301328896/1235834773969174538/ads.png?ex=6635d052&is=66347ed2&hm=99c09d7825cfee1d000b3e77157d6dfdcfd5b84b86bb1cba9edc0606fa5fecf2&" alt="" className=" w-20 shadow-2xl rounded-full" />
            <div>
            <p className='text-xl font-semibold tracking-wider'>{userData ? `${userData.firstName} ${userData.lastName}` : ''}</p>
                <p className='text-gray-600 text-sm'>U/IllustratorOK6208</p>
            </div>
            <div>
                
            </div>
            
            </div>
            <div>
            <ul className="flex ml-[20%] w-4/5 mx-auto space-x-6  mb-4"> 
                        <li className="py-2  mr-2"> 
                            <a href="/history/allUserBlogs" className="text-gray-700 tracking-wider font-black  rounded-full hover:border-4 px-2 py-2 hover:bg-gray-200">
                                Posts
                            </a>
                        </li>
                        <li className="py-2  mr-2"> 
                            <a href="/history/postHistory" className="text-gray-700 tracking-wider font-black  rounded-2xl px-2 py-2 hover:border-4 hover:bg-gray-200">
                                PostHistory
                            </a>
                        </li>
                        <li className="py-2   mr-2"> 
                            <a href="/history/CommentHistory" className="text-gray-700 tracking-wider font-black  rounded-full hover:border-4 px-2 py-2 hover:bg-gray-200">
                                CommentHistory
                            </a>
                        </li>
                        <li className="py-2  mr-2"> 
                            <a href="#" className="text-gray-700 tracking-wider font-black  rounded-full hover:border-4 px-2 py-2 hover:bg-gray-200">
                                Saved
                            </a>
                        </li>
                        <li className="py-2   mr-2"> 
                            <a href="#" className="text-gray-700 tracking-wider font-black  rounded-full hover:border-4 px-2 py-2 hover:bg-gray-200">
                                Hidden
                            </a>
                        </li>
                        <li className="py-2  mr-2"> 
                            <a href="#" className="text-gray-700 tracking-wider font-black  rounded-full hover:border-4 px-2 py-2 hover:bg-gray-200">
                                Upvoted
                            </a>
                        </li>
                        <li className="py-2 mr-2"> 
                            <a href="#" className="text-gray-700 tracking-wider font-black  rounded-full hover:border-4 px-2 py-2 hover:bg-gray-200">
                                Downvoted
                            </a>
                        </li>

                    </ul>
                    <button className="ml-[20%] border-2 border-gray-400  px-2 py-1 rounded-3xl">
                      <a
                        href="CreateBlogProfile"
                        className="text-gray-800 flex justify-center items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.5rem"
                          className="mr-1"
                         
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill="currentColor"
                            d="M8 2.5a.5.5 0 0 0-1 0V7H2.5a.5.5 0 0 0 0 1H7v4.5a.5.5 0 0 0 1 0V8h4.5a.5.5 0 0 0 0-1H8z"
                          />
                        </svg>
                        <p className="text-sm tracking-wide font-semibold">Create a Post</p>
                      </a>
                    </button>
            </div >
            <hr className='mt-4'/>
            <div className="grid grid-cols-12 gap-2 ">
                <div className="col-span-10">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default UserUpdateLayouts
