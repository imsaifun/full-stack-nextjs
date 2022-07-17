import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import cookie from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import * as Yup from "yup";
const initialValues = {
    email: "",
    password: "",
};

const SigninFormSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

function SigninForm() {
    const router = useRouter();
    return ( 
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={SigninFormSchema}
                onSubmit={ async (fields)  => {
                    console.log(fields);
                    try {

                        const {data} = await axios.post(
                          `/api/user/login`,
                          fields
                          
                        )
                  
                        toast.success(data.message)
                        cookie.set("token", data?.token)
                        cookie.set("user", JSON.stringify(data?.user))
                        router.push("/admin")
                      } catch (error) {
                        toast.error(error.response.data.error)
                      } 

                }}
            >
                {({ errors, status, touched }) => (
                    <Form>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <label className="form-label">Email</label>
                                <Field
                                    name="email"
                                    type="text"
                                    className={
                                        "form-control" +
                                        (errors.email && touched.email
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>

                            <div className="col-12 mb-3">
                                <label className="form-label">Password</label>
                                <Field
                                    name="password"
                                    type="password"
                                    className={
                                        "form-control" +
                                        (errors.password && touched.password
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                            <div className="col-6">
                                <div className="form-check">
                                <Field
                                    type="checkbox"
                                    name="acceptTerms"
                                    className={
                                        "form-check-input "
                                    }
                                />
                                <label
                                    className="form-check-label"
                                >
                                    Remember me
                                </label>
                                </div>
                            </div>
                            <div className="col-6 text-end">
                                <Link href="/reset">
                                <a>Forgot Password?</a>
                                </Link>
                            </div>
                        </div>

                        <div className="mt-3 d-grid gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary mr-2"
                            >
                                Sign In
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}
export default SigninForm;
