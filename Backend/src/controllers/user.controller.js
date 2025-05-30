import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";
import { isValidObjectId } from "mongoose";

export async function getRecommendedUser(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recommendedUser = await User.find({
      $and: [
        {
          _id: { $ne: currentUserId }, // ne = not equalto
        },
        {
          _id: { $nin: currentUser.friends }, // nin = not include
        },
        {
          isOnBoarded: true,
        },
      ],
    });

    res.status(200).json(recommendedUser);
  } catch (error) {
    console.error("Error in getRecommendedUser controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage"
      );
    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error in getMyFriends controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function sendFriendRequest(req, res) {
  const { id: recipientId } = req.params;
  const myId = req.user._id;

  try {
    // Prevent Sending Request to you self
    if (myId.toString() === recipientId.toString()) {
      return res
        .status(400)
        .json({ message: "You can't send friend request to yourself" });
    }

    const recipient = await User.findById(recipientId);

    if (!recipient) {
      return res.status(404).json({ message: "User not found" });
    }

    // Checks if user is already friends
    if (recipient.friends.includes(myId)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this User" });
    }

    // Check if a request already exists
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "A friend Request is already exists between you and this User",
      });
    }

    const createRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
      status: "pending",
    });

    res.status(201).json(createRequest);
  } catch (error) {
    console.error("Error in sendFriendRequest controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function acceptFriendRequest(req, res) {
  const { id: requestId } = req.params;
  try {
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend Request not Found" });
    }

    // Verify the current user is recipent
    if (friendRequest.recipient.toString() === req.user._id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to accept this Request" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    // Add each users (userId) to others friends array
    // $addToSet: adds elements to an array only if they do not already exists
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    res.status(200).json({ message: "Friend Request Accepted" });
  } catch (error) {
    console.error("Error in acceptFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function rejectFriendRequest(req, res) {
  const { id: requestId } = req.params;
  try {
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend Request not Found" });
    }

    // Verify the current user is recipent
    if (friendRequest.recipient.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to reject this Request" });
    }

    await FriendRequest.findByIdAndDelete(requestId);

    res.status(200).json({ message: "Friend Request Rejected" });
  } catch (error) {
    console.error("Error in rejectFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getFriendRequests(req, res) {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    const acceptedReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.error("Error in getFriendRequests controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getOutgoingFriendRequests(req, res) {
  try {
    const outgoingReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage"
    );
    res.status(200).json(outgoingReqs);
  } catch (error) {
    console.error(
      "Error in getOutgoingFriendRequests controller",
      error.message
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
}
