/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
	name: "avatar",
	description: "Provide your's pfp (profile pic.) or mentioned user.",
	usage: "avatar <User:user_mention>",
	category: "general",
	aliases: ["av"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const member = bot.findMember(message, args, true);

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

		const webp = avatar(member, "webp");
		const jpg = avatar(member, "jpg");
		const png = avatar(member, "png");

		const embed = BaseEmbed(message)
			.setTitle(
				`${member.user.tag} ${getTargetEmojiByStatus(
					member.user.presence.status,
					member.user.presence.clientStatus != undefined &&
						member.user.presence.clientStatus.mobile
				)}`
			)
			.setDescription(`[.webp](${webp}) - [.png](${png}) - [.jpg](${jpg})`)
			.setImage(`${webp}`);

		message.channel.send(embed);
	},
};

function avatar(member, format) {
	return member.user.displayAvatarURL({
		dynamic: true,
		size: 1024,
		format,
	});
}
