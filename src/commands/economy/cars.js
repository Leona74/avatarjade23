/**
 * NOTES:
 * New update for a RPG is incomming.
 *
 * @format
 */

module.exports = {
	name: "cars",
	description: "Sees the race cars available for the race command.",
	usage: "",
	category: "economy",
	aliases: ["racecars"],
	async execute(bot, message, args) {
		await message.channel.send({
			files: [
				{
					attachment: "https://i.imgur.com/gLoEn06.png",
					name: "cars-showcase.png",
				},
			],
		});
	},
};
