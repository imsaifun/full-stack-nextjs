import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import dbConnect from "../../lib/dbConnect";
import getTodo from "../../lib/getTodo";
import getUser from "../../lib/getUser";

const Index = ({ todos,user }) => {
    return (
        <>
            <Layout role={user}>
                <Link href="/todo/new" passHref>
                    <button>New</button>
                </Link>
                {todos.map((todo) => (
                    <div key={todo._id}>
                        <div>
                            <h3>Title: {todo.title}</h3>
                            <p>Description: {todo.description}</p>
                            <div>
                                <Link href="/todo/[id]/edit" as={`/todo/${todo._id}/edit`} passHref>
                                    <button>Edit</button>
                                </Link>
                                <Link href="/todo/[id]" as={`/todo/${todo._id}`} passHref>
                                    <button>View</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </Layout>


        </>
    );
}

/* Retrieves todo(s) data from mongodb database */
// export async function getServerSideProps() {
//     await dbConnect();

//     /* find all the data in our database */
//     const result = await Todo.find({});
//     const todos = result.map((doc) => {
//         const todo = doc.toObject(); 
//         todo._id = todo._id.toString();
//         return todo;
//     });

//     return { props: { todos: todos } };
// }

export async function getServerSideProps({ req, res }) {
    await dbConnect();
    const todos = await getTodo();
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
        todos,
        user
      },
    };
  }

export default Index;
