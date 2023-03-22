
import useAuth from "../hooks/useAuth";
import { addTodo } from "../lib/todo";
import { useState } from 'react'
import { toast } from 'react-toastify'; 

const AddTodo = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pending");
    const [isLoading, setIsLoading] = useState(false);

    const { isLoggedIn, user } = useAuth();

    const handleTodoCreate = async () => {
        if (!isLoggedIn) {
            toast.error(`You must be logged in to create a todo`)
            console.log({
                title: "You must be logged in to create a todo",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        setIsLoading(true);
        const todo = {
            title,
            description,
            status,
            userId: user.uid,
        };
        await addTodo(todo);
        setIsLoading(false);

        setTitle("");
        setDescription("");
        setStatus("pending");
        toast.info(`Todo created successfully ${status} : success`)
        console.log({ title: "Todo created successfully", status: "success" });
    };

    return (
        <div>
            <input
                className="border-2 border-black rounded-lg shadow-lg p-2 w-[60%]"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <br />
            <textarea
                className="border-2 border-black rounded-lg shadow-lg p-2 w-[60%] h-[50%]"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <br />
            <select
                className="border-2 border-black rounded-lg shadow-lg p-2 w-[15%] text-center"
                value={status} onChange={(e) => setStatus(e.target.value)}>
                <option
                    value={"pending"}
                    style={{ color: "yellow", fontWeight: "bold" }}
                >
                    Pending ⌛
                </option>
                <option
                    value={"completed"}
                    style={{ color: "green", fontWeight: "bold" }}
                >
                    Completed ✅
                </option>
            </select>
            <br />
            <br />
            <button
                className="border-2 border-black px-10 py-1 rounded-xl shadow-xl"
                onClick={() => handleTodoCreate()}
                disabled={title.length < 1 || description.length < 1 || isLoading}
            >
                Add
            </button>
        </div>
    );
};

export default AddTodo;