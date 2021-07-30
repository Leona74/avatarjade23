/**
 * NOTES:
 * The settings embed dialog may be changed in the future.
 *
 * @format
 */

const BaseEmbed = require("../../modules/BaseEmbed");
const { getGuildById } = require("../../utils/functions");

module.exports = {
	name: "settings",
	description: "Shows the current server's settings.",
	category: "exempt",
	aliases: ["conf", "cfg"],
	memberPermissions: ["ADMINISTRATOR"],
	async execute(bot, message) {
		const lang = await bot.getGuildLang(message.guild.id);
		const { name, id: guildId } = message.guild;
		const guild = await getGuildById(guildId);

		const prefix = guild.prefix;
		const levelMsgs = guild?.levelUpModule;
		const antiLinks = guild?.antiLinksModule;
		const welcomeCh = guild?.welcomeModule;
		const leaveCh = guild?.leaveModule;
		const autoRole = guild?.autoRoleModule;
		const arole = message.guild.roles.cache.get(autoRole);

		levelMsgs ? "true" : "Enabled";
		levelMsgs ? "false" : "Disabled";

		antiLinks ? "true" : "Enabled";
		antiLinks ? "false" : "Disabled";

		const embed = BaseEmbed(message)
			.setAuthor(
				`${name}`,
				message.guild.iconURL({ dynamic: true, size: 2048 })
			)
			.setDescription(lang.ADMIN.SETTINGS_DESC)
			.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
			.addField(
				lang.ADMIN.CONFAUTOROLE,
				autoRole !== null ? `${arole}` : lang.ADMIN.DISABLEDONE,
				true
			)
			.addField(
				lang.ADMIN.WELCOME_CHANNELCONF,
				welcomeCh !== null ? `<#${welcomeCh}>` : lang.ADMIN.DISABLEDONE,
				true
			)
			.addField(
				lang.ADMIN.LEAVE_CHANNELCONF,
				leaveCh !== null ? `<#${leaveCh}>` : lang.ADMIN.DISABLEDONE,
				true
			)
			.addField(lang.ADMIN.LEVEL_UP_MESSAGES, levelMsgs, true)
			.addField(lang.ADMIN.ANTILINKS, antiLinks, true)
			.addField(lang.ADMIN.CONFPREFIX, prefix, true);

		message.channel.send({ embed });
	},
};
