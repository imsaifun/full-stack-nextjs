import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../../components/Layout/LayoutAdmin";
import dbConnect from "../../../lib/dbConnect";

import getTodoById from "../../../lib/getTodoById";

/* Allows you to view todo card info and delete todo card*/
const TodoPage = ({ todo, user }) => {
    const router = useRouter();
    const [message, setMessage] = useState("");

    const onDelete = async () => {
        const todoID = router.query.id;

        try {
            await fetch(`/api/todos/${todoID}`, {
                method: "Delete",
            });
            router.push("/todo");
        } catch (error) {
            setMessage("Failed to delete the todo.");
        }
    };

    return (
        <Layout pageClass={"front"}>
            <div key={todo._id}>
                <div>
                    <h3>Title: {todo.title}</h3>
                    <p>Description: {todo.description}</p>
                    <Link href="/todo/[id]/edit" as={`/todo/${todo._id}/edit`} passHref>
                        <button>Edit</button>
                    </Link>
                    <button onClick={onDelete}>Delete</button>
                </div>
                {message && <p>{message}</p>}
            </div>
        </Layout>
    );
};

// export async function getServerSideProps({ params }) {
//     await dbConnect();

//     const todo = await Todo.findById(params.id).lean();
//     todo._id = todo._id.toString();

//     return { props: { todo } };
// }


export async function getServerSideProps({ params }) {
    await dbConnect();
    const todo = await getTodoById(params.id);
    return {
        props: {
            todo
        },
    };
}


export default TodoPage;
