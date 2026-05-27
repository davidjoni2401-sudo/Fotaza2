import User from "./User.js";
import Post from "./Post.js";
import Comment from "./Comment.js";
import Rating from "./Rating.js";
import Follow from "./Follow.js";
import Notification from "./Notification.js";
import Collection from "./Collection.js";
import CollectionPost from "./CollectionPost.js";
import Interest from "./Interest.js";

User.hasMany(Post, {
    foreignKey: "user_id"
});

Post.belongsTo(User, {
    foreignKey: "user_id"
});

User.hasMany(Comment, {
    foreignKey: "user_id"
});

Comment.belongsTo(User, {
    foreignKey: "user_id"
});

Post.hasMany(Comment, {
    foreignKey: "post_id"
});

Comment.belongsTo(Post, {
    foreignKey: "post_id"
});

User.hasMany(Rating, {
    foreignKey: "user_id"
});

Rating.belongsTo(User,{
    foreignKey: "user_id"
});

Post.hasMany(Rating, {
    foreignKey: "post_id"
});

Rating.belongsTo(Post, {
    foreignKey: "post_id"
});

User.hasMany(Follow, {
    foreignKey: "follower_id",
    as: "following"
});

User.hasMany(Follow, {
    foreignKey: "following_id",
    as: "followers"
});

Follow.belongsTo(User, {
    foreignKey: "follower_id",
    as: "follower"
});

Follow.belongsTo(User, {
    foreignKey: "following_id",
    as: "followingUser"
});

User.hasMany(Notification, {
    foreignKey: "user_id",
    as: "notifications"
});

Notification.belongsTo(User, {
    foreignKey: "from_user_id",
    as: "fromUser"
});

User.hasMany(Collection, {
    foreignKey: "user_id"
});

Collection.belongsTo(User, {
    foreignKey: "user_id"
});

Collection.hasMany(CollectionPost, {
    foreignKey: "collection_id"
});

CollectionPost.belongsTo(Collection, {
    foreignKey: "collection_id"
});

Post.hasMany(CollectionPost, {
    foreignKey: "post_id"
});

CollectionPost.belongsTo(Post, {
    foreignKey: "post_id"
});

User.hasMany(Interest, {
    foreignKey: "user_id"
});

Interest.belongsTo(User, {
    foreignKey: "user_id"
});

Post.hasMany(Interest, {
    foreignKey: "post_id"
});

Interest.belongsTo(Post, {
    foreignKey: "post_id"
});

export {
    User,
    Post,
    Comment,
    Rating,
    Follow,
    Notification,
    Collection,
    CollectionPost,
    Interest
};