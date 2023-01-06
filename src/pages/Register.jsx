import React, { useState } from 'react'
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';


const Register = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);

            //Create a unique image name
            const storageRef = ref(storage, displayName);//在这个存储空间中用用户名来命名我们的图像
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                (error) => {
                    setErr(true);
                },
                () => {
                    //返回一个可下载的路径
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });

                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    });
                });
        } catch (err) {
            setErr(true);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">WCH Chat</span>
                <span className="title">注册</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="用户名" />
                    <input type="email" placeholder="邮箱" />
                    <input type="password" placeholder="密码" />
                    <input style={{ display: "none" }} type="file" id="file" />
                    <label htmlFor="file">
                        <img src={Add} alt="" />
                        <span>添加一个头像</span>
                    </label>
                    <button >注册</button>
                    {err && <span>出错了</span>}
                </form>
                <p>
                    你有账号了吗? <Link to="/login">去登录</Link>
                </p>
            </div>
        </div>
    )
}

export default Register