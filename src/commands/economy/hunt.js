/**
 * NOTES:
 * New update for a RPG is incomming.
 *
 * @format
 */

const { getUserById, updateUserById } = require("../../utils/functions");
const animals = require("../../data/animals.json");
const { stripIndent } = require("common-tags");
const ms = require("ms");

module.exports = {
	name: "hunt",
	description: "Play at hunting minigame to warn XP and coins.",
	usage: "hunt",
	category: "economy",
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const member = message.author;
		const timeout = 600000;

		function randomRange(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		const animalID = Math.floor(Math.random() * 10) + 1;
		let rarity;
		if (animalID < 5) rarity = "junk";
		else if (animalID < 8) rarity = "common";
		else if (animalID < 9) rarity = "uncommon";
		else if (animalID < 10) rarity = "rare";
		else rarity = "legendary";
		const animal = animals[rarity];
		const worth = randomRange(animal.min, animal.max);

		const { user } = await getUserById(member.id);
		const huntcooldown = user.huntCooldown;

		if (huntcooldown !== null && timeout - (Date.now() - huntcooldown) > 0) {
			let time = ms(timeout - (Date.now() - huntcooldown), { long: true });

			message.channel.send(
				lang.ECONOMY.RECENTLY_HUNTED.replace("{time}", `${time}`)
			);
		} else {
			const xp = Math.floor(Math.random() * 10) + 1;

			if (!args[0]) {
				message.channel.send(stripIndent`
[ :: **HUNT MINIGAME** :: ]
----------------------------
🏹 - ${lang.ECONOMY.HUNTERMAN_NAME}: 
\u3000 ${member.tag}

${lang.ECONOMY.HUNTED_ANIMAL}:
\u3000 ${animal.symbol}

${lang.ECONOMY.COINS_EARNED}:
\u3000 ${worth} :coin:

${lang.ECONOMY.XP_EARNED}:
\u3000 ${xp} <:charliewave_exp:771448234672521236>
----------------------------
[ :: **HUNT MINIGAME** :: ]
`);

				await updateUserById(member.id, {
					userCoins: user.userCoins + worth,
					userXp: user.userXp + xp,
					huntCooldown: Date.now(),
				});
			}
		}
	},
};
