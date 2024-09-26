import { useRef, useState } from "react";
import { validatedataLogin } from "../Utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { updateProfile } from "firebase/auth";
import { LOGO } from "../Utils/constant";


function Login() {

    const [loginWindow, setLoginWindow] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);



    const handleclick = (e) => {
        e.preventDefault();


        //validate the form 
        const res = validatedataLogin(email?.current?.value, password?.current?.value, signUp, name?.current?.value);

        //if form validation fail this shows the error on screen
        setErrorMsg(res);

        //stops the execution due to form error
        if (res) return;

        //after form validation success - 
        if (signUp) {
            //create new user - signUp
            createUserWithEmailAndPassword(auth, email?.current?.value, password?.current?.value)
                .then((userCredential) => {
                    // Signed up -- updating username 
                    const displayName = name.current.value;

                    updateProfile(userCredential.user, { displayName }).then(() => {
                    }).catch(() => {
                        setErrorMsg("Some Error Occured While Updating Your Name ! Login Your Account");
                        setSignUp(false);
                    });

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMsg(errorCode + "-" + errorMessage);

                });


        } else {
            //login user
            signInWithEmailAndPassword(auth, email?.current?.value, password?.current?.value)
                .then(() => { })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMsg(errorCode + "-" + errorMessage);

                });

        }


    }



    return loginWindow ? <div className="bg-black p-4 absolute top-0 left-0 right-0 bottom-0 " >

        <form className=" w-[30%] m-auto relative bg-gray-800 p-8 rounded-md z- mt-[10%] flex space-y-4 items-center flex-col  ">

            <span className="z-10 absolute top-4 cursor-pointer right-4 text-white font-bold" onClick={() => setLoginWindow(false)}>&#10005;</span>
            <img src={LOGO} width={100} height={100} alt="logo-image" />

            <h1 className="text-white text-lg font-bold">{signUp ? "Sign Up Login to  Disney+Hotstar" : "Login to Disney+Hotstar"}</h1>
            {errorMsg ? <p className="text-red-500">{errorMsg}</p> : null}


            {
                signUp ? <input type="text" name="name" ref={name} required placeholder="Full Name" className=" text-white m-2 px-4 rounded-md py-2 outline-none bg-slate-800 border border-gray-400" /> : null

            }

            <input ref={email}
                type="email" name="email" required placeholder="Email" className=" text-white m-2 px-4 rounded-md py-2 outline-none bg-slate-800 border border-gray-400" />
            <input ref={password}
                type="password" name="password" required placeholder="Password" className="text-white m-2 px-4 rounded-md py-2 outline-none bg-gray-800 border border-gray-400" />



            <button onClick={(e) => handleclick(e)} className="bg-gradient-to-r from-blue-600 to-blue-800 px-20 rounded-md  py-2 text-white font-bold">{signUp ? "Sign Up" : "Login"}</button>


            <p className="text-white cursor-pointer" onClick={() => { setSignUp(!signUp); setErrorMsg(null) }}
            >{signUp ? "Already Have an Account ? Login Now" : "Don't Have an Account? Create Now"}</p>

        </form>



    </div>

        :

        <div className="text-white mr-[20%] ml-[20%]  flex flex-col items-center justify-between space-y-2 text-center  mt-[10%] ">
            <img src="https://img10.hotstar.com/image/upload/f_auto,q_90,w_384/feature/myspace/my_space_login_in.png" alt="login-page-logo" width={400} height={400} />
            <h1 className="font-bold text-xl">Login To Disney+Hotstar</h1>
            <p className="text-[#8f98b2]">Start watching from where you left off, personalise for kids and more</p>
            <button onClick={() => setLoginWindow(true)} className="bg-gradient-to-r from-blue-600 to-blue-800 px-20 rounded-md  py-2 font-bold">Login</button>
        </div>
}

export default Login;