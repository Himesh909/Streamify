import { useState, useCallback } from "react";
import { useLogin } from "../hooks";
import { AuthForm, Illustration, Logo } from "../components";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { loginMutation, isPending } = useLogin();

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      loginMutation(loginData);
    },
    [loginData, loginMutation]
  );

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md-p8">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Login Form - Left Side */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          <Logo className="mb-4 justify-start gap-2" />
          <AuthForm
            formState={loginData}
            setFormState={setLoginData}
            handleFormSubmit={handleLogin}
            isLogin={true}
            isPending={isPending}
          />
        </div>
        {/* Illustration - Right Side */}
        <Illustration />
      </div>
    </div>
  );
};

export default LoginPage;
