import { useState, useCallback } from "react";
import { useSignup } from "../hooks";
import { AuthForm, Illustration, Logo } from "../components";

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signupMutation, isPending } = useSignup();

  const handleSignup = useCallback(
    (e) => {
      e.preventDefault();
      signupMutation(signupData);
    },
    [signupData, signupMutation]
  );

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md-p8">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Signup Form - Left Side */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          <Logo className="mb-4 justify-start gap-2" />
          <AuthForm
            handleFormSubmit={handleSignup}
            isSignup={true}
            formState={signupData}
            setFormState={setSignupData}
            isPending={isPending}
          />
        </div>
        {/* Illustration - Right Side */}
        <Illustration />
      </div>
    </div>
  );
};

export default SignupPage;
