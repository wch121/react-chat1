import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {

    const [err, setErr] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/")
        } catch (err) {
            setErr(true);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">WCH Chat</span>
                <span className="title">登录</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="邮箱" />
                    <input type="password" placeholder="密码" />
                    <button >登录</button>
                    {err && <span>出错了</span>}
                </form>
                <p>
                    你有账号了吗? <Link to="/register">去注册</Link>
                </p>
            </div>
        </div>
    )
}

export default Login