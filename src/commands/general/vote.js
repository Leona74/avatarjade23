/**
 * NOTES:
 * The API is in beta and still experimental and will be updated in a future release.
 *
 * @format
 */

const Topgg = require(`@top-gg/sdk`);
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
	name: "vote",
	description:
		"<:topggvote:806573769485320312> Vote Charliewave on top.gg website.",
	category: "general",
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		const api = new Topgg.Api(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc3MjQ5Nzc4OTU2MTIwODg3MiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjEyMzc2ODYyfQ.5IuRwHOUflxD142D7jiHyGZFMEB1WNcyughGLrpNq9Q"
		);

		const embed = BaseEmbed(message)
			.setThumbnail(
				bot.user.avatarURL({ dynamic: true, size: 2048, format: "png" })
			)
			.setDescription(lang.GENERAL.VOTE_NOW)
			.setFooter("www.charliewave.me/vote", "https://i.imgur.com/hd6TR80.png");

		api.hasVoted(message.author.id).then((votes) => {
			if (votes == false) {
				message.channel.send(embed);
			} else {
				message.channel.send(lang.GENERAL.ALREADY_VOTED);
			}
		});
	},
};
