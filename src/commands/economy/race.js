/**
 * NOTES:
 * New update for a RPG is incomming.
 *
 * @format
 */

const {
	greyScale,
	motionBlur,
	list,
	randomRange,
	verify,
	getUserById,
	updateUserById,
} = require("../../utils/functions");
const { createCanvas, loadImage } = require("canvas");
const request = require("node-superfetch");
const { stripIndents } = require("common-tags");
const path = require("path");
const fs = require("fs");

module.exports = {
	name: "race",
	description:
		"Race a car against another user or the AI. (every race won gives you 100 XP and 2500 coins.)",
	usage: "race <User:user_mention>",
	category: "economy",
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const member = bot.findMember(message, args);

		if (!member) return message.channel.send(lang.RACE.MENTION_A_USER);
		const cars = fs
			.readdirSync(
				path.join(__dirname, "..", "..", "assets", "car-race", "cars")
			)
			.map((car) => car.replace(".png", ""));

		const words = [
			"go",
			"zoom",
			"drive",
			"advance",
			"pedal",
			"vroom",
			"turbo",
			"will",
			"megan",
			"2jz",
			"rb26",
			"drift",
			"rally",
			"drag",
			"engine",
			"rotary",
			"twlnturbo",
			"supercharger",
			"fast",
			"furious",
		];
		const difficulties = {
			baby: 5000,
			easy: 3000,
			medium: 2250,
			hard: 1500,
			impossible: 500,
		};

		if (member.user.id === message.author.id)
			return message.channel.send(lang.RACE.AGAINS_YOURSELF);

		const current = bot.games.get(message.channel.id);

		if (current)
			return message.channel.send(
				lang.RACE.ALREADY_A_GAME.replace("{game}", current.name)
			);

		bot.games.set(message.channel.id, { name: this.name });

		var filesCars = fs.readdirSync(
			path.join(__dirname, "..", "..", "assets", "car-race", "cars")
		);

		const car = filesCars[Math.floor(Math.random() * filesCars.length)];

		const bg = await loadImage(
			path.join(__dirname, "..", "..", "assets", "car-race", "bg.png")
		);

		const oppoData = {
			user: member,
			spaces: 0,
		};

		const userData = {
			user: message.author,
			spaces: 0,
		};

		userData.car = await loadImage(
			path.join(__dirname, "..", "..", "assets", "car-race", "cars", `${car}`)
		);

		const userAvatar = await request.get(
			message.author.displayAvatarURL({ format: "png", size: 128 })
		);

		userData.avatar = await loadImage(userAvatar.body);

		let difficulty;

		var filesCars = fs.readdirSync(
			path.join(__dirname, "..", "..", "assets", "car-race", "cars")
		);

		const available = cars.filter((car2) => `${car}.png` !== car2);

		if (member.user.bot) {
			await message.channel.send(
				lang.RACE.CHOOSE_THE_DIFFICULTY.replace(
					"{map}",
					list(Object.keys(difficulties))
				)
			);

			const difficultyFilter = (res) => {
				if (res.author.id !== message.author.id) return false;
				return Object.keys(difficulties).includes(res.content.toLowerCase());
			};

			const difficultyPick = await message.channel.awaitMessages(
				difficultyFilter,
				{
					max: 1,
					time: 15000,
				}
			);

			if (!difficultyPick.size) {
				bot.games.delete(message.channel.id);

				return message.channel.send(lang.RACE.ABORT_GAME);
			}

			difficulty = difficultyPick.first().content.toLowerCase();

			const oppoCarPick =
				available[Math.floor(Math.random() * available.length)];
			oppoData.car = await loadImage(
				path.join(
					__dirname,
					"..",
					"..",
					"assets",
					"car-race",
					"cars",
					`${oppoCarPick}.png`
				)
			);
		} else {
			await message.channel.send(
				lang.RACE.ACCEPT_THE_GAME.replace("{opponent}", member.user.tag)
			);

			const verification = await verify(message.channel, member);

			if (!verification) {
				bot.games.delete(message.channel.id);

				return message.channel.send(lang.RACE.DECLINED_RACE);
			}

			await message.channel.send(
				lang.RACE.CHOOSE_THE_CAR.replace("{user}", member.user.tag).replace(
					"{map}",
					list(available)
				)
			);

			const filter = (res) => {
				if (res.author.id !== member.user.id) return false;
				return available.includes(res.content.toLowerCase());
			};

			const p2Car = await message.channel.awaitMessages(filter, {
				max: 1,
				time: 15000,
			});

			if (p2Car.size) {
				const choice = p2Car.first().content.toLowerCase();

				oppoData.car = await loadImage(
					path.join(
						__dirname,
						"..",
						"..",
						"assets",
						"car-race",
						"cars",
						`${choice}.png`
					)
				);
			} else {
				const chosen = cars[Math.floor(Math.random() * cars.length)];

				oppoData.car = await loadImage(
					path.join(
						__dirname,
						"..",
						"..",
						"assets",
						"car-race",
						"cars",
						`${chosen}.png`
					)
				);
			}
		}

		const oppoAvatar = await request.get(
			member.user.displayAvatarURL({ format: "png", size: 128 })
		);

		oppoData.avatar = await loadImage(oppoAvatar.body);
		let lastRoundWinner;
		let lastTurnTimeout = false;
		while (userData.spaces < 7 && oppoData.spaces < 7) {
			let text;
			const board = await generateBoard(
				bg,
				userData,
				oppoData,
				lastRoundWinner
			);
			if (lastRoundWinner) {
				if (
					userData.spaces > oppoData.spaces ||
					oppoData.spaces > userData.spaces
				) {
					const leader =
						userData.spaces > oppoData.spaces ? message.author : member;
					if (leader.id === lastRoundWinner.id)
						text = `${lastRoundWinner} pulls ahead!`;
					else text = `${lastRoundWinner} catches up!`;
				} else if (userData.spaces === oppoData.spaces) {
					text = `${lastRoundWinner} ties it up!`;
				}
			} else {
				text = stripIndents`
						${lang.RACE.INTRO}
					`;
			}

			await message.channel.send(lang.RACE.START.replace("{text}", text), {
				files: [{ attachment: board, name: "car-race.png" }],
			});

			const earlyFilter = (res) => {
				if (![member.user.id, message.author.id].includes(res.author.id))
					return false;

				return res.content.toLowerCase() === "end";
			};

			const earlyEnd = await message.channel.awaitMessages(earlyFilter, {
				max: 1,
				time: randomRange(1000, 15000),
			});

			if (earlyEnd.size) {
				if (earlyEnd.first().author.id === message.author.id)
					oppoData.spaces = 7;
				else if (earlyEnd.first().author.id === member.user.id)
					userData.spaces = 7;
				break;
			}

			const word = words[Math.floor(Math.random() * words.length)];

			await message.channel.send(
				lang.RACE.TYPE_NOW.replace("{word}", word.toUpperCase())
			);

			const turnFilter = (res) => {
				if (![member.user.id, message.author.id].includes(res.author.id))
					return false;

				if (res.content.toLowerCase() === "end") return true;
				return res.content.toLowerCase() === word;
			};

			const winner = await message.channel.awaitMessages(turnFilter, {
				max: 1,
				time: member.user.bot ? difficulties[difficulty] : 15000,
			});

			if (!winner.size) {
				if (member.user.bot) {
					oppoData.spaces += 1;
					lastRoundWinner = member;
					if (lastTurnTimeout) lastTurnTimeout = false;
					continue;
				} else if (lastTurnTimeout) {
					bot.games.delete(message.channel.id);

					return message.channel.send(lang.RACE.ENDGAME_AFK);
				} else {
					await message.channel.send(lang.RACE.FACTS);
					lastTurnTimeout = true;
					continue;
				}
			}

			const win = winner.first();
			if (win.content.toLowerCase() === "end") {
				if (win.author.id === message.author.id) {
					oppoData.spaces = 7;
					lastRoundWinner = member;
				} else if (win.author.id === member.user.id) {
					userData.spaces = 7;
					lastRoundWinner = message.author;
				}
				break;
			}
			if (win.author.id === message.author.id) userData.spaces += 1;
			else if (win.author.id === member.user.id) oppoData.spaces += 1;
			lastRoundWinner = win.author;
			if (lastTurnTimeout) lastTurnTimeout = false;
		}

		bot.games.delete(message.channel.id);
		const winner = userData.spaces > oppoData.spaces ? message.author : member;
		const board = await generateBoard(
			bg,
			userData,
			oppoData,
			lastRoundWinner,
			winner
		);

		const { user } = await getUserById(winner.id);

		await updateUserById(winner.id, {
			coins: user.coins + 2500,
			xp: user.xp + 100,
		});

		return message.channel.send(
			lang.RACE.WIN.replace("{winner}", winner)
				.replace("{coins}", 2500)
				.replace("{xp}", 100),
			{
				files: [{ attachment: board, name: "car-race-win.png" }],
			}
		);

		async function generateBoard(bg, userData, oppoData, turnWin, win) {
			const canvas = createCanvas(bg.width, bg.height);
			const ctx = canvas.getContext("2d");
			ctx.drawImage(bg, 0, 0);
			const oppoCarX =
				oppoData.spaces < 7 ? -155 + 77 * oppoData.spaces : bg.width - 155;
			if (turnWin && oppoData.spaces > 0) {
				motionBlur(
					ctx,
					oppoData.car,
					oppoCarX,
					208,
					oppoData.car.width,
					oppoData.car.height
				);
			} else {
				ctx.drawImage(oppoData.car, oppoCarX, 208);
			}
			const userCarX =
				userData.spaces < 7 ? -155 + 77 * userData.spaces : bg.width - 155;
			if (turnWin && userData.spaces > 0) {
				motionBlur(
					ctx,
					userData.car,
					userCarX,
					254,
					userData.car.width,
					userData.car.height
				);
			} else {
				ctx.drawImage(userData.car, userCarX, 254);
			}
			if (win) {
				const fireworks = await loadImage(
					path.join(
						__dirname,
						"..",
						"..",
						"assets",
						"car-race",
						"fireworks.png"
					)
				);
				const congrats = await loadImage(
					path.join(__dirname, "..", "..", "assets", "car-race", "congrats.png")
				);
				ctx.drawImage(fireworks, 106, -48, 400, 283);
				ctx.drawImage(congrats, bg.width / 2 - 250 / 2, 21, 250, 62);
				ctx.fillStyle = "black";
				const x = bg.width / 2 - 50;
				ctx.fillRect(x - 5, 85, 110, 110);
				ctx.drawImage(
					win.id === userData.user.id ? userData.avatar : oppoData.avatar,
					x,
					90,
					100,
					100
				);
			} else {
				const stars = await loadImage(
					path.join(__dirname, "..", "..", "assets", "car-race", "stars.png")
				);
				const vs = await loadImage(
					path.join(__dirname, "..", "..", "assets", "car-race", "vs.png")
				);
				ctx.drawImage(vs, bg.width / 2 - 75 / 2, 80, 75, 75);
				ctx.fillStyle = "black";
				ctx.fillRect(105, 45, 135, 135);
				ctx.drawImage(userData.avatar, 110, 50, 125, 125);
				ctx.fillRect(173, 155, 62, 20);
				ctx.drawImage(userData.car, 173, 155, 62, 20);
				if (turnWin && turnWin.id === userData.user.id) {
					ctx.drawImage(stars, 85, 0, 175, 150);
				} else if (turnWin) {
					greyScale(ctx, 110, 50, 125, 125);
				}
				ctx.fillRect(bg.width - 115 - 125, 45, 135, 135);
				ctx.drawImage(oppoData.avatar, bg.width - 110 - 125, 50, 125, 125);
				ctx.fillRect(440, 155, 62, 20);
				ctx.drawImage(oppoData.car, 440, 155, 62, 20);
				if (turnWin && turnWin.id === oppoData.user.id) {
					ctx.drawImage(stars, bg.width - 110 - 125 - 25, 0, 175, 150);
				} else if (turnWin) {
					greyScale(ctx, bg.width - 110 - 125, 50, 125, 125);
				}
			}
			return canvas.toBuffer();
		}
	},
};
