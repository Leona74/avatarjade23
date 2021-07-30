/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

const BaseEmbed = require("../../modules/BaseEmbed");
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
	name: "invite",
	aliases: ["inviteme", "invitebot"],
	category: "general",
	description: "Gives you the invite link for Charliewave.",
	async execute(bot, message, args) {
		const botInvite = `https://discord.com/oauth2/authorize?client_id=772497789561208872&permissions=1916267615&scope=bot`;
		const guildId = message.guild.id;
		const lang = await bot.getGuildLang(guildId);

		const embed = BaseEmbed(message)
			.setTitle(
				`${message.client.user.username} ${getTargetEmojiByStatus(
					message.client.presence.status,
					message.client.presence.clientStatus != undefined &&
						message.client.presence.clientStatus.mobile
				)}`
			)
			.setDescription(
				stripIndents`
    [Public Website](https://charliewave.me)
    [Support](https://discord.gg/u4RRQxxhkM)
    [Invite Now!](${botInvite})

${lang.HELP.INVITENOW}

    `
			)
			.setImage("https://i.imgur.com/nYZWD0i.png")
			.setThumbnail(
				bot.user.avatarURL({ dynamic: true, size: 2048, format: "png" })
			);

		message.channel.send(embed);
	},
};
