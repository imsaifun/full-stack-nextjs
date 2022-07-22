import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
// import styles from "../styles/Form.module.css";

const Form = ({ formId, todoForm, forNewTodo = true }) => {
    const router = useRouter();
    const contentType = "application/json";
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    const [form, setForm] = useState({
        title: todoForm.title,
        description: todoForm.description,
    });

    /* The PUT method edits an existing entry in the mongodb database. */
    const putData = async (form) => {
        const { id } = router.query;

        try {
            const res = await fetch(`/api/todos/${id}`, {
                method: "PUT",
                headers: {
                    Accept: contentType,
                    "Content-Type": contentType,
                },
                body: JSON.stringify(form),
            });

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status);
            }

            const { data } = await res.json();

            mutate(`/api/todos/${id}`, data, false); // Update the local data without a revalidation
            router.push("/todo");
        } catch (error) {
            setMessage("Failed to update todo");
        }
    };

    /* The POST method adds a new entry in the mongodb database. */
    const postData = async (form) => {
        try {
            const res = await fetch("/api/todos", {
                method: "POST",
                headers: {
                    Accept: contentType,
                    "Content-Type": contentType,
                },
                body: JSON.stringify(form),
            });

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status);
            }

            router.push("/todo");
        } catch (error) {
            setMessage("Failed to add todo");
        }
    };

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const errs = formValidate();
        if (Object.keys(errs).length === 0) {
            forNewTodo ? postData(form) : putData(form);
        } else {
            setErrors({ errs });
        }
    };

    /* Makes sure todo info is filled for todo title*/
    const formValidate = () => {
        let err = {};
        if (!form.title) err.title = "Title is required";
        return err;
    };

    return (
        <>
            <form id={formId} onSubmit={onSubmit}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    maxLength="50"
                    value={form.title}
                    onChange={onChange}
                    required
                />
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    maxLength="500"
                    value={form.description}
                    onChange={onChange}
                />
                <button type="submit">Submit</button>
            </form>
            <p>{message}</p>
            <div>
                {Object.keys(errors).map((err, index) => (
                    <li key={index}>{err}</li>
                ))}
            </div>
        </>
    );
};

export default Form;
