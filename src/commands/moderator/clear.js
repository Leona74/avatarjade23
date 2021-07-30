/**
 * TODO:
 * Nothing, the best purge command available.
 *
 * @format
 */

module.exports = {
	name: "clear",
	description: "Deletes a bulk of specified messages.",
	usage: "clear <Number:limit> <Str:opition>",
	aliases: ["purge", "clean", "prune"],
	category: "moderator",
	options: ["link", "invite", "bots", "you", "me", "upload", "user:user "],
	memberPermissions: ["MANAGE_MESSAGES"],
	botPermissions: ["MANAGE_MESSAGES"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		let limit = Number(args[0]);

		if (!limit) {
			limit = 50;
		}

		const filter = null;

		let messages = await message.channel.messages.fetch({ limit: 100 });

		function getFilter(message, filter, user) {
			switch (filter) {
				case "link": {
					return (mes) => /https?:\/\/[^ /.]+\.[^ /.]+/.test(mes.content);
				}

				case "invite": {
					return (mes) =>
						/(https?:\/\/)?(www\.)?(discord\.(com|gg|li|me|io)|discordapp\.com\/invite)\/.+/.test(
							mes.content
						);
				}

				case "bots": {
					return (mes) => mes.author.bot;
				}

				case "you": {
					return (mes) => mes.author.id === this.client.user.id;
				}

				case "me": {
					return (mes) => mes.author.id === message.author.id;
				}

				case "upload": {
					return (mes) => mes.attachments.size > 0;
				}

				case "user": {
					return (mes) => mes.author.id === user.id;
				}

				default: {
					return () => true;
				}
			}
		}

		if (filter) {
			const user = typeof filter !== "string" ? filter : null;
			const type = typeof filter === "string" ? filter : "user";

			messages = messages.filter(getFilter(message, type, user));
		}

		messages = messages.array().slice(0, limit);
		await message.channel.bulkDelete(messages).catch(function (error) {
			message.channel.send(error.message);

			if (!error) {
				message.channel
					.send(
						lang.MODERATOR.DONE_ACTION_CLEAR.replace(
							"{messages}",
							messages.length
						).replace("{filter}", filter === null ? "everyone" : filter)
					)
					.then((msg) => {
						setTimeout(() => {
							msg.delete();
						}, 2000);
					});
			}
		});
	},
};
