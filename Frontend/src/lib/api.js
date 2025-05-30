import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  try {
    const res = await axiosInstance.post("/auth/signup", signupData);
    return res.data;
  } catch (error) {
    console.log("Error in signup:", error.response.data.message);
    return null;
  }
};

export const login = async (loginData) => {
  try {
    const res = await axiosInstance.post("/auth/login", loginData);
    return res.data;
  } catch (error) {
    console.log("Error in login:", error.response.data.message);
    return null;
  }
};

export const logout = async () => {
  try {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
  } catch (error) {
    console.log("Error in logout:", error.response.data.message);
    return null;
  }
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error.response.data.message);
    return null;
  }
};

export const completeOnBoarding = async (userData) => {
  try {
    const res = await axiosInstance.post("/auth/onboarding", userData);
    return res.data;
  } catch (error) {
    console.log("Error in completeOnBoarding:", error.response.data.message);
    return null;
  }
};

// Friends

export async function getUserFriends() {
  try {
    const response = await axiosInstance.get("/users/friends");
    return response.data;
  } catch (error) {
    console.log("Error in getUserFriends:", error.response.data.message);
    return null;
  }
}

export async function getRecommendedUsers() {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (error) {
    console.log("Error in getRecommendedUsers:", error.response.data.message);
    return null;
  }
}

export async function getOutgoingFriendReqs() {
  try {
    const response = await axiosInstance.get("/users/outgoing-friend-requests");
    return response.data;
  } catch (error) {
    console.log("Error in getOutgoingFriendReqs:", error.response.data.message);
    return null;
  }
}

export async function sendFriendRequest(userId) {
  try {
    const response = await axiosInstance.post(
      `/users/friend-request/${userId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error in sendFriendRequest:", error.response.data.message);
    return null;
  }
}

export async function getFriendRequests() {
  try {
    const response = await axiosInstance.get("/users/friend-requests");
    return response.data;
  } catch (error) {
    console.log("Error in getFriendRequests:", error.response.data.message);
    return null;
  }
}

export async function acceptFriendRequest(requestId) {
  try {
    const response = await axiosInstance.put(
      `/users/friend-request/${requestId}/accept`
    );
    return response.data;
  } catch (error) {
    console.log("Error in acceptFriendRequest:", error.response.data.message);
    return null;
  }
}

export async function rejectFriendRequest(requestId) {
  try {
    const response = await axiosInstance.put(
      `/users/friend-request/${requestId}/reject`
    );
    return response.data;
  } catch (error) {
    console.log("Error in rejectFriendRequest:", error.response.data.message);
    return null;
  }
}

export async function getStreamToken() {
  try {
    const response = await axiosInstance.get("/chat/token");
    return response.data;
  } catch (error) {
    console.log("Error in getStreamToken:", error.response.data.message);
    return null;
  }
}
