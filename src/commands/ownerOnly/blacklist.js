/**
 * NOTES:
 * Only in case some customer breaks the tos.
 *
 * @format
 */

const { owners } = require("../../../config.json");
const Blacklisted = require("../../models/Blacklisted.model");

module.exports = {
	name: "blacklist",
	description:
		"Block a user from using this client.",
	category: "ownerOnly",
	usage: "blacklist <User:user>",
	ownerOnly: true,
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const type = args[0];
		let member = await bot.findMember(message, args);

		if (!member) member = { username: "N/A", id: args[1], tag: "N/A" };

		if (!type) {
			return message.channel.send(lang.OWNER.BL_USAGE);
		}

		if (member.id === bot.user.id) {
			return message.channel.send(lang.OWNER.BL_BOT_DENIED);
		}

		if (owners.includes(member.id)) {
			return message.channel.send(lang.OWNER.BL_OWNER_DENIED);
		}

		const users = await Blacklisted.find();

		const existing = users.filter((u) => u.userId === member.id)[0];
		
        if (existing) {
			return message.channel.send(
				lang.OWNER.ALREADY_BL.replace("{member}", member.id)
			);
		}

		const blUser = new Blacklisted({ userId: member.id });

		await blUser.save();
			
		return message.channel.send(
			lang.OWNER.BL_FINAL.replace("{member}", member.id)
				.replace("{author}", message.author.tag)
		);
	},
};