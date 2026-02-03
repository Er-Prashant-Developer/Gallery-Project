import React, { useEffect } from "react";
import { useState } from "react";

function App() {
  const [userdata, setuserdata] = useState([]);
  const [page,setpage]=useState(1)
  const getdata = async () => {
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${page}&limit=30`,
    );
    const data = await response.json();
    setuserdata(data);
  };

  useEffect(() => {
    console.log(page)
    getdata();
  }, [userdata]);

  const handleprevious=()=>{
    if(page>1){
     setpage(page-1)
    }
  }

  return (
    <div className="p-5 bg-black h-screen text-white overflow-auto">
      
      {/* <button
        onClick={() => {
          getdata();
        }}
        className="px-2 py-1 active:scale-95 bg-green-500 rounded"
      >
        get data
      </button> */}

      <div className="mt-5 p-5">
      <h1 className="text-5xl font-bold mb-2 hover:text-indigo-300 inline-block">Photo Gallery</h1>
        {userdata.length > 0 ? (
          <div className="flex flex-col justify-center items-center">
            <div className="flex p-2 flex-wrap gap-2 ">
              {userdata.map((e, i) => (
              <a
                href={e.url}
                target="_blank"
                className=" flex flex-col gap-3 w-70 h-60 rounded-md overflow-hidden bg-zinc-600 p-2"
                key={i}
              >
                <img
                  className="w-full h-46 object-cover rounded-md"
                  src={e.download_url}
                  alt=""
                />
                <div>{e.author}</div>
              </a>
            ))}

            </div>
            
            <div className="flex justify-center items-center gap-5">

              <button 
               onClick={()=>{handleprevious()}}
               className="w-30 px-2 py-1 bg-amber-500 rounded-md">
                Previous
              </button>
              <span className="text-2xl font-semibold">Page {page}</span>
              <button onClick={()=>{setpage(page+1)}} className="w-30 px-2 py-1 bg-amber-500 rounded-md">
                Next
              </button>
            </div>
          </div>
        ) : (
          "loading..."
        )}
      </div>
    </div>
  );
}

export default App;
