import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { auth } from "../Utils/firebase";
import { signOut } from "firebase/auth";
import { useState } from "react";
const Profile=()=>{
    
    const userdata= useSelector((store)=>store.user);
    const [errorMSG,setErrorMSG]=useState(null);

    function handlelogout(){

        signOut(auth)
            .then(() => {
            // Automatically Redirect to the login page 
            setErrorMSG(null);
            })
            .catch((error) => {
            // An error occurred during sign-out.
             setErrorMSG("Something Went Wrong !");
            });

    }

    return<div className="ml-[10%] mt-[10%] text-white flex flex-col items-center  space-y-4 w-full p-4 rounded-md shadow-2xl ">
      
                <CgProfile className="text-[100px]" />
                
                <h1 className="">{userdata?.email}</h1>
                <button  onClick={handlelogout}
                className="bg-gradient-to-r from-blue-600 to-blue-800 px-20 rounded-md  py-2 text-white font-bold">Logout</button>

            <p className="text-red-500" >{errorMSG}</p>

    </div>

}

export default Profile;