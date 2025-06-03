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
  /**
   * Helper functions for determining button appearance and behavior
   */

  // Get button class based on type
  const getButtonClass = () => {
    // Auth buttons use default primary
    if (isSignup || isLogin || isOnboarding) return "btn-primary";

    // Friend request button classes
    if (isSendRequestButton) {
      if (hasRequestBeenSent) return "btn-disabled";
      if (hasRequestBeenGetted) return "btn-secondary";
      return "btn-primary";
    }

    // Accept/Reject buttons
    if (isAcceptButton) return "btn-success";
    if (isRejectButton) return "btn-error";

    // Friend message button uses outline
    if (isFriendButton) return "btn-outline";

    return "btn-primary"; // Default
  };

  // Get loading text based on button type
  const getLoadingText = () => {
    // Auth buttons
    if (isSignup) return "Creating Account...";
    if (isLogin) return "Signing In...";
    if (isOnboarding) return "Completing Onboarding...";

    // Friend request actions
    if (isSendRequestButton) return "Sending Request...";
    if (isAcceptButton) return "Accepting...";
    if (isRejectButton) return "Rejecting...";

    return "Processing..."; // Default
  };

  /**
   * Button rendering methods - each returns the appropriate button for its type
   */

  // Auth buttons (signup, login, onboarding)
  const renderAuthButton = () => {
    return (
      <button
        type="submit"
        className={`btn w-full ${getButtonClass()} disabled:bg-primary/50 disabled:text-base-content`}
        disabled={disabled || isPending}
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

  // Friend request button
  const renderFriendRequestButton = () => {
    return (
      <button
        className={`btn w-full mt-2 ${getButtonClass()}`}
        onClick={onClickHandler}
        disabled={disabled || isPending || hasRequestBeenSent}
      >
        {isPending ? (
          <>
            <span className="loading loading-spinner loading-xs" />
            {getLoadingText()}
          </>
        ) : hasRequestBeenSent ? (
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

  // Message button for friends
  const renderMessageButton = () => {
    return (
      <Link
        to={`/chat/${user?._id}`}
        className={`btn w-full ${getButtonClass()}`}
      >
        Message
      </Link>
    );
  };

  // Accept or reject buttons for friend requests
  const renderAcceptRejectButtons = () => {
    return (
      <button
        className={`btn btn-sm ${getButtonClass()}`}
        onClick={onClickHandler}
        disabled={isPending || disabled}
      >
        {isPending ? (
          <>
            <span className="loading loading-spinner loading-xs" />
            <span className="ml-1">{getLoadingText()}</span>
          </>
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

  // Return the appropriate button based on type
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

  // Fallback button if no type is specified
  return <button className="btn">Button</button>;
};

export default Button;
