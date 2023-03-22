
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import { deleteTodo, toggleTodoStatus } from "../lib/todo";
import { toast } from 'react-toastify'; 

const TodoList = () => {
    const [todos, setTodos] = React.useState([]);

    const { user } = useAuth();
    const refreshData = () => {
        if (!user) {
            setTodos([]);
            return;
        }
        const q = query(collection(db, "todo"), where("user", "==", user.uid));

        onSnapshot(q, (querySnapshot) => {
            let ar: any = [];
            querySnapshot.docs.forEach((doc) => {
                ar.push({ id: doc.id, ...doc.data() });
            });
            setTodos(ar);
        });
    };

    useEffect(() => {
        refreshData();
    }, [user]);

    const handleTodoDelete = async (id: string) => {
        if (confirm("Are you sure you wanna delete this todo?")) {
            deleteTodo(id);
            toast.info(`Todo deleted successfully ${status}: success`)
            console.log({ title: "Todo deleted successfully", status: "success" });
        }
    };

    const handleToggle = async (id: string, status: string) => {
        const newStatus = status == "completed" ? "pending" : "completed";
        await toggleTodoStatus({ docId: id, status: newStatus });
        toast.info(`Todo marked ${newStatus} ${newStatus == "completed" ? "success" : "warning"}`)
        console.log({
            title: `Todo marked ${newStatus} `,
            status: newStatus == "completed" ? "success" : "warning",
        });
    };

    return (
        <table className="mt-4 mb-8 table-auto border border-slate-400 w-[100%]">
            <tbody>
                {todos.length ?
                    (<tr className="border border-slate-300 bg-slate-200">
                        <th>Title</th><th>Description</th><th>Status</th><th></th>
                    </tr>) : ""
                }
                {todos &&
                    todos.map((todo: any, index) => (
                        <tr key={index} className="border border-slate-300 p-2">
                            <td className="mr-8 px-4">
                                {todo.title}
                            </td>
                            <td>
                                {todo.description}
                            </td>
                            <td className="px-4">
                                <label className="relative inline-flex items-center cursor-pointer">

                                    <input type="checkbox" className="sr-only peer" checked={todo.status === "completed"} onChange={() => handleToggle(todo.id, todo.status)} />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 
                                        peer-checked:after:translate-x-full 
                                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                                        after:bg-white 
                                        after:border-gray-300 
                                        after:border 
                                        after:rounded-full 
                                        after:h-5 after:w-5 
                                        after:transition-all 
                                        dark:border-gray-600 
                                        peer-checked:after:border-white 
                                        peer-checked:bg-blue-600"
                                    ></div>
                                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{todo.status}</span>
                                </label>

                            </td>
                            <td >
                                <button
                                    className="border-2 border-black px-2 m-2 rounded-xl shadow-xl"
                                    onClick={() => handleTodoDelete(todo.id)}
                                >Delete</button>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};

export default TodoList;