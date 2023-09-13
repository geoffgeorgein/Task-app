import React, { useEffect, useState } from "react";
import axios from "axios";
import "./home.scss";

const Home = () => {
  const [task, setTask] = useState();
  const [List, setList] = useState([]);

  useEffect(() => {
    axios
      .get("https://task-api-cvll.onrender.com/get")
      .then((result) => setList(result.data));
  }, [List]);

//   console.log('list',List.length);

const fetch=()=>{
    axios
    .get("https://task-api-cvll.onrender.com/get", { task: task })
    .then((result) => setList(result.data))
    .catch((err) => console.log(err));
}

  const handleAdd = () => {
    axios
      .post("https://task-api-cvll.onrender.com/add", { task: task })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
        fetch();
      setTask('');
  };    

  const handleEdit=(id)=>{
    // console.log("id",id)
    console.log("List",List)
    axios
      .put("https://task-api-cvll.onrender.com/update/"+id, { task: task })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  const handleDelete=(id)=>{

    axios.delete("https://task-api-cvll.onrender.com/delete/"+id)

  }
  return (
    <div className="home">
      <div>
        <h2 className="title">TO DO</h2>
        <div className="inputContainer">
          <input
            type="text"
            value={task}
            placeholder="Enter your Task"
            onChange={(e) => setTask(e.target.value)}
          ></input>
          <button onClick={handleAdd} className="button">
            +
          </button>
        </div>

        {List.map((item) => {
          return (
            <div
              key={item._id}
              className="taskName"
              style={{ paddingBottom: "5px" }}
            >
                <div className="checkbox" onClick={()=>handleEdit(item._id)} >
                <p className={item.done?"line_through":""}>{item.name}</p> 
                </div>
              
              <div className="icons">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-2 h-2"
                  onClick={()=>handleDelete(item._id)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>

              
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
