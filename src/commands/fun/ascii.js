/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

const figlet = require("figlet");

module.exports = {
	name: "ascii",
	description: "Transform text to ascii.",
	usage: "ascii <Str:arguments>",
	category: "fun",
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const text = args.join(" ");

		if (!text) {
			return message.channel.send(lang.FUN.PROVIDE_ARGS);
		}

		figlet.text(text, (e, txt) => {
			if (e) return;
			message.channel.send(`\`\`\` ${txt.trimRight()} \`\`\``);
		});
	},
};
