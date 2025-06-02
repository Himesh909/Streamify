import { useState } from "react";
import { Link } from "react-router";
import { useLogin } from "../hooks";
import { Button, Illustration, Input, Logo } from "../components";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { loginMutation, isPending, error } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md-p8">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Login Form - Left Side */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* Logo */}
          <Logo className="mb-4 justify-start gap-2" />

          {/* Error Message if any*/}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Welcome Back</h2>
                  <p className="text-sm opacity-70">
                    Sign in to your account to continue your language jrouney
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {/* Email */}
                <Input
                  label="Email"
                  type="email"
                  placeholder="jhondoe@example.com"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({
                      ...loginData,
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
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        password: e.target.value,
                      })
                    }
                    required
                    isPassword={true}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  disabled={
                    isPending || !loginData.email || !loginData.password
                  }
                  isPending={isPending}
                  isLogin={true}
                />

                <div className="text-center mt-4">
                  <p className="text-sm">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary hover:underline">
                      Create one
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

export default LoginPage;
