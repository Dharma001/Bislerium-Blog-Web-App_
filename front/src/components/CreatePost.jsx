import React from "react";
const CreatePost = () => {
    return (
       <main className="mx-auto shadow-lg px-4 py-6 lg:w-4/5">
        <section className="create">
            <div className="top-heading flex justify-between">
                <h1 className="font-bold text-3xl mb-4">Create post</h1>
            
            </div>
            {/* <div>
            <select id="category" class="w-fit p-2 border border-gray-700 rounded-md text-white bg-gray-800">
                <option value="All">All</option><option value="Technology">Technology</option>
                <option value="Science">Science</option><option value="Art">Art</option>
                <option value="Health">Health</option></select>

            </div> */}
            <form>

            <div className="all space-y-10">
                <input id="title" name="title" type="text" autoFocus="on" className=" border-2 py-4 px-2 outline-none focus:ring-2 focus:ring-orange-500 p-2 w-full cursor-pointer rounded-3xl w-full" placeholder="Title*"></input>

                <textarea id="description" name="description" type="description" className="border-2 py-4 px-2 outline-none focus:ring-2 focus:ring-orange-500 p-2 w-full cursor-pointer rounded-3xl w-full" placeholder="Description*"></textarea>
            <div>
                <label className="font-semibold">Add your image</label>

                <input
              type="file"
              name="image"
            
              className="border border-gray-300 mt-1 rounded-md outline-none focus:ring-2 focus:ring-orange-500 p-2 w-full cursor-pointer"
            />
            </div>
            <div className="grid place-content-end">
            <button type="submit" className="bg-orange-500 text-white font-thin  tracking-wider hover:bg-orange-600 px-2 py-2 w-20 rounded-lg">Post</button>
            </div>
            </div>
            </form>

        </section>
       </main>
    );
  };
  
  export default CreatePost;