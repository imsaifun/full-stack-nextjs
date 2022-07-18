import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const initialValues = {
    name: "",
    email: "",
    password: "",
    acceptTerms: false,
};

const SignupFormSchema = Yup.object().shape({
    name: Yup.string().required("Full is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Ts & Cs is required"),
});

function SignupForm() {
    const router = useRouter();
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={SignupFormSchema}
                onSubmit={ async (fields) => {
                    console.log(fields);
                    try {
                        // if (password !== conPassword) {
                        //     toast.error("passwords do not match!")
                        //     // console.log("passwords do not match")
                        //     return
                        // } 
                        const { data } = await axios.post(
                            `/api/user/register`,
                            fields
                            
                        )
                        router.push("/user/login")
                        toast.success(data?.message)
                    } catch (error) {
                        console.log(error.response)
                        toast.error(error.response.data.error)
                    }
                }}
            >
                {({ errors, status, touched }) => (
                    <Form>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <label className="form-label">Full Name</label>
                                <Field
                                    name="name"
                                    type="text"
                                    className={
                                        "form-control" +
                                        (errors.name && touched.name
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
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
                                    type="text"
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
                            <div className="col-12">
                                <div className="form-check">
                                    <Field
                                        type="checkbox"
                                        name="acceptTerms"
                                        className={
                                            "form-check-input " +
                                            (errors.acceptTerms &&
                                                touched.acceptTerms
                                                ? " is-invalid"
                                                : "")
                                        }
                                    />
                                    <label className="form-check-label">
                                        I certify that I am 18 years of age or older, and agree to the <a href="#" className="text-primary">User Agreement</a> and <a href="#" className="text-primary">Privacy Policy</a>.
                                    </label>
                                    <ErrorMessage
                                        name="acceptTerms"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 d-grid gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary mr-2"
                            >
                                Sign Up
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}
export default SignupForm;
