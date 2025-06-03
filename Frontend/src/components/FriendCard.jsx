import { LANGUAGE_TO_FLAG } from "../constants";
import { capitialize } from "../lib/utils";
import { MapPinIcon } from "lucide-react";
import Button from "./ui/Button";

const FriendCard = ({
  onClickHandler,
  user,
  hasRequestBeenSent,
  hasRequestBeenGetted,
  disabled,
  isPending,
  isSendRequestButton = false,
  isFriendButton = false,
}) => {
  return (
    <div className="card bg-base-200 hover:shadow-lg transition-all duration-300">
      <div className="card-body p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="avatar size-16 rounded-full">
            <img src={user.profilePic} alt={user.fullName} />
          </div>

          <div>
            <h3 className="font-semibold text-lg">{user.fullName}</h3>
            {user.location && (
              <div className="flex items-center text-xs opacity-70 mt-1">
                <MapPinIcon className="size-3 mr-1" />
                {user.location}
              </div>
            )}
          </div>
        </div>

        {/* Languages with flags */}
        <div className="flex flex-wrap gap-1.5">
          <span className="badge badge-secondary">
            {getLanguageFlag(user.nativeLanguage)}
            Native: {capitialize(user.nativeLanguage)}
          </span>
          <span className="badge badge-outline">
            {getLanguageFlag(user.learningLanguage)}
            Learning: {capitialize(user.learningLanguage)}
          </span>
        </div>

        {user.bio && <p className="text-sm opacity-70">{user.bio}</p>}

        {/* Action button */}
        <Button
          onClickHandler={onClickHandler}
          isPending={isPending}
          disabled={disabled}
          hasRequestBeenSent={hasRequestBeenSent}
          hasRequestBeenGetted={hasRequestBeenGetted}
          isSendRequestButton={isSendRequestButton}
          isFriendButton={isFriendButton}
          user={user}
        />
      </div>
    </div>
  );
};
export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}
