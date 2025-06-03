import { useEffect, useState } from "react";
import { FriendCard, NoUsersFound } from "../components";
import {
  useIncomingFriendRequests,
  useOutgoingFriendRequests,
  useRecommendedUsers,
  useSendFriendRequest,
} from "../hooks";
import { useNavigate } from "react-router";

const HomePage = () => {
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());
  const [incomingRequestsIds, setIncomingRequestsIds] = useState(new Set());

  const { recommendedUsers, loadingUsers } = useRecommendedUsers();
  const { outgoingFriendsReqs } = useOutgoingFriendRequests();
  const { incomingFriendsReqs } = useIncomingFriendRequests();
  const { sendRequestMutation, isPending } = useSendFriendRequest();

  const navigate = useNavigate();

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendsReqs && outgoingFriendsReqs.length > 0) {
      outgoingFriendsReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendsReqs]);

  useEffect(() => {
    const incomingIds = new Set();
    if (
      incomingFriendsReqs.incomingReqs &&
      incomingFriendsReqs.incomingReqs.length > 0
    ) {
      incomingFriendsReqs.incomingReqs.forEach((req) => {
        incomingIds.add(req.sender._id);
      });
      setIncomingRequestsIds(incomingIds);
    }
  }, [incomingFriendsReqs]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Meet New Learners
                </h2>
                <p className="opacity-70">
                  Discover perfect language exchange partners based on your
                  profile
                </p>
              </div>
            </div>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <NoUsersFound />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);
                const hasRequestBeenGetted = incomingRequestsIds.has(user._id);

                return (
                  <FriendCard
                    onClickHandler={() => {
                      if (!hasRequestBeenSent && !hasRequestBeenGetted) {
                        sendRequestMutation(user._id);
                      } else {
                        navigate("/notifications");
                      }
                    }}
                    key={user._id}
                    user={user}
                    isPending={isPending}
                    disabled={isPending || hasRequestBeenSent}
                    hasRequestBeenSent={hasRequestBeenSent}
                    hasRequestBeenGetted={hasRequestBeenGetted}
                    isSendRequestButton={true}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
