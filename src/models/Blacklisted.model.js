const { model, Schema, models } = require("mongoose");

const blacklistSchema = new Schema({
	userId: { type: String, required: true },
});

module.exports = models.Blacklisted || model("Blacklisted", blacklistSchema);
