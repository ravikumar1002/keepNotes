import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./auth.css";
import { useAuth } from "../../context/auth-context";

export const SignUp = () => {
    const location = useLocation();
    const { userSignUp, user } = useAuth();
    const [errorPassword, setErrorPassword] = useState(false)
    const [showPassWord, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });

    const emptyField = {
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
    }

    const [signupDetail, setSignupDetail] = useState({ ...emptyField });

    const setValue = (key, value) => {
        setSignupDetail((prev) => {
            return {
                ...prev,
                [key]: value.trim(),
            };
        });
    };

    const showPasswordFn = (e, passwordType, value) => {
        e.stopPropagation();
        setShowPassword((prev) => ({ ...prev, [passwordType]: value }));
    };

    const matchpassword = () => {
        if (signupDetail.confirmPassword.length > 0) {
            signupDetail.password !== signupDetail.confirmPassword ? setErrorPassword(true) : setErrorPassword(false)
        } else {
            setErrorPassword(false)
        }
    }

    useEffect(() => {
        matchpassword()
    }, [signupDetail.confirmPassword])

    return (
        <div>
            <main className="flex-center">
                <div className="auth-position auth-form">
                    <form
                        action=""
                        className="auth-wrapper"
                        onSubmit={(e) => {
                            e.preventDefault();
                            userSignUp(signupDetail, location);
                            setSignupDetail(emptyField)
                        }}
                    >
                        <div>
                            <h2 className="text-center">Signup</h2>
                        </div>
                        <div className="flex-col">
                            <label htmlFor="name">
                                Name <span className="require-star">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="fs-sm input-padding"
                                autoComplete="off"
                                value={signupDetail.name}
                                required
                                onChange={(e) => {
                                    setValue("name", e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex-col">
                            <label htmlFor="email">
                                Email address <span className="require-star">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="fs-sm input-padding"
                                autoComplete="off"
                                value={signupDetail.email}
                                required
                                onChange={(e) => {
                                    setValue("email", e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex-col">
                            <label htmlFor="password" className="flex-between">
                                <span>
                                    Password <span className="require-star">*</span>
                                </span>
                                {showPassWord.password ? (
                                    <span
                                        className="mr-3 fa fa-eye"
                                        onClick={(e) => showPasswordFn(e, "password", false)}
                                    >
                                    </span>
                                ) : (
                                    <span
                                        className="mr-3 fa fa-eye-slash"
                                        onClick={(e) => showPasswordFn(e, "password", true)}
                                    >
                                    </span>
                                )}
                            </label>
                            <input
                                type={showPassWord.password ? "text" : "password"}
                                id="password"
                                className="fs-sm input-padding"
                                required
                                value={signupDetail.password}
                                autoComplete="off"
                                onChange={(e) => {
                                    setValue("password", e.target.value);
                                }}
                            />
                        </div>
                        <div className={`flex-col ${errorPassword && "input-err"}`}>
                            <label
                                htmlFor="confirm-password"
                                className="flex-between"
                            >
                                <span>
                                    Confirm Password <span className="require-star">*</span>
                                </span>
                                {showPassWord.confirmPassword ? (
                                    <span
                                        className="mr-3 fa fa-eye"
                                        onClick={(e) => showPasswordFn(e, "confirmPassword", false)}
                                    >
                                    </span>
                                ) : (
                                    <span
                                        className="mr-3 fa fa-eye-slash"
                                        onClick={(e) => showPasswordFn(e, "confirmPassword", true)}
                                    >
                                    </span>
                                )}
                            </label>
                            <input
                                type={showPassWord.confirmPassword ? "text" : "password"}
                                id="confirm-password"
                                className={`fs-sm input-padding ${errorPassword && "errorFiled"}`}
                                value={signupDetail.confirmPassword}
                                required
                                autoComplete="off"
                                onChange={(e) => {
                                    setValue("confirmPassword", e.target.value);
                                }}
                            />
                            {errorPassword && <div className="error-msg"> password doesn't match</div>}
                        </div>
                        <div className="flex-space-between p-0">
                            <span>
                                <label htmlFor="remember-me">
                                    <input
                                        type="checkbox"
                                        id="remember-me"
                                        required
                                        autoComplete="off"
                                    />
                                    <span className="ml-1">
                                        I accept all Terms & Conditions
                                        <span className="require-star">*</span>
                                    </span>
                                </label>
                            </span>
                        </div>

                        <div className="text-center mt-1">
                            <button
                                className="btn-sm border-squre form-submit btn-block"
                                type="submit"
                            >
                                Create New Account
                            </button>
                        </div>
                        <div className="text-center mt-1">
                            <Link
                                to="/login"
                                state={location?.state}
                                className="btn-icon-text-right text-underline-none centre "
                            >
                                Already have an account
                                <i className="fas fa-angle-right fs-md"></i>
                            </Link>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};
