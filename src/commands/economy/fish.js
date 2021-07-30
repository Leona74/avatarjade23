/**
 * NOTES:
 * New update for a RPG is incomming.
 *
 * @format
 */

const { getUserById, updateUserById } = require("../../utils/functions");
const fishes = require("../../data/fishes.json");
const { stripIndent } = require("common-tags");
const ms = require("ms");

module.exports = {
	name: "fish",
	description: "Play at fishing minigame to warn XP and coins.",
	usage: "fish",
	category: "economy",
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const member = message.author;
		const timeout = 600000;

		function randomRange(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		const fishID = Math.floor(Math.random() * 10) + 1;
		let rarity;
		if (fishID < 5) rarity = "junk";
		else if (fishID < 8) rarity = "common";
		else if (fishID < 9) rarity = "uncommon";
		else if (fishID < 10) rarity = "rare";
		else rarity = "legendary";
		const fish = fishes[rarity];
		const worth = randomRange(fish.min, fish.max);

		const { user } = await getUserById(member.id);
		const fishcooldown = user.fishCooldown;

		if (fishcooldown !== null && timeout - (Date.now() - fishcooldown) > 0) {
			let time = ms(timeout - (Date.now() - fishcooldown), { long: true });

			message.channel.send(
				lang.ECONOMY.RECENTLY_FISHED.replace("{time}", `${time}`)
			);
		} else {
			const xp = Math.floor(Math.random() * 10) + 1;

			if (!args[0]) {
				message.channel.send(stripIndent`
[ :: **FISH MINIGAME** :: ]
----------------------------
:fishing_pole_and_fish:  - ${lang.ECONOMY.FISHERMAN_NAME}: 
\u3000 ${member.tag}

${lang.ECONOMY.CAUGHT_FISH}:
\u3000 ${fish.symbol}

${lang.ECONOMY.COINS_EARNED}:
\u3000 ${worth} :coin:

${lang.ECONOMY.XP_EARNED}:
\u3000 ${xp} <:charliewave_exp:771448234672521236>
----------------------------
[ :: **FISH MINIGAME** :: ]
`);

				await updateUserById(member.id, {
					userCoins: user.userCoins + worth,
					userXp: user.userXp + xp,
					fishCooldown: Date.now(),
				});
			}
		}
	},
};
