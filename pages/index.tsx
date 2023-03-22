import AddTodo from '@/components/addTodo'
import Auth from '@/components/auth'
import TodoList from '@/components/todoList'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div className='w-[60%] mx-auto mt-4 shadow-lg p-8'>
      <h1 className='text-2xl'>Todo @ Firestore</h1>
      <br />

      <Auth />

      <br /> <hr className='w-[100%] h-2 bg-slate-600' /><br />
      <h1 className='text-2xl mb-4'>Add Task</h1>
      <AddTodo />

      <br /> <hr className='w-[100%] h-2 bg-slate-600' /><br />
      <h1 className='text-2xl'>Task list</h1>
      <TodoList />
      <ToastContainer />
    </div>
  )
}

// https://www.youtube.com/watch?v=wkKzKpTY4w4
