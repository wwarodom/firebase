import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../lib/firebase";
import useAuth from "../hooks/useAuth";
import Image from 'next/image'

const Auth = () => {

    const { isLoggedIn, user } = useAuth();

    const handleAuth = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log("User: ", user)
                console.log("User: ", user.providerData[0].photoURL)
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(error)
            });
    };

    return (
        <div>
            {isLoggedIn && (
                <>
                    <div className="flex justify-between items-center w-[100%]">
                        <div className="flex items-center">
                            <Image
                                className="rounded-full shadow-xl"
                                src={user.providerData[0].photoURL}
                                alt="Picture of the author"
                                width={50}
                                height={50}
                            />
                            <span className="ml-4 text-xl">{user.email}</span>
                        </div>

                        <button
                            className="border-2 border-black px-2 rounded-xl"
                            onClick={() => auth.signOut()}>
                            Logout
                        </button>
                    </div>

                </>
            )}
            {!isLoggedIn && (
                <button
                    className="border-2 border-black px-2 rounded-xl"
                    onClick={() => handleAuth()}>
                    Login with Google
                </button>
            )}
        </div>
    );
};

export default Auth;