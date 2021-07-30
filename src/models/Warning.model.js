const { model, Schema, models } = require("mongoose");

const warningSchema = new Schema({
	userId: { type: String, required: true },
	guildId: { type: String, required: true },
	reason: { type: String, default: null },
	date: { type: Number, default: () => Date.now() },
});

module.exports = models.Warning || model("Warning", warningSchema);
