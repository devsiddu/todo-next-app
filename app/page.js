"use client"

import ToDo from "@/Components/ToDo";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Home() {

  const [formData, setFromData] = useState({
    title: "",
    description: ""
  });

  const [todoData, setTodoData] = useState([]);

  const fetchTodos = async () => {
    const response = await axios('/api');
    setTodoData(response.data.todos);
  }

  const deleteTodo = async (id) => {
    const response = await axios.delete('/api', {
      params: {
        mongoId:id
      }
    })
    toast.success(response.data.msg);
    fetchTodos();
    
  }

  const completeTodo = async (id) => {
    const response = await axios.put('/api', {}, {
      params: {
        mongoId:id
      }
    })
    toast.success(response.data.msg);
    fetchTodos();
  }

  useEffect(() => {
    fetchTodos();
  }, [])

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFromData(form => ({ ...form, [name]: value }));
    console.log(formData);

  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      // api code
      const response = await axios.post('/api', formData);

      toast.success(response.data.msg);
      setFromData({
        title: "",
        description: ""
      })
      await fetchTodos();

    } catch (error) {
      toast.error("Fill all the fields.")
    }
  }

  return (
    <>
      <ToastContainer theme="dark" />
      <form onSubmit={onSubmitHandler} className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto" action="">
        <input value={formData.title} onChange={onChangeHandler} type="text" name="title" placeholder="Enter Title." className="px-3 py-2 border-2 w-full" />
        <textarea value={formData.description} onChange={onChangeHandler} name="description" placeholder="Enter Description." className="px-3 py-2 border-2 w-full"></textarea>
        <button className="bg-orange-600 py-3 px-11 text-white" type="submit">Add Todo</button>
      </form>



      <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((item, index) => {
              return <ToDo key={index} id={index} title={item.title} description={item.description} complete={item.isCompleted} mongoId={item._id} deleteTodo={deleteTodo} completeTodo={completeTodo} />
            })}

          </tbody>
        </table>
      </div>


    </>
  );
}
