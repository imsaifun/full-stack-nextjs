
import axios from "axios"
import { useRouter } from "next/router"
import * as React from "react"
import { toast } from "react-toastify"


export default function SignIn() {
  const router = useRouter()

  const { token } = router.query

  console.log(token)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console

    try {
      const conPassword = result.get("conPassword")
      const password = result.get("password")

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.put(
        `/api/user/reset/${token}`,
        { conPassword, password },
        config
      )
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  return (
    <>
    
          <form
            onSubmit={handleSubmit}
          >
            <input
              required
              name="password"
              type="password"
              id="password"
            />
            <input
              required
              id="conPassword"
              name="conPassword"
              type="password"
            />

            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <button
              type="submit"
            >
              Submit
            </button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </form>
    </>
  )
}
