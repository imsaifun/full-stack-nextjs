import Form from "../../components/Form";
import Layout from "../../components/Layout/Layout";
import getUser from "../../lib/getUser";
import dbConnect from "../../lib/dbConnect";

const NewTodo = ({user}) => {
  const todoForm = {
    title: "",
    description: "",
  };

  return (
    <>
      <Layout role={user}>
        <Form formId="add-todo-form" todoForm={todoForm} />
      </Layout>
    </>
  );
};

export default NewTodo;

export async function getServerSideProps({ req, res }) {
  await dbConnect();
  const user = await getUser(req, res);
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
      props: {},
    };
  }
  return {
    props: {
      user
    },
  };
}
