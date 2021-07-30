/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

const { updateGuildById, getGuildById } = require("../../utils/functions");

module.exports = {
	name: "autorole",
	description: "Reset the autorole or enabled it.",
	usage: "autorole <Option:option> <Role:role_mention>",
	aliases: ["setautorole", "welcomerole"],
	category: "admin",
	options: ["enable", "disable"],
	memberPermissions: ["ADMINISTRATOR"],
	async execute(bot, message, args) {
		const option = args[0];
		const lang = await bot.getGuildLang(message.guild.id);
		const guildId = message.guild.id;
		const item = message.mentions.roles.first();
		const guild = await getGuildById(message.guild.id);
		const prefix = guild.prefix;

		if (!option)
			return message.channel.send(lang.ADMIN.PLEASE_DISABLE_OR_ENABLE);

		switch (option.toLowerCase()) {
			case "enable":
				if (!item) {
					return message.channel.send(
						lang.ADMIN.MENTION_A_ROLE.replace("{prefix}", prefix)
					);
				}

				updateItem("autoRoleModule", item, guildId);
				message.channel.send(
					lang.ADMIN.SUCCES_AUTOROLE_SET.replace("{item}", item)
				);
				break;

			case "disable":
				updateItemDisable("autoRoleModule", guildId);
				message.channel.send(lang.ADMIN.AUTOROLE_DISABLED);
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
