import Form from "../../components/Form";
import Layout from "../../components/Layout/LayoutAdmin";

const NewTodo = () => {
  const todoForm = {
    title: "",
    description: "",
  };

  return (
    <>
      <Layout pageClass={"front"}>
        <Form formId="add-todo-form" todoForm={todoForm} />
      </Layout>
    </>
  );
};

export default NewTodo;
