
import React, { useState, useEffect } from "react";
import { fetchApi } from "../../Auths/apiWithoutAuth";

function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [topPosts, setTopPosts] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [topPostsByMonth, setTopPostsByMonth] = useState(null);
  const URL = "https://localhost:7189/";

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const response = await fetchApi("get", "Dashboard/counts");
        setDashboardData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    const fetchTOPDashboardData = async () => {
      setLoading(true);
      try {
        const response = await fetchApi(
          "get",
          "Dashboard/top-popular-posts-all-time"
        );
        setTopPosts(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTOPDashboardData();
  }, []);

  const handleYearChange = (event) => {
    setYear(parseInt(event.target.value));
  };

  const handleMonthChange = (event) => {
    setMonth(parseInt(event.target.value));
  };

  useEffect(() => {
    const fetchTopPostsByMonth = async () => {
      setLoading(true);
      try {
        const response = await fetchApi(
          "get",
          `Dashboard/top-popular-posts-by-month?year=${year}&month=${month}`
        );
        setTopPostsByMonth(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchTopPostsByMonth();
  }, [year, month]);
  return (
    <>
      <main className="main py-6 px-4 bg-white rounded-3xl">
        <div className="flex justify-between">
          <div className="head text-slate-800 tracking-wider font-extrabold text-3xl">
            Dashboard
          </div>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {dashboardData && (
          <section className="content-1 mt-6">
            <div className="content-list gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex justify-between bg-gray-100 px-6 items-center rounded-lg hover:scale-105 py-8">
                <div className="">
                  <p className="capitalize font-thin">Total Posts</p>
                  <h1 className="font-bold text-4xl tracking-wider">
                    {dashboardData.blogCounts}
                  </h1>
                </div>
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="3rem"
                    className="text-indigo-500"
                    height="3rem"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M19 5v14H5V5zm2-2H3v18h18zm-4 14H7v-1h10zm0-2H7v-1h10zm0-3H7V7h10z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex justify-between bg-gray-100 px-6 items-center rounded-lg hover:scale-105 py-8">
                <div className="">
                  <p className="capitalize font-thin">Total Upvotes</p>
                  <h1 className="font-bold text-4xl tracking-wider">
                    {dashboardData.blogUpVoteCounts}
                  </h1>
                </div>
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="3rem"
                    className="text-green-500"
                    height="3rem"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14"
                    />
                  </svg>{" "}
                </div>
              </div>
              <div className="flex justify-between bg-gray-100 px-6 items-center rounded-lg hover:scale-105 py-8">
                <div className="">
                  <p className="capitalize font-thin">Total Downvotes</p>
                  <h1 className="font-bold text-4xl tracking-wider">
                    {dashboardData.blogDownVoteCounts}
                  </h1>
                </div>
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="3rem"
                    className="text-red-500"
                    height="3rem"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059"
                    />
                  </svg>{" "}
                </div>
              </div>
              <div className="flex justify-between bg-gray-100 px-6 items-center rounded-lg hover:scale-105 py-8">
                <div className="">
                  <p className="capitalize font-thin">Total Comments</p>
                  <h1 className="font-bold text-4xl tracking-wider">
                    {dashboardData.commentCounts}
                  </h1>
                </div>
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="3rem"
                    className="text-orange-500"
                    height="3rem"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="currentColor"
                      d="M46 13c0 6.075-4.925 11-11 11s-11-4.925-11-11S28.925 2 35 2s11 4.925 11 11m-4.293-4.707a1 1 0 0 0-1.414 0L33 15.586l-3.293-3.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l8-8a1 1 0 0 0 0-1.414M35 26c3.493 0 6.664-1.378 9-3.62v6.37A7.25 7.25 0 0 1 36.75 36H26.397l-10.85 7.658C14.058 44.71 12 43.644 12 41.82V36h-.75A7.25 7.25 0 0 1 4 28.75v-15.5A7.25 7.25 0 0 1 11.25 6h12.794A12.94 12.94 0 0 0 22 13c0 7.18 5.82 13 13 13"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </section>
        )}
        <div className="flex justify-end space-x-8 mt-8">
            <div>
          <label htmlFor="year">Year: </label>
          <input
            type="number"
            id="year"
            className="border ml-2 w-fit  rounded-sm pl-4 py-1"
            name="year"
            value={year}
            onChange={handleYearChange}
          />
        </div>
        <div>
          <label htmlFor="month">Month:</label>
          <input
            type="number"
            id="month"
            className="border ml-2 w-fit  rounded-sm pl-4 py-1"
            name="month"
            value={month}
            onChange={handleMonthChange}
          />
        </div>
        </div>
        </main>

        {/* <div className="">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {topPosts && (
            <section className="content-1 mt-6">
              <div className="content-list gap-6 grid grid-cols-1 md:grid-cols-2">
                {topPosts.map((post, index) => (
                  <div
                    key={index}
                    className="flex justify-between bg-gray-100 px-6 items-center rounded-lg hover:scale-105 py-8"
                  >
                    <div>
                      <p className="capitalize font-thin">{post.title}</p>
                      <img
                        className="h-[82px] w-[82px] rounded-lg object-cover"
                        src={`${URL}${post.image}`}
                        alt="Blog Image"
                        title={post.title}
                      />
                      <h1 className="font-bold text-4xl tracking-wider">
                        {post.upvotes}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {topPostsByMonth && (
          <section className="content-1 mt-6">
            <div className="content-list gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {topPostsByMonth.map((post, index) => (
                <div
                  key={index}
                  className="flex justify-between bg-gray-100 px-6 items-center rounded-lg hover:scale-105 py-8"
                >
                  <div>
                    <p className="capitalize font-thin">{post.title}</p>
                    <img
                      className="h-[82px] w-[82px] rounded-lg object-cover"
                      src={`${URL}${post.image}`}
                      alt="Blog Image"
                      title={post.title}
                    />

                    <h1 className="font-bold text-4xl tracking-wider">
                      {post.upvotes}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </section> */}
  <main className="main py-6 px-4 w-full bg-white rounded-3xl">
  <section>
    <div className="grid grid-cols-2 gap-4">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {topPosts && (
        <section className="content-1 h-80 overflow-y-auto scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-gray-300 mt-6">
          <table className="table-auto ">
            <thead>
              <tr className="sticky top-0">
                <th className="py-4 px-6 bg-gray-200 font-bold">Title</th>
                <th className="py-4 px-6 bg-gray-200 font-bold">Content</th>
                <th className="py-4 px-6 bg-gray-200 font-bold">Image</th>
              </tr>
            </thead>
            <tbody>
              {topPosts.map((post, index) => (
                <tr key={index} className="bg-gray-50 rounded-lg">
                  <td className="capitalize text-sm font-thin py-4 px-6">{post.title.length > 8 ? post.title.slice(0, 8) + "...": post.title}</td>
               
                  <td className="font-bold text-md py-4 px-6 tracking-wider">{post.content.length > 20 ? post.content.slice(0,15) + "...": post.content}</td>
                  <td className="py-4 px-6">
                    <img
                      className="h-24 w-full max-w-[200px] rounded-lg object-cover"
                      src={`${URL}${post.image}`}
                      alt="Blog Image"
                      title={post.title}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {topPostsByMonth && (
        <section className="content-1 h-80 overflow-y-auto scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-gray-300 mt-6">
          <table className="table-auto">
            <thead>
              <tr className="sticky top-0">
                <th className="py-4 px-6 bg-gray-200 font-bold">Title</th>
                <th className="py-4 px-6 bg-gray-200 font-bold">Content</th>
                <th className="py-4 px-6 bg-gray-200 font-bold">Image</th>
                
              </tr>
            </thead>
            <tbody>
              {topPostsByMonth.map((post, index) => (
                <tr key={index} className="bg-gray-50 rounded-lg">
                 <td className="capitalize text-sm font-thin py-4 px-6">{post.title.length > 8 ? post.title.slice(0, 8) + "...": post.title}</td>
               
               <td className="font-bold text-md py-4 px-6 tracking-wider">{post.content.length > 20 ? post.content.slice(0,15) + "...": post.content}</td>
                  <td className="py-4 px-6">
                    <img
                      className="h-24 w-full max-w-[200px] rounded-lg object-cover"
                      src={`${URL}${post.image}`}
                      alt="Blog Image"
                      title={post.title}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  </section>
</main>

      
    </>
  );
}

export default AdminDashboard;
