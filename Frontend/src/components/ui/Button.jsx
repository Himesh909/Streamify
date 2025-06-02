import { ShipWheelIcon } from "lucide-react";

const Button = ({
  isPending,
  disabled,
  isSignup = false,
  isLogin = false,
  idOnboarding = false,
}) => {
  return (
    <button
      type="submit"
      className="btn w-full btn-primary disabled:bg-primary/50 disabled:text-base-content"
      disabled={disabled}
    >
      {isPending ? (
        <>
          <span className="loading loading-spinner loading-xs" />
          {isSignup
            ? "Creating Account..."
            : isLogin
            ? "Signing In..."
            : idOnboarding
            ? "Completing Onboarding..."
            : "Submitting..."}
        </>
      ) : isSignup ? (
        "Create Account"
      ) : isLogin ? (
        "Sign In"
      ) : idOnboarding ? (
        <>
          <ShipWheelIcon className="size-5 mr-2" />
          Complete Onboarding
        </>
      ) : (
        "Submit"
      )}
    </button>
  );
};

export default Button;
