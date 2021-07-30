/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

const { getUserById, updateUserById } = require("../../utils/functions");

module.exports = {
	name: "afk",
	aliases: ["setafk", "makemeafk"],
	category: "general",
	description:
		"Modify your afk statement, make it be on so others users see you as an afk user or not.",
	usage: "afk <Reason:str>",
	async execute(bot, message, args) {
		const guildId = message.guild.id;
		const userId = message.author.id;
		const lang = await bot.getGuildLang(guildId);
		const { user } = await getUserById(userId);

		if (user.afkState.is_afk) {
			await updateUserById(userId, {
				afkState: { is_afk: false, reason: null },
			});

			return message.channel.send(lang.AFK.NOT_ANYMORE);
		}

		const reason = args.join(" ") || "N/A";

		await updateUserById(userId, {
			afkState: { is_afk: true, reason: reason },
		});

		message.channel.send(lang.AFK.AFK_STATEMENT.replace("{reason}", reason));
	},
};
