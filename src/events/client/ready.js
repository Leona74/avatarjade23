const { statuses, presences } = require("../../data/presences.json");
const Logger = require("../../modules/Logger");

module.exports = {
	name: "ready",
	execute(bot) {
		const serverCount = bot.formatNumber(bot.guilds.cache.size);
		const channelCount = bot.formatNumber(bot.channels.cache.size);
		const userCount = bot.formatNumber(
			bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
		);
		const userCacheCount = bot.formatNumber(bot.users.cache.size);
		const commandsCount = bot.formatNumber(bot.commands.size);
		const modelsCount = bot.formatNumber(5);
		const helpersCount = bot.formatNumber(1);

		console.log(`---------------------`);
		console.log(`Interacted with ${serverCount} guilds.`);
		console.log(`Interacted with ${channelCount} channels.`);
		console.log(
			`Interacted with ${userCount} users (only ${userCacheCount} cached).`
		);
		console.log(`---------------------`);
		console.log(`Loaded ${commandsCount} commands.`);
		console.log(`Loaded ${modelsCount} models.`);
		console.log(`Loaded ${helpersCount} helpers.`);
		console.log(`---------------------`);
		Logger.log("Client", `${bot.user.username} is online.`);

		let i = 0;

		setInterval(() => {
			const textArray = statuses;
			const activityArray = presences;

			bot.user.setActivity(textArray[i], { type: activityArray[i] });

			i++;

			if (i == 2) i = 0;
		}, 60000);
	},
};
