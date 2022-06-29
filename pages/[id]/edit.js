import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "../../components/Form";

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const EditTodo = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: todo, error } = useSWR(id ? `/api/todos/${id}` : null, fetcher);

  if (error) return <p>Failed to load</p>;
  if (!todo) return <p>Loading...</p>;

  const todoForm = {
    title: todo.title,
    description: todo.description,
  };

  return (
    <Form formId="edit-todo-form" todoForm={todoForm} forNewTodo={false} />
  );
};

export default EditTodo;
