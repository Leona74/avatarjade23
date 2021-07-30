/**
 * NOTES:
 * New update for a RPG is incomming.
 *
 * @format
 */

const { getUserById, updateUserById } = require("../../utils/functions");
const { stripIndents } = require("common-tags");

module.exports = {
	name: "slots",
	description: "Play at slot-machines.",
	usage: "slots <Number:amount>",
	category: "economy",
	cooldown: 5,
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const { user } = await getUserById(message.author.id);
		const amount = args[0];
		const coins_db = user.userCoins;

		const slots = [
			"<a:charliewave_slotscherry:771477963514183680>",
			"<a:charliewave_slotswatermelon:771477405407117343>",
			"<a:charliewave_slotsseven:771477517319274581>",
			"<a:charliewave_slotslemon:771477851563229184>",
			"<a:charliewave_slotsgrape:771477892466999307>",
			"<a:charliewave_slotsgamble:771477799713374239>",
			"<a:charliewave_slotscoin:771477760857079828>",
		];

		if (!amount) return message.channel.send(lang.ECONOMY.SLOTS_AMOUNT);

		if (isNaN(amount)) return message.channel.send(lang.ECONOMY.INVALID_AMOUN);

		if (!isFinite(amount)) message.channel.send(lang.ECONOMY.INVALID_AMOUN);

		if (amount > coins_db)
			return message.channel.send(lang.ECONOMY.NOT_ENOUGH_COINS);

		if (amount < 100) return message.channel.send(lang.ECONOMY.SLOTS_MINIMUM);

		if (amount > 1000000)
			return message.channel.send(lang.ECONOMY.SLOTS_MAXIMUM);

		const random = 5 * amount;

		function shuffle(array) {
			const arr = array.slice(0);
			for (let i = arr.length - 1; i >= 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				const temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
			}
			return arr;
		}

		const arr1 = shuffle(slots);
		const arr2 = shuffle(slots);
		const arr3 = shuffle(slots);

		const slotMsg = message.channel
			.send(
				stripIndents`
[ :: **SLOTS** :: ]
----------------
${arr1[2]} : ${arr2[0]} : ${arr3[2]}
            
${arr1[1]} : ${arr2[1]} : ${arr3[1]} **«**
            
${arr1[0]} : ${arr2[2]} : ${arr3[0]}
----------------
[ :: **SLOTS** :: ]`
			)
			.then(async (msg) => {
				for (let i = 0; i < 5; i++) {
					arr1.push(arr1.shift());
					arr2.push(arr2.shift());
					arr3.push(arr3.shift());

					setTimeout(
						() =>
							msg.edit(stripIndents`
[ :: **SLOTS** :: ]
----------------
${arr1[0]} : ${arr2[1]} : ${arr3[0]}
              
${arr1[1]} : ${arr2[1]} : ${arr3[1]} **«**
              
${arr1[0]} : ${arr2[2]} : ${arr3[0]}
----------------
[ :: **SLOTS** :: ]`),
						800
					);

					setTimeout(
						() =>
							msg.edit(stripIndents`
[ :: **SLOTS** :: ]
----------------
${arr1[0]} : ${arr2[1]} : ${arr3[0]}
              
${arr1[1]} : ${arr2[1]} : ${arr3[1]} **«**
              
${arr1[0]} : ${arr2[2]} : ${arr3[0]}
----------------
[ :: **SLOTS** :: ]`),
						1300
					);

					if (
						(arr1[1] === arr2[1] && arr1[1] === arr3[1]) ||
						(arr1[1] && arr2[1] === arr1[1] && arr3[1]) ||
						(arr2[1] === arr1[1] && arr2[1] === arr3[1]) ||
						(arr3[1] === arr2[1] && arr3[1] === arr1[1]) ||
						(arr3[1] && arr2[1] === arr3[1] && arr1[1]) ||
						(arr1[1] === arr3[1] && arr3[1] && arr2[1])
					) {
						await updateUserById(message.author.id, {
							userCoins: user.userCoins + random,
						});

						const win_msg = lang.ECONOMY.SLOTS_WIN.replace(
							"{user}",
							message.author.tag
						)
							.replace("{amount}", amount.toLocaleString())
							.replace("{random}", random.toLocaleString());

						return setTimeout(
							() =>
								msg.edit(stripIndents`
[ :: **SLOTS** :: ]
----------------
${arr1[2]} : ${arr2[0]} : ${arr3[2]}

${arr1[1]} : ${arr2[1]} : ${arr3[1]} **«**
              
${arr1[0]} : ${arr2[2]} : ${arr3[0]}
----------------
[ :: **SLOTS** :: ]

${win_msg}`),
							2300
						);
					}

					await updateUserById(message.author.id, {
						userCoins: user.userCoins - amount,
					});
					const lose_msg = lang.ECONOMY.SLOTS_LOSE.replace(
						"{user}",
						message.author.tag
					).replace("{amount}", amount.toLocaleString());
					return setTimeout(
						() =>
							msg.edit(stripIndents`
[ :: **SLOTS** :: ]
----------------
${arr1[2]} : ${arr2[0]} : ${arr3[2]}
                  
${arr1[1]} : ${arr2[1]} : ${arr3[1]} **«**
                  
${arr1[0]} : ${arr2[2]} : ${arr3[0]}
----------------
[ :: **SLOTS** :: ]

${lose_msg}`),
						2300
					);
				}
			});
	},
};
