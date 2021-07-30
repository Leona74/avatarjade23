/**
 * NOTES:
 * Command runs without issues.
 *
 * @format
 */

module.exports = {
	name: "nuke",
	description: "Nuke the current channel, delete all messages of the channel.",
	usage: "nuke",
	category: "moderator",
	botPermissions: ["MANAGE_GUILD"],
	memberPermissions: ["MANAGE_GUILD"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		let channel = bot.channels.cache.get(message.channel.id);
		let position = channel.position;
		let topic = channel.topic;

		message.react("👍");
		message.react("👎");
		message.reply(lang.MODERATOR.NUKE_CHALLANGE);

		message
			.awaitReactions(
				(reaction, user) =>
					user.id == message.author.id &&
					(reaction.emoji.name == "👍" || reaction.emoji.name == "👎"),

				{ max: 1, time: 30000 }
			)
			.then((collected) => {
				if (collected.first().emoji.name == "👍") {
					let channel2 = channel.clone();
					channel2.setPosition(position);
					channel2.setTopic(topic);
					channel2.send(lang.MODERATOR.NUKE_COLLECTOR);
				} else message.channel.send(lang.MODERATOR.NUKE_CANCELED);
			})
			.catch(() => {
				channel.delete();
			});
	},
};
