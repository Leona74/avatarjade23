const { model, Schema, models } = require("mongoose");

const userSchema = new Schema({
	userId: { type: String, required: true },
	userBio: { type: String, default: "N/A" },
	userCoins: { type: Number, default: 0 },
	userBank: { type: Number, default: 0 },
	userReps: { type: Number, default: 0 },
	userXp: { type: Number, default: 0 },
	dailyCooldown: { type: Number, default: null },
	weeklyCooldown: { type: Number, default: null },
	fishCooldown: { type: Number, default: null },
	huntCooldown: { type: Number, default: null },
	repCooldown: { type: Number, default: null },
	robCooldown: { type: Number, default: null },
	afkState: {
		type: Object,
		default: {
			is_afk: false,
			reason: null,
		},
	},
});

module.exports = models.User || model("User", userSchema);
