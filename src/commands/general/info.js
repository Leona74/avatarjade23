/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

const BaseEmbed = require("../../modules/BaseEmbed");
const { getGuildById } = require("../../utils/functions");
const { stripIndents } = require("common-tags");

function getTargetEmojiByStatus(status, mobile) {
	switch (status) {
		case "dnd":
			return "<:charliewave_dnd:771635335486111744>";
		case "idle":
			return "<:charliewave_idle:771635289839501333>";
		case "offline":
			return "<:charliewave_offline:771635390871502858>";
		case "online":
			return mobile === "online"
				? "<:charliewave_mobile:771635443698499584>"
				: "<:charliewave_online:771635233384693791>";
	}
}

module.exports = {
	name: "info",
	description: "Fetches Charliewaves's information.",
	usage: "info",
	aliases: ["about", "botinfo", "binfo", "botstats", "bstats", "bot"],
	category: "general",
	async execute(bot, message) {
		const guildId = message.guild.id;
		const lang = await bot.getGuildLang(guildId);

		const guild = await getGuildById(message.guild.id);
		const prefix = guild.prefix;

		const botInvite = `https://discord.com/oauth2/authorize?client_id=772497789561208872&permissions=1916267615&scope=bot`;

		const botDesc =
			lang.GENERAL.INFOBOT_DESCONE +
			`\n\n` +
			lang.GENERAL.INFOBOT_DESCTWO.replace("{prefix}", prefix);

		const embed = BaseEmbed(message)
			.setTitle(
				`${message.client.user.username} ${getTargetEmojiByStatus(
					message.client.presence.status,
					message.client.presence.clientStatus != undefined &&
						message.client.presence.clientStatus.mobile
				)}`
			)
			.setThumbnail(
				bot.user.avatarURL({ dynamic: true, size: 2048, format: "png" })
			)
			.setDescription(
				stripIndents`
    ${botDesc}
    [GitHub](https://github.com/charliewave-me)
    [Public Website](https://charliewave.me)
    [Support](https://discord.gg/u4RRQxxhkM)
    [Invite Now!](${botInvite})
    `
			)
			.addField(
				`**${lang.GENERAL.INFO_UPDATES}:**`,
				`[clickToRedirect](https://github.com/charliewave-me/client/commit/main)`,
				true
			)
			.addField(
				`**${lang.GENERAL.INFOBOT_AUTHOR}:**`,
				`${bot.users.cache.get("565960314970177556").tag}`,
				true
			)
			.addField(`**${lang.GENERAL.INFOBOT_BOT_DEVS}:**`, `github service`, true)
			.setImage(
				"https://cdn.discordapp.com/attachments/789862793846325248/857918055731167253/Black__Yellow_Social_Media_Day_Banner.png"
			);

		message.channel.send(embed);
	},
};
