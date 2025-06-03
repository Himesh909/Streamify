import {
  BellIcon,
  ClockIcon,
  MessageSquareIcon,
  UserCheckIcon,
} from "lucide-react";
import { Button, NoNotificationsFound } from "../components";
import { capitialize } from "../lib/utils";
import { LANGUAGE_TO_FLAG } from "../constants";
import { useState, useEffect } from "react";
import {
  useAcceptFriendRequest,
  useFriendRequests,
  useRejectFriendRequest,
} from "../hooks";

const NotificationsPage = () => {
  const [pendingAcceptId, setPendingAcceptId] = useState(null);
  const [pendingRejectId, setPendingRejectId] = useState(null);

  const { acceptRequestMutation, isAccepting } = useAcceptFriendRequest();
  const { rejectRequestMutation, isRejecting } = useRejectFriendRequest();
  const { incomingRequests, acceptedRequests, isLoading } = useFriendRequests();

  // Clear pending IDs when operations complete
  useEffect(() => {
    if (!isAccepting && pendingAcceptId) {
      setPendingAcceptId(null);
    }
  }, [isAccepting]);

  useEffect(() => {
    if (!isRejecting && pendingRejectId) {
      setPendingRejectId(null);
    }
  }, [isRejecting]);

  // Handle accept and reject with specific request tracking
  const handleAcceptRequest = (requestId) => {
    setPendingAcceptId(requestId);
    acceptRequestMutation(requestId);
  };

  const handleRejectRequest = (requestId) => {
    setPendingRejectId(requestId);
    rejectRequestMutation(requestId);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          Notifications
        </h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            {incomingRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <UserCheckIcon className="h-5 w-5 text-primary" />
                  Friend Requests
                  <span className="badge badge-primary ml-2">
                    {incomingRequests.length}
                  </span>
                </h2>

                <div className="space-y-3">
                  {incomingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="avatar w-14 h-14 rounded-full bg-base-300">
                              <img
                                src={request.sender.profilePic}
                                alt={request.sender.fullName}
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold">
                                {request.sender.fullName}
                              </h3>
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                <span className="badge badge-secondary text-xs">
                                  {getLanguageFlag(
                                    request.sender.nativeLanguage
                                  )}
                                  Native:{" "}
                                  {capitialize(request.sender.nativeLanguage)}
                                </span>
                                <span className="badge badge-outline text-xs">
                                  {getLanguageFlag(
                                    request.sender.learningLanguage
                                  )}
                                  Learning:{" "}
                                  {capitialize(request.sender.learningLanguage)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              isAcceptButton={true}
                              isPending={isAccepting}
                              pendingId={pendingAcceptId}
                              itemId={request._id}
                              onClickHandler={() =>
                                handleAcceptRequest(request._id)
                              }
                            />
                            <Button
                              isRejectButton={true}
                              isPending={isRejecting}
                              pendingId={pendingRejectId}
                              itemId={request._id}
                              onClickHandler={() =>
                                handleRejectRequest(request._id)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ACCEPTED REQS NOTIFICATONS */}
            {acceptedRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BellIcon className="h-5 w-5 text-success" />
                  New Connections
                </h2>

                <div className="space-y-3">
                  {acceptedRequests.map((notification) => (
                    <div
                      key={notification._id}
                      className="card bg-base-200 shadow-sm"
                    >
                      <div className="card-body p-4">
                        <div className="flex items-start gap-3">
                          <div className="avatar mt-1 size-10 rounded-full">
                            <img
                              src={notification.recipient.profilePic}
                              alt={notification.recipient.fullName}
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">
                              {notification.recipient.fullName}
                            </h3>
                            <p className="text-sm my-1">
                              {notification.recipient.fullName} accepted your
                              friend request
                            </p>
                            <p className="text-xs flex items-center opacity-70">
                              <ClockIcon className="h-3 w-3 mr-1" />
                              Recently
                            </p>
                          </div>
                          <div className="badge badge-success">
                            <MessageSquareIcon className="h-3 w-3 mr-1" />
                            New Friend
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <NoNotificationsFound />
            )}
          </>
        )}
      </div>
    </div>
  );
};

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

export default NotificationsPage;
