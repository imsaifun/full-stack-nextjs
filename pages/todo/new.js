import Form from "../../components/Form";
import Layout from "../../components/Layout";

const NewTodo = () => {
  const todoForm = {
    title: "",
    description: "",
  };

  return (
    <>
      <Layout>
        <Form formId="add-todo-form" todoForm={todoForm} />
      </Layout>
    </>
  );
};

export default NewTodo;
