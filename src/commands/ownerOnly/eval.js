/**
 * NOTES:
 * Eval javascript code.
 *
 * @format
 */

const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
	name: "eval",
	description: "Evaluates arbitrary Javascript. Reserved for bot owner.",
	usage: "eval <Expression:str>",
	category: "ownerOnly",
	ownerOnly: true,
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		if (!args.join(" ")) return message.channel.send(lang.OWNER.NO_IMPUT_EVAL);

		const toEval = args.join(" ");
		try {
			let evaled = await eval(toEval);
			const eevaled = typeof evaled;
			evaled = require("util").inspect(evaled, {
				depth: 0,
				maxArrayLength: null,
			});
			const type = eevaled[0].toUpperCase() + eevaled.slice(1);

			const embed = BaseEmbed(message).setTitle(lang.OWNER.EVAL).setDescription(
				`\`${lang.OWNER.EVAL_TYPE}:\` ${type}
        \`${lang.OWNER.EVAL_INPUT}:\` \`\`\`js\n${toEval} \`\`\`
        \`${lang.OWNER.EVAL_OUTPUT}:\` \`\`\`js\n${evaled}\`\`\``
			);

			message.channel.send(embed);
		} catch (error) {
			const errorEmbed = BaseEmbed(message)
				.setTitle(lang.OWNER.EVAL_ERROR)
				.setDescription(`\`\`\`${error}\`\`\``);
			message.channel.send(errorEmbed);
		}
	},
};
