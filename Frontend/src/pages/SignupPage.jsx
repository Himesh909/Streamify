import { useState } from "react";
import { Link } from "react-router";
import { useSignup } from "../hooks";
import { Button, Illustration, Input, Logo } from "../components";

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signupMutation, isPending } = useSignup();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md-p8">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Signup Form - Left Side */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* Logo */}
          <Logo className="mb-4 justify-start gap-2" />{" "}
          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                  <p className="text-sm opacity-70">
                    Join Streamify and start your Learning Advanture!
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Full Name */}
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Jhon Doe"
                  value={signupData.fullName}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      fullName: e.target.value,
                    })
                  }
                  required
                />

                {/* Email */}
                <Input
                  label="Email"
                  type="email"
                  placeholder="jhondoe@example.com"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      email: e.target.value,
                    })
                  }
                  required
                />

                {/* Password */}
                <div className="form-control w-full">
                  <Input
                    label="Password"
                    placeholder="********"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        password: e.target.value,
                      })
                    }
                    required
                    isPassword={true}
                  />
                </div>

                {/* Agree */}
                <div className="form-control">
                  <div className="flex items-center gap-2">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        required
                        onClick={() => setIsButtonDisabled(!isButtonDisabled)}
                      />
                    </label>
                    <span className="text-xs leading-tight">
                      I agree to the{" "}
                      <span className="text-primary hover:underline hover:cursor-pointer">
                        terms of service
                      </span>{" "}
                      and{" "}
                      <span className="text-primary hover:underline hover:cursor-pointer">
                        privacy policy
                      </span>
                    </span>
                  </div>
                </div>

                {/* Submit Button */}

                <Button
                  disabled={
                    isButtonDisabled ||
                    isPending ||
                    !signupData.email ||
                    !signupData.password ||
                    !signupData.fullName
                  }
                  isPending={isPending}
                  isSignup={true}
                />

                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Illustration - Right Side */}
        <Illustration />
      </div>
    </div>
  );
};

export default SignupPage;
