import React from "react";
import { Outlet } from "react-router-dom";
const PopularBlog = () => {
    return (
   <>
   <div className="flex   ">
    <div className="w-full">
        <p>UserName</p>
        <p>Title of the vlogs Title of the vlogs Title of the vlogs Title of the vlogs Title of the vlogs</p>
        <Outlet/>

    </div>
  <div>
    <img className="h-[82px] w-[82px] rounded-lg" src="https://cdn.discordapp.com/attachments/1217051055301328896/1236200574790275172/IMG-20240207-WA0033.jpg?ex=66372500&is=6635d380&hm=1757b0b31739a68a535100d731198e5e80b98352dc715fc30afa7a0ef3210afe&"/>
    </div>
   </div>
   </>
    );
  };
  
  export default PopularBlog;
  