const { removeGuild, removeUserWarnings } = require("../../utils/functions");

module.exports = {
	name: "guildDelete",
	async execute(bot, guild) {
		await removeGuild(guild.id);

		guild.members.cache.forEach(async (member) => {
			await removeUserWarnings(member.id, guild.id);
		});
	},
};
