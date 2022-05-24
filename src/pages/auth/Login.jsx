import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./auth.css";
import { useAuth } from "../../context/auth-context";
import { useUserData } from "../../context/user-data-context";
export const Login = () => {
    const location = useLocation();
    const { userlogin } = useAuth();
    const defaultLoginValue = {
        email: "",
        password: "",
    }
    const { userDataState, userDataDispatch } = useUserData()
    const [loginDetail, setloginDetail] = useState({ ...defaultLoginValue });
    const [showPassWord, setShowPassword] = useState(false);

    const showPasswordFn = (e, passwordType, value) => {
        e.stopPropagation();
        setShowPassword((prev) => ({ ...prev, [passwordType]: value }));
    };

    const setValue = (key, value) => {
        setloginDetail((prev) => {
            return {
                ...prev,
                [key]: value.trim(),
            };
        });
    };
    return (
        <div>
            <main className="flex-center">
                <div className=" auth-position auth-form">
                    <form
                        action=""
                        className="auth-wrapper"
                        onSubmit={async(e) => {
                            e.preventDefault();
                            const data = await userlogin(loginDetail);
                            userDataDispatch({
                                type: "login",
                                payload: {
                                    loginData: data.foundUser
                                }
                            })
                            setloginDetail({ ...defaultLoginValue })
                        }}
                    >
                    <div>
                        <h2 className="text-center">login</h2>
                    </div>
                    <div className="flex-col">
                        <label htmlFor="email">
                            Email address <span className="require-star">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="fs-sm input-padding"
                            value={loginDetail.email}
                            autoComplete="off"
                            required
                            onChange={(e) => {
                                setloginDetail((prev) => {
                                    return {
                                        ...prev,
                                        email: e.target.value,
                                    };
                                });
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
                                ></span>
                            ) : (
                                <span
                                    className="mr-3 fa fa-eye-slash"
                                    onClick={(e) => showPasswordFn(e, "password", true)}
                                ></span>
                            )}
                        </label>

                        <input
                            type={showPassWord ? "text" : "password"}
                            id="password"
                            className="fs-sm input-padding"
                            value={loginDetail.password}
                            required
                            autoComplete="off"
                            onChange={(e) => {
                                setValue("password", e.target.value);
                            }}
                        />
                    </div>
                    <div className="text-center mt-1">
                        <button className="btn-sm border-squre form-submit btn-block" type="submit">
                            Login
                        </button>
                    </div>
                    <div className="text-center mt-1">
                        <Link
                            to="/signup"
                            state={location?.state}
                            className="btn-icon-text-right text-underline-none centre "
                        >
                            Create New Account <i className="fas fa-angle-right fs-md"></i>
                        </Link>
                    </div>
                </form>
        </div>
            </main >
        </div >
    );
};
