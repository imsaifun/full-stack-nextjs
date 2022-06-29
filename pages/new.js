import Form from "../components/Form";

const NewTodo = () => {
  const todoForm = {
    title: "",
    description: "",
  };

  return <Form formId="add-todo-form" todoForm={todoForm} />;
};

export default NewTodo;
