/**
 * NOTES:
 * This module may be used in another form of plugin in a next update.
 *
 * @format
 */

const { updateGuildById } = require("../../utils/functions");

module.exports = {
	name: "setleavechannel",
	description: "Reset the leave channel or enabled it.",
	usage: "setleavechannel <Option:option> <Channel:channel_mention>",
	aliases: ["leavechannel", "lchannel"],
	category: "admin",
	options: ["enable", "disable"],
	memberPermissions: ["ADMINISTRATOR"],
	async execute(bot, message, args) {
		const option = args[0];
		const lang = await bot.getGuildLang(message.guild.id);
		const guildId = message.guild.id;
		const item = message.mentions.channels.first();

		if (!option)
			return message.channel.send(lang.ADMIN.PLEASE_DISABLE_OR_ENABLE);

		switch (option.toLowerCase()) {
			case "enable":
				if (!item) {
					return message.channel.send(lang.ADMIN.MENTION_A_CHANNEL);
				}

				updateItem("leaveModule", item, guildId);
				message.channel.send(
					lang.ADMIN.SUCCES_LEAVE_CHANNEL.replace("{item}", item)
				);
				break;

			case "disable":
				updateItemDisable("leaveModule", guildId);
				message.channel.send(lang.ADMIN.LEAVE_CHANNEL_DISABLED);
		}
	},
};

async function updateItem(type, item, guildId) {
	await updateGuildById(guildId, {
		[type]: item,
	});
}

async function updateItemDisable(type, guildId) {
	await updateGuildById(guildId, {
		[type]: null,
	});
}
