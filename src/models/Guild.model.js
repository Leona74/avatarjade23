const { model, Schema, models } = require("mongoose");

const guildSchema = new Schema({
	guildId: { type: String, required: true },
	prefix: { type: String, default: "/" },
	levelUpModule: { type: Boolean, default: true },
	antiLinksModule: { type: Boolean, default: false },
	autoRoleModule: { type: String, default: null },
	welcomeModule: { type: String, default: null },
	leaveModule: { type: String, default: null },
	customCommands: { type: Array, default: [] },
	disabledCommands: { type: Array, default: [] },
	disabledCategories: { type: Array, default: [] },
	locale: { type: String, default: "english" },
	ignoredChannels: { type: Array, default: [] },
});

module.exports = models.Guild || model("Guild", guildSchema);
