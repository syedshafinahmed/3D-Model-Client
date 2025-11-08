import { useLoaderData } from "react-router";
import { ModelCard } from "../../components/ModelCard";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

const AllModels = () => {
  const data = useLoaderData();
  const [models, setModels] = useState(data);
  const [loading, setLoading] = useState(false);
  // const [models, setModels] = useState(data)
  // const [loading, setLoading] = useState(false)

  // const handleSearch = (e) => {
  //   e.preventDefault()
  //   const search_text = e.target.search.value
  //   console.log(search_text)
  //   setLoading(true)

  //   fetch(`https://3d-model-server.vercel.app/search?search=${search_text}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data)
  //       setModels(data)
  //       setLoading(false)
  //     })
  // }

  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    setLoading(true);
    fetch(`http://localhost:3000/search?search=${search}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        setModels(data);
        setLoading(false);
      })
  }


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <BeatLoader color="#db2777" />
      </div>
    );
  }



  return (
    <div>
      {/* <div className="text-2xl text-center font-bold"> All Models</div>
      <p className=" text-center ">Explore 3d models.</p> */}

      {/* <form onSubmit={handleSearch} className=" mt-5 mb-10 flex gap-2 justify-center">
        <label className="input rounded-full ">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input name="search" type="search" placeholder="Search" />
        </label>
        <button className="btn btn-secondary  rounded-full">{loading ? "Searching...." : "Search"}</button>
      </form> */}

      <div className="flex justify-center items-center pt-10 pb-20 px-10">
        <form onSubmit={handleSearch}>
          <div className="w-full max-w-lg mx-auto relative">
            <input name="search" type="text" placeholder="Search..." className="w-full rounded-full border border-gray-300 px-4 py-2 pr-24 focus:outline-none" />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-pink-600 to-red-500 text-white px-4 py-1 hover:from-pink-700 hover:to-red-600">Search</button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {
          models.map(model => <ModelCard model={model} key={model._id}></ModelCard>)
        }
      </div>
    </div>
  );
};

export default AllModels;
