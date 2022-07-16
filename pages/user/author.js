import { getSession } from "next-auth/react"
import Wrapper from "../../components/auth/wrapper"
import LayoutFront from "../../components/Layout/LayoutAdmin"
const Author = () => {
  return (
    <LayoutFront>

    <Wrapper>
      <h1>Author </h1>
    </Wrapper>
    </LayoutFront>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}

export default Author
