import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "../../../components/Form";
import Layout from "../../../components/Layout/Layout";
import dbConnect from "../../../lib/dbConnect";
import getUser from "../../../lib/getUser";

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const EditTodo = ({user}) => {
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
    <>
      <Layout role={user}>
        <Form formId="edit-todo-form" todoForm={todoForm} forNewTodo={false} />
      </Layout>
    </>
  );
};

export async function getServerSideProps({ req, res }) {
  await dbConnect();
  const user = await getUser(req,res);
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

export default EditTodo;
