/**
 * NOTES:
 * Only in case some customer breaks the tos.
 *
 * @format
 */

const { owners } = require("../../../config.json");
const Blacklisted = require("../../models/Blacklisted.model");

module.exports = {
	name: "whitelist",
	description:
		"Whitelists the punished users from using this client.",
	category: "ownerOnly",
	usage: "whitelist <User:user>",
	ownerOnly: true,
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const type = args[0];
		let member = await bot.findMember(message, args);

		if (!member) member = { username: "N/A", id: args[1], tag: "N/A" };

		if (!type) {
			return message.channel.send(lang.OWNER.WL_USAGE);
		}

		if (member.id === bot.user.id) {
			return message.channel.send(lang.OWNER.BL_BOT_DENIED);
		}

		if (owners.includes(member.id)) {
			return message.channel.send(lang.OWNER.BL_OWNER_DENIED);
		}

		const users = await Blacklisted.find();

        if (users === null) {
            return message.channel.send(lang.OWNER.NOT_BL_YET);
        }
        
        const exists = users.find((u) => u.userId === member.id);
        
        if (!exists) {
            return message.channel.send(lang.OWNER.NOT_BL_YET);
        }

        await Blacklisted.findOneAndDelete({ userId: member.id });

		return message.channel.send(
			lang.OWNER.BL_FINALUN.replace("{member}", member.id)
				.replace("{author}", message.author.tag)
		);
	},
};
