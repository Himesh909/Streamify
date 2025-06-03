import {
  BellDot,
  CheckCircleIcon,
  CheckIcon,
  ShipWheelIcon,
  UserPlusIcon,
  XIcon,
} from "lucide-react";
import { Link } from "react-router";

/**
 * Multi-purpose Button component that handles different button types:
 * 1. Auth buttons (signup, login, onboarding)
 * 2. Friend request buttons
 * 3. Message button for existing friends
 * 4. Accept/Reject buttons for friend requests
 */
const Button = ({
  // Common props
  isPending,
  disabled,
  onClickHandler,

  // Friend request props
  hasRequestBeenSent,
  hasRequestBeenGetted,
  user,

  // Button type flags
  isSignup = false,
  isLogin = false,
  isOnboarding = false,
  isSendRequestButton = false,
  isFriendButton = false,
  isAcceptButton = false,
  isRejectButton = false,
}) => {
  // Helper function to get the button text for auth buttons during loading state
  const getLoadingText = () => {
    if (isSignup) return "Creating Account...";
    if (isLogin) return "Signing In...";
    if (isOnboarding) return "Completing Onboarding...";
    return "Submitting...";
  };

  // Helper function to get friend request button class
  const getFriendRequestButtonClass = () => {
    if (hasRequestBeenSent) return "btn-disabled";
    if (hasRequestBeenGetted) return "btn-secondary";
    if (isAcceptButton) return "btn-success";
    if (isRejectButton) return "btn-error";
    return "btn-primary";
  };

  // Render auth button (signup, login, onboarding)
  const renderAuthButton = () => {
    return (
      <button
        type="submit"
        className="btn w-full btn-primary disabled:bg-primary/50 disabled:text-base-content"
        disabled={disabled}
      >
        {isPending ? (
          <>
            <span className="loading loading-spinner loading-xs" />
            {getLoadingText()}
          </>
        ) : isSignup ? (
          "Create Account"
        ) : isLogin ? (
          "Sign In"
        ) : isOnboarding ? (
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

  // Render friend request button
  const renderFriendRequestButton = () => {
    return (
      <button
        className={`btn w-full mt-2 ${getFriendRequestButtonClass()}`}
        onClick={onClickHandler}
        disabled={disabled}
      >
        {hasRequestBeenSent ? (
          <>
            <CheckCircleIcon className="size-4 mr-2" />
            Request Sent
          </>
        ) : hasRequestBeenGetted ? (
          <>
            <BellDot className="size-4 mr-2" />
            Accept or Reject Request
          </>
        ) : (
          <>
            <UserPlusIcon className="size-4 mr-2" />
            Send Friend Request
          </>
        )}
      </button>
    );
  };

  // Render message button for friends
  const renderMessageButton = () => {
    return (
      <Link to={`/chat/${user._id}`} className="btn btn-outline w-full">
        Message
      </Link>
    );
  };

  // Render accept or reject buttons for friend requests
  const renderAcceptRejectButtons = () => {
    return (
      <button
        className={`btn btn-sm ${getFriendRequestButtonClass()}`}
        onClick={onClickHandler}
        disabled={isPending}
      >
        {isPending ? (
          <span className="loading loading-spinner loading-xs" />
        ) : (
          <>
            {isAcceptButton && (
              <>
                <CheckIcon className="size-4 mr-1" />
                Accept
              </>
            )}
            {isRejectButton && (
              <>
                <XIcon className="size-4 mr-1" />
                Reject
              </>
            )}
          </>
        )}
      </button>
    );
  };
  // Use if statements to determine which button to render
  if (isSignup || isLogin || isOnboarding) {
    return renderAuthButton();
  }

  if (isSendRequestButton) {
    return renderFriendRequestButton();
  }

  if (isFriendButton) {
    return renderMessageButton();
  }

  if (isAcceptButton || isRejectButton) {
    return renderAcceptRejectButtons();
  }

  return <button className="btn">Button</button>;
};

export default Button;
