/**
 * NOTES:
 * Command may be remove in a future version.
 *
 * @format
 */

module.exports = {
	name: "year-progress",
	description: "Responds with the progress of the current year.",
	category: "general",
	aliases: ["year", "year-prog", "y-progress", "y-prog"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const today = new Date();
		const start = new Date(today.getFullYear(), 0, 1);
		const end = new Date(today.getFullYear() + 1, 0, 1);
		const percent = (Math.abs(today - start) / Math.abs(end - start)) * 100;

		return message.channel.send(
			lang.GENERAL.YEAR_PROGRESS.replace("{year}", today.getFullYear()).replace(
				"{percent}",
				percent
			)
		);
	},
};
