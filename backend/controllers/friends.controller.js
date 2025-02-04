import { ERROR, SUCCESS } from "../config/statusText.js";
import Friend from "../models/friend.model.js";
import User from "../models/user.model.js";

export const sendFriendRequest = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const userId = req.user._id
    const existingRequest = await Friend.findOne({
      sender: userId,
      receiver: receiverId,
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    const request = new Friend({
      sender: userId,
      receiver: receiverId,
    });
    await request.save();

    res.json(await request.populate("sender receiver"));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFriends = async (req, res) => {
  const userId = req.user._id;
  try {
    const friendRequests = await Friend.find({
      status: "accepted",
      $or: [{ sender: userId }, { receiver: userId }],
    }).populate("sender receiver");

    const friends = friendRequests.map((request) => {
      return request.sender._id.equals(userId)
        ? {
            _id: request.receiver._id,
            fullName: request.receiver.fullName,
            avatar: request.receiver.avatar,
          }
        : {
            _id: request.sender._id,
            fullName: request.sender.fullName,
            avatar: request.sender.avatar,
          };
    });

    res.json(friends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateFriendStatus = async (req, res) => {
  try {
    const { status, id } = req.body;
    const request = await Friend.findOneAndUpdate(
      { _id: id },
      { status },
      { new: true }
    ).populate("sender receiver");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status === "accepted") {
      await User.findByIdAndUpdate(request.sender, {
        $push: { friends: request._id },
      });
    }

    res.json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeFriend = async (req, res) => {
  try {
    const { id } = req.params;

    const friend = await Friend.findByIdAndDelete(id);

    if (!friend) {
      return res.status(404).json({ message: "Friend not found" });
    }

    res.status(200).json({ message: "Friendship successfully removed" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while removing the friendship" });
  }
};

export const getFriendRequests = async (req, res) => {
  const userId = req.user._id;
  try {
    const requests = await Friend.find({ receiver: userId, status: "pending" }).populate(
      "sender"
    );

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getFriendsToSuggest = async (userId) => {
  try {
    const friendRequests = await Friend.find({
      status: "accepted",
      $or: [{ sender: userId }, { receiver: userId }],
    }).populate("sender receiver");

    const friends = friendRequests.map((request) => {
      return request.sender._id.equals(userId)
        ? {
            _id: request.receiver._id,
            fullName: request.receiver.fullName,
            avatar: request.receiver.avatar,
          }
        : {
            _id: request.sender._id,
            fullName: request.sender.fullName,
            avatar: request.sender.avatar,
          };
    });
    return friends;
  } catch (err) {
    console.log(err);
  }
}
export const getSuggestions = async (req, res) => {
  const userId = req.user._id;
  try {
    const friends = await getFriendsToSuggest(userId);
    if (!friends) {
      return res.status(404).json({ message: "No friends found" });
    }
    const friendsOfFriends = await User.find({ _id: { $in: friends } }).select("friends");
    if (!friendsOfFriends) {
      return res.status(404).json({ message: "No friends of friends found" });
    }
    let suggestionsSet = new Set();
    friendsOfFriends?.forEach((friend) => {
      friend.friends?.forEach((id) => {
        if (
          id.toString() !== userId.toString() && 
          !friends.includes(id.toString())
        ) {
          suggestionsSet.add(id.toString());
        }
      });
    });
    const suggestions = await User.find({ _id: { $in: Array.from(suggestionsSet) } });
    if (!suggestions) {
      return res.status(404).json({ message: "No suggestions found" });
    }
    res.json(suggestions);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
