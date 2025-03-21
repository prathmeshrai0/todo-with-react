import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Icon from './components/icon'
import Navbar from './components/Navbar'
import tick from './assets/tick.svg'
import { FaEdit } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

function App() {

  const [count, setCount] = useState(0)
  const [updateTodo, setupdateTodo] = useState(false)
  const [todo, settodo] = useState('')
  const [todos, settodos] = useState([])
  const inputData = useRef(null)
  const [updateIndex, setUpdateIndex] = useState(null)
  const [fullEmpty, setFullEmpty] = useState(false)
  const [finishedTodos, setfinishedTodos] = useState(true)
  const savetoLS = () => {
    localStorage.setItem('todos', JSON.stringify(todos))

    // this is done in order to get unique key for every elements in the Array
    if (localStorage.getItem('todos')) {
      let totalObjects = JSON.parse(localStorage.getItem('todos'))


      if (totalObjects.length) {


        setCount(totalObjects[totalObjects.length - 1].count + 1);
      }


    }
  }

  useEffect(() => {
    console.log('updated todos is : outside ', todos);
    if (todos.length) {
      //   console.log('updated todos is : ', todos);

      savetoLS()
    }
    else if (fullEmpty) {
      // in this case data is totally empty after deleting everything not by refreshing website
      savetoLS()
    }

  }, [todos])



  useEffect(() => {


    if (localStorage.getItem('todos')) {

      let todos = JSON.parse(localStorage.getItem('todos'))
      settodos(todos)
      // console.log(localStorage.getItem('todos'));
      // console.log(todos);
    }
    // console.log(todos);

  }, [])

  const handleEdit = (index) => {

    // console.log(updateTodo);
    setUpdateIndex(index);
    setupdateTodo(true);
    //if update todo is true then the process begins
  }
  useEffect(() => {
    // here inputData refers to input tag of application
    if (updateTodo) { inputData.current.value = todos[updateIndex].todo; }
    else { inputData.current.value = '' }

  }, [updateTodo, updateIndex])

  const handleUpdate = () => {
    todos[updateIndex].todo = todo;


    //     settodos(todos)
    //     ❌ Why settodos(todos) Doesn't Work
    //     ❌ No new reference, no re - render.

    // todos is an array stored in React state.
    // If we do settodos(todos), we are passing the same reference.
    // React compares references(oldTodos === newTodos), sees that nothing changed, and skips re - rendering.

    settodos([...todos])

    setupdateTodo(false)
    savetoLS()
  }

  const handleDelete = (e, c, index) => {



    // this is another way to manipulate Array 
    // let a = confirm(`are you sure you want to delete :  ${todos[index].todo}? `)

    // if (a) {

    settodos(todos.filter(item => item.count !== c));

    if (todos.length == 1) {

      console.log('this will be going to get full empty', todos);
      setFullEmpty(true)
    }


    //   console.log('inside delete before splice : ',todos);
    // todos.splice(c, 1);

    // settodos([...todos])

    // console.log(todos);
    // }
    savetoLS()
  }


  const handleAdd = () => {

    setFullEmpty(false)

    settodos([...todos, { todo, isCompleted: false, count }])

    settodo('')

    // count is used to get unique key 
    setCount(count + 1)
    // } else {
    //   alert("input cannot be blank")
    // }

    savetoLS()
  }

  const handleChange = (e) => {

    settodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    {/*
      capital letter are not allowed in attributes 
      console.log(e.target.dataset.itsDone);

      react-dom_client.js?v=4b3acf01:2316 React does not recognize the data-itsDone prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase data-itsdone instead. If you accidentally passed it from a parent component, remove it from the DOM element.
       reason:
      The error is happening because React automatically converts custom attributes to lowercase in the DOM. You wrote data-itsDone (camelCase), but React only allows lowercase custom attributes.
*/ }


    // below are two methods in which you need to find the data-id given by you matches with obj.count in the db 

    // method 1 
    let ans = todos.find((obj) => {
      return obj.count == e.target.dataset.todoid;
    })
    let index = todos.indexOf(ans);

    // method 2
    // let index ;
    // for (const key in todos) {
    //   // console.log(todos[key].count);


    //   if (todos[key].count == e.target.dataset.todoid) {
    //     index = key;
    //     break;
    //   }

    // }



    e.target.checked ? todos[index].isCompleted = true : todos[index].isCompleted = false


    settodos([...todos]);

  }


  const toggleShowFinishedTodos = () => {
    setfinishedTodos(!finishedTodos)


  }
  return (
    <>
      <Navbar />
      <div className="  gf container mx-auto   border-red-600 flex items-center flex-col   min-h-[75vh]   ">
        {/* <div className="logo border w-[65%]">
          <Icon />

        </div> */}

        <div className='f border md:w-[55%] rounded-lg min-[300px]:p-5 bg-[#222222]  min-h-[75vh] flex flex-col gap-3   w-full '>
          <h1 className='font-bold text-4xl'>Your Todo App</h1>
          <div className="addtodo  [&>*]:py-1 [&>*]:rounded-sm flex justify-between  ">
            <input ref={inputData} type="text" onChange={handleChange} value={todo} placeholder='Add your todo' className='border  pl-1 w-sm  ' />
            <div className="addUpdate">
              {updateTodo ? <button onClick={handleUpdate} className='px-4    '>update</button> : <button onClick={handleAdd} className='px-4     '><IoAddCircleSharp /></button>}

            </div>
          </div>
          <h2 className='font-bold hover:underline text-lg'>Your Tasks here</h2>
          <div className="todos  flex flex-col  gap-3 p-3 max-h-full w-full   border-amber-500">
            <div className='flex gap-2'> <input type="checkbox" onChange={toggleShowFinishedTodos} checked={finishedTodos} />Show finished Todos</div>

            <hr />
            {todos.length === 0 && <div>No todos to display</div>}

            {todos.map((item, index) => {



              return (finishedTodos || !item.isCompleted) && (
                <div key={item.count} className="todo flex justify-between  bg-[#1c1d1e] min-h-8 items-center max-w-full   border-red-900">
                  <div className='flex items-center gap-2'>
                    <span>{index + 1} .</span>
                    <input type="checkbox" onChange={handleCheckbox} data-todoid={item.count} checked={item.isCompleted} />
                  </div>
                  <div className='flex items-center gap-2      ' >
                    <p className={item.isCompleted ? "line-through  max-w-full   w-full break-all " : ' max-w-full  w-full break-all  '} >    {item.todo}</p>
                    <img src={tick} style={{ display: item.isCompleted ? 'block' : 'none' }} className='size-5' alt="" />

                  </div>
                  <div className='flex gap-4 [&>button]:px-2    h-[100%] w-32 [&>button]:h-[80%]  [&>button]:w-[45%] items-center'>

                    <button onClick={() => handleEdit(index)}><FaEdit /></button>
                    <button onClick={(e) => handleDelete(e, item.count, index)}><MdDeleteOutline /></button>

                  </div>

                </div>)
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
