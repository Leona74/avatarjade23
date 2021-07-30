/** @format */

const { stripIndents } = require("common-tags");

var denied = "<:denied:797837142805184532> ";
var approved = "<:approved:797837174858317834> ";

module.exports = {
	OWNER: {
		PROVIDE_A_COMMAND:
			denied + "Please provide a `commandName` to use this command.",
		RELOADED_ALL_COMMANDS:
			approved + "Successfully **reloaded** all existing commands.",
		COMMAND_NOT_FOUND: denied + "Provided `commandName` has not been found.",
		SUCCESSFULLY_RELOAD_COMMAND:
			approved + "Successfully **reloaded** command: `{commandName}`.",
		SHUTDOWN_COMPLETE:
			approved + "charliewaveClient has successfully shut down.",
		OWNER_ACTION: "botDeveloper changed the nickname.",
		UPDATED_NICKNAME:
			approved + "Successfully **updated** nickname to `{nickname}`.",
		EVAL: "Eval piece",
		EVAL_TYPE: "Type",
		EVAL_INPUT: "Input",
		EVAL_OUTPUT: "Output",
		EVAL_ERROR: "An unexpected error occurred",
		BL_USAGE:
			denied +
			"You need to provide a user ID to continue.\nUsage: `blacklist <User:userId | userMention | userName>`",
		WL_USAGE:
			denied +
			"You need to provide a user ID to continue.\nUsage: `whitelist <User:userId | userMention | userName>`",
		BL_BOT_DENIED: denied + "You cannot blacklist a bot.",
		BL_OWNER_DENIED:
			denied +
			"You are not able to blacklist the a `botDeveloper` or `botOwner`.",
		NOT_BL_YET: denied + "That user is not blacklisted.",
		ALREADY_BL: denied + "User: <@{member}> is already blacklisted.",
		NOT_OPTION: denied + "`{type}` is not a valid option.",
		BL_FINAL:
			approved +
			"Successfully **blacklisted** user: <@{member}>\nOperant: `{author}`.",
		BL_FINALUN:
			approved +
			"Successfully **whitelisted** user: <@{member}>\nOperant: `{author}`.",
		COMMAND_ONLYOWNER: denied + "Invalid permissions.",
		NOCOMMAND_FOUND:
			denied +
			"There isn't any `commandName` or `categoryName` with `{args}` joined args.",
		NO_IMPUT_EVAL:
			denied +
			stripIndents(`
		Make sure to assign some imput methods.
		*e.g.*
		\`\`\`js
		this.bot.formatNumber(bot.users.cache.size);
		this.bot.formatNumber(this.bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0));
		\`\`\``),
	},
	AFK: {
		NOT_ANYMORE: "You are back! well, I will let others know that.",
		AFK_STATEMENT:
			"Successfully **activated** the `afkStatement`.\nReason: {reason}",
		USER_IS_AFK: "{member} is AFK. Reason: {reason}",
		USER_NOT_AFK_ANYMORE: "{member} is not AFK anymore!",
	},
	BOT: {
		DESCRIPTION:
			"Charliewave is an experienced multipurpose Discord bot that has a ton of features you will enjoy using!",
		DAYS_AGO: "day(s) ago",
	},
	GENERAL: {
		INFO_UPDATES: "UPDATES",
		YEAR_PROGRESS:
			"<:charliewave_calendar:826015486705401886> The year **{year}** is **{percent}%** complete!",
		PERMS_YOU_NEED: denied + "Invalid permissions. `{map}`",
		ALREADY_VOTED:
			"<:charliewave_vote:826016483858972682> `Cooldown` You've already submitted a vote today. Try again later.",
		VOTE_NOW:
			"It looks like you didn't vote today!\nMake sure you vote our bot and also get some perks by promoting our bot!\n\n[Click here to vote!](https://top.gg/bot/772497789561208872/vote)",
		STATUS_INTERACT: "**INTERACT:**",
		STATUS_MEMORY: "**MEMORY:**",
		STATUS_PROCESS: "**PROCESS:**",
		STATUS_CODER: "**CODER:**",
		STATUS_ADMIN: "**ADMIN:**",
		STATUS_UPTIME: "Uptime:",
		STATUS_COMMANDS: "Commands:",
		STATUS_VERSION: "Commit:",
		GUILDSINFO: "Guilds:",
		USERSINFO: "Users:",
		CHANNELSINFO: "Channels:",
		STAFFINFO:
			"Here is the list of people that helped Charliewave grow up where is it now!\n\nWithout this people our project wouldn't be here.",
		PREFIXUSAGE: "PREFIX",
		COMMAND_DISABLED: denied + "That command was disabled for this guild.",
		COMMAND_DISABLE_BECAUSE_CATEGORY_IS_DISABLE:
			denied +
			"That command is disabled because this guild has disabled the **{category}** category.",
		NOT_A_NSFW_CHANNEL:
			denied +
			"You cannot use this command here, it's not a NSFW allowed channel.",
		TIMEOUT_COOLDOWN:
			":clock1: Please wait **{time}** more seconds before using the `{command}` command again!",
		YOU_ARE_BLACKLISTED:
			":lock: `Blacklisted`\n`{author}` you've been blacklisted from using **Charliewave**!\nYou are able to submit an appel on our support server to be whitelisted, see our official website for more details.\nhttps://charliewave.me/",
		LEVEL_UP_MESSAGE:
			"<:charliewave_party:781439232895483904> Congratulations, {user}, you've advanced to level **{newLevel}**!",
		NO_DATA: denied + "There is no data available for Discord Applications.",
		PROVIDE_A_AMOUNT: denied + "Provide a valid amount of coins.",
		SUCCES_MONEY_ADDED:
			approved +
			"Successfully **added** `{amount}` coins to `{user}'s` balance.",
		SUCCES_XP_ADDED:
			approved +
			"Successfully **added** `{amount}` xp points to `{user}'s` profile.",
		SUCCES_REPS_ADDED:
			approved +
			"Successfully **added** `{amount}` rep points to `{user}'s` profile.",
		LEVEL_USER:
			"<:charliewave_exp:771448234672521236> {user} has earned **{xp}** xp points.",
		BUG_REPORT_USAGE: denied + "You need to describe your bug report.",
		COMMAND_RUN_ERROR: denied + "`{var}` needs to be provided.",
		BUG_REPORT_TITLE_EMBED: "{user} has reported a bug!",
		BUG_REPORTED:
			approved +
			"Successfully **sent** the bug report to the `support-team`, wait for it to be approved.",
		PROVIDE_ARGS: denied + "Please assign a valid query to search!",
		QUERY_NOT_FOUND: denied + "Cannot find this query in docs!",
		PROVIDE_MC_ARGS:
			denied +
			"Please assign an `IP` or a `DNS` to fetch informations about it.",
		MC_NOT_FOUND:
			denied + "Cannot fetch any informations for the provided `IP` or `DNS`.",
		MC_ONLINE: "Online",
		MC_OFFLINE: "Offline",
		MC_STATUS: "STATUS:",
		MC_PLAYERS: "PLAYERS:",
		MC_MAX_PLAYERS: "MAX PLAYERS:",
		MC_VERSION: "VERSION:",
		MC_PORT: "PORT:",
		MC_DESCRIPTION: "DESCRIPTION:",
		NC_NO_DESC: "N/A",
		GUILD_NO_ICON: denied + "This server has no icon.",
		PROVIDE_WIKI_ARGS:
			denied + "Please argue a valid query to search on Wikipedia!",
		WIKI_NO_RESULTS: denied + "No results were found with this query.",
		WIKI_LEARN_MORE: "read more",
		PROVIDE_COUNTRY_ARGS:
			denied + "Please argue a valid location to display weather informations!",
		WEATHER_ERROR: "An unexpected error occurred",
		WEATHER_NOT_OK: denied + "Location {query} cannot be found.",
		WEATHER_WIND_SPEED: "WIND SPEED",
		WEATHER_WIND_DEE: "WIND DEGREES",
		WEATHER_CUR_TEMP: "TEMPERATURE",
		WEATHER_CUR_STAGE: "CURRENT",
		WEATHER_MAIN: "MAIN",
		WEATHER_COUNTRY: "COUNTRY",
		WEATHER_FEELS_LIKE: "FEELS LIKE",
		DISCRIM_INVALID: denied + "Invalid discriminator provided.",
		DISCRIM_FOUND: "user(s) found with the discriminator",
		DISCRIM_NOT: denied + "No user(s) with `#{discrim}` discriminator found.",
		WHOIS_NOT_USER_FOUND: denied + "No user found!",
		WHOIS_TAG: "TAG",
		WHOIS_USERNAME: "USERNAME",
		WHOIS_JOIN_POSITION: "JOIN POSITION",
		WHOIS_HIGHEST_ROLE: "HIGHEST ROLE",
		WHOIS_BADGES: "BADGES",
		WHOIS_TYPE: "TYPE",
		WHOIS_TYPE_BOT: "Bot",
		WHOIS_TYPE_HUMAN: "Human",
		WHOIS_PRESENCE: "PRESENCE",
		WHOIS_CREATED_ON: "CREATED",
		WHOIS_JOINED_AT: "JOINED",
		WHOIS_TIMESTAMP_DAYS: "day(s) ago",
		WHOIS_ELAPSED_TIMESTAMPS: "elapsed",
		GI_OWNERSHIP: "OWNERSHIP",
		GI_CHANNELS: "CHANNELS",
		GI_TEXT_CHANNELS: "Text",
		GI_VOICE_CHANNELS: "Voice",
		GI_REGION: "REGION",
		GI_VERIFICATION_LEVEL: "VERIFICATION LEVEL",
		GI_BOOSTS: "BOOSTS",
		GI_BOOST_LEVEL: "Level",
		GI_AFK_CHANNEL: "AFK CHANNEL",
		GI_CREATED_ON: "CREATED",
		GI_DAYS_TIMESTAMPS: "day(s) ago",
		GI_MEMBERS: "MEMBERS",
		GI_EMOJIS: "EMOJIS",
		GI_ROLES: "ROLES",
		INFOBOT_DESCONE:
			"Charliewave, an experienced **multipurpose bot** with the most advanced features given by community for community purposes!",
		INFOBOT_DESCTWO:
			"Use `{prefix}help` command, so you can find Charliewave's commands and help informations.",
		INFOBOT_AUTHOR: "CODE AUTHOR",
		INFOBOT_BOT_DEVS: "PIPELINE",
		INFOBOT_SPECIAL: "CODE CONTRIBUTOR",
		INFOBOT_SUPPORT: "SUPPORT",
		INFOBOT_STATUS: "STATUS",
		SPOTIFY_INFO: "Listening to **Spotify**",
		SPOTIFY_NOT_LISTED_ON:
			denied +
			"Make sure your Spotify account is connected with your Discord account, or maybe listen to something!",
		HELP_OWNERONLY: "ownerOnly",
		NOT_SPECIFIED: "Not specified.",
	},
	CONFIG: {
		OPTION_CMD_WORK:
			denied + "`{option}` needs to be provided, for this command to work.",
	},
	ECONOMY: {
		ROB_SUCCESS:
			approved +
			"Successfully **robbed** `{member}` with `{amount}` coins :coin: totally.",
		MEMBER_NO_MONEY:
			denied +
			"User doesn't have any money, therefore you can't rob this user.",
		CANNOT_ROB_SELF: denied + "You cannot rob yourself.",
		BALANCE_STATUS:
			":coin: {user} has **{coins}** coins in hand and **{bank}** coins in the bank account.\nTotal: **{total}**",
		DAILY_SUCCESS:
			approved +
			"You've successfully collected your daily reward of **{amount}** coins.",
		DAILY_ERROR:
			denied +
			"You've already collected your daily reward recently, `{time}` remaining.",
		WEEKLY_ERROR:
			denied +
			"You've already collected your weekly reward recently, `{time}` remaining.",
		WEEKLY_SUCCESS:
			approved +
			"You've successfully collected your weekly reward of **{amount}** coins.",
		DEPOSIT_USAGE: denied + "Please provide a valid amount of coins.",
		DEPOSITED_ALL: approved + "Successfully deposited all your coins!",
		WITHDRAW_ALL: approved + "Successfully withdrawn all your coins!",
		WITHDRAW_AMOUNT: approved + "Successfully withdrawn **{amount}** coins.",
		INVALID_AMOUNT: denied + "Invalid amount provided.",
		NOT_ENOUGH_COINS:
			denied + "You don't have that many coins in your balance.",
		SLOTS_MINIMUM: denied + "Minimum bet is **100** coins.",
		SLOTS_MAXIMUM: denied + "Maximum bet is **1000000** coins.",
		SLOTS_WIN: "{user} used **{amount}** :coin: coin(s) and won {random}!",
		SLOTS_LOSE: "{user} used **{amount}** :coin: coin(s) and lost everything.",
		DEPOSITED_AMOUNT: approved + "Successfully **deposited* `{amount}` coins.",
		CANNOT_PAY_SELF: denied + "You cannot transfer coins to yourself.",
		PAY_SUCCESS:
			":coin: {author} transfered **{amount}** coins to {receiver}'s balance account. (fee: **{fee}** coins | **{to100}%**)",
		REP_MESSAGE:
			"<:charliewave_rep:778610398928568330> You gave a reputation point to {user}!",
		RECENTLY_FISHED:
			denied + "You've already fished recently, `{time}` remaining.",
		RECENTLY_HUNTED:
			denied + "You've already hunted recently, `{time}` remaining.",
		RECENTLY_REP:
			denied + "You've already rep someone recently, `{time}` remaining.",
		RECENTLY_ROBBED:
			denied + "You've already robbed recently, `{time}` remaining.",
		CANNOT_REP_SELF:
			denied + "Please mention a user and make sure, you cannot rep yourself.",
		SETBIO: denied + "Please provide your bio.\nUsage: **setbio <Str:text>**",
		BIO_NO_LINKS: denied + "Try again without an invite link.",
		SUCCES_BIO: approved + "Successfully **updated** your personal bio.",
		FISHERMAN_NAME: "Fisherman:",
		HUNTERMAN_NAME: "Hunter:",
		CAUGHT_FISH: "Caught:",
		HUNTED_ANIMAL: "Hunted:",
		COINS_EARNED: "Coins earned:",
		XP_EARNED: "Xp earned:",
		SLOTS_AMOUNT:
			denied +
			"Please provide a valid amount of coins to play at slots machine.",
	},
	HELP: {
		INVITENOW:
			"Make sure you assign the right permissions for Charliewave's role so that the bot can run as it should!",
		CAT_NOT_EXIST: denied + "This category does not exist.",
		USAGENOTDEFINIED: denied + "This command doesn't have a usage provided.",
		CMD_NOT_FOUND: denied + "Command or alias not found.",
		DESCRIPTION: "**DESCRIPTION:**",
		COOLDOWN: "**COOLDOWN:**",
		ALIASES: "**ALIASES:**",
		USAGE: "**USAGE:**",
		CATEGORY: "**CATEGORY:**",
		COMMANDS: "**AVAILABLE COMMANDS:**",
		OPTIONS: "**OPTIONS:**",
		BOTPERMS: "**BOT PERMISSIONS:**",
		MEMBERPERMS: "**USER PERMISSIONS:**",
		CUSTOM_CMD: "This is a custom command, therefore I cannot show more info.",
		TAB_INFORMATIONS: "**Prefix:** `{prefix}`",
		CATEGORIES: {
			admin: "<:charliewave_admin:771632435040878624> **ADMIN:**",
			moderator: "<:charliewave_moderator:802101801339715644> **MODERATOR:**",
			hypixel: "<:charliewave_hypixel:771634768777445406> **HYPIXEL:**",
			general: "<:charliewave_general:771633361340727336> **GENERAL:**",
			fun: "<:charliewave_fun:771633587246202910> **FUN:**",
			economy: ":coin: **ECONOMY:**",
			levels: "<:charliewave_levels:780387208006729728> **LEVELS:**",
			social: "<:charliewave_rep:778610398928568330> **SOCIAL:**",
			exempt: "<:charliewave_settings:771462923855069204> **EXEMPT:**",
			custom: "<:charliewave_misc:771634380560662538> **CUSTOM COMMANDS:**",
			trashgang:
				"<:charliewave_trashgang:771633981011263489> **TRASHGANG COMMANDS:**",
			ownerOnly: "<:charliewave_ownership:771637500967124994> **OWNER ONLY:**",
		},
	},
	MODERATOR: {
		ANTILINKS: denied + "`{author}`, you cannot send links here!",
		DONE_ACTION_CLEAR:
			approved +
			"Successfully **deleted** `{messages}` messages from {filter}.",
		BAN_USAGE: denied + "You need to submit a user mention from this server.",
		BAN_NOT_ALLOWED: denied + "You cannot ban this user.",
		KICK_NOT_ALLOWED: denied + "You cannot kick this user.",
		WARN_NOT_ALLOWED: denied + "You cannot warn this user.",
		MUTE_NOT_ALLOWED: denied + "You cannot mute this user.",
		HIGHRANK_BAN: denied + "My role must be higher than **{roleName}** role!",
		PROVIDE_BY_ID: denied + "Submit a **userId** to use this command!",
		BAN_USER_SUCCES:
			approved + "Successfully **banned** {member}. Reason: {ban_reason}.",
		KICK_USER_SUCCES:
			approved + "Successfully **kicked** {user}. Reason: {kick_reason}.",
		WARN_USER_SUCCES:
			approved +
			"Successfully **warned** {user}. Reason: {reason}.\nWarns: `{warns}`",
		MUTE_USER_SUCCES:
			approved + "Successfully **muted** {user}. Reason: {reason}",
		UNBAN_USER_SUCCES: approved + "Successfully **unbanned** {member}.",
		UNMUTE_USER_SUCCES: approved + "Successfully **unmuted** {member}.",
		WARNS_ACHIEVED: "{member} has **{warns}** warns achieved.",
		BOT_DATA: denied + "Bots data cannbot be fetched!",
		NO_WARNS: denied + "This user has not achieved any warning point yet!",
		REMOVED_ALL_WARNINGS:
			approved +
			"Successfully **removed** all warnings points for `{user}` profile.",
		NUKE_CHALLANGE:
			approved +
			"I assigned some reactions to your message, make sure you react in **30 secconds**!",
		NUKE_CANCELED: denied + "Nuke operation was dismissed!",
		NUKE_COLLECTOR: approved + "Successfully **cloned** current channel!",
		ALREADY_MUTED: denied + "This user is already muted.",
		MUTE_SIMPLE: denied + "My role must be higher than {user}'s role.",
		USER_NOT_MUTED: denied + "This user has not been muted yet!",
		PROVIDE_EMOJI: denied + "Please provide a emoji!",
		SUCCES_EMOJI: approved + "Successfully **created** provided emoji.",
		EMOJI_SIMPLE: denied + "Provided emoji is already free to use!",
		INVALID_EMOJI: denied + "Invalid emoji provided.",
		CHANNEL_ALREADY_LOCKED: denied + "This channel is already locked.",
		REASON_LOCK_CHANNEL:
			denied + "Please specify a reason for locking this channel.",
		SUCCES_LOCK_CHANNEL:
			approved + "Successfully **locked** {channel}. Reason: {reason}.",
		CHANNEL_NOT_LOCKED: denied + "This channel is not locked.",
		SUCCES_UNLOCK_CHANNEL: approved + "Successfully **unlocked** {channel}.",
	},
	ADMIN: {
		PROVIDE_COMMAND_OR_CATEGORY_NAME:
			denied + "Please provide a `command or category name`.",
		COMMAND_CANNOT_DISABLED: denied + "That command cannot be disabled.",
		COMMAND_ALREADY_DISABLED: denied + "That command is already disabled.",
		COMMAND_DISABLED:
			approved + "Successfully **disabled** `{commandName}` command.",
		COMMAND_ENABLED:
			approved + "Successfully **enabled** `{commandName}` command.",
		COMMAND_NOT_DISABLED: denied + "That command is not disabled.",
		COMMAND_OR_CATEGORY_NOT_FOUND:
			denied + "No command or category found with this name.",
		COMMAND_NOT_FOUND: denied + "No command found with this name.",
		CATEGORY_CANNOT_DISABLED: denied + "That category cannot be disabled.",
		CATEGORY_ALREADY_DISABLED: denied + "That category is already disabled.",
		CATEGORY_DISABLED:
			approved + "Successfully **disabled** `{category}` category.",
		CATEGORY_ENABLED:
			approved + "Successfully **enabled** `{category}` category.",
		CATEGORY_NOT_DISABLED: denied + "That category is not disabled.",
		ADD_COMMAND_USAGE:
			denied +
			"Please provide all necessary arguments.\n`{prefix}addcustomcommand <str:commandName> <str:commandResponse>`.",
		DELCMDUSAGE:
			denied +
			"Please provide all necessary arguments.\n`{prefix}deletecustomcommand <str:commandName>`.",
		CUSTOM_COMMAND_ALREADY_EXISTS:
			denied + "This custom command is already created on this server.",
		COMMAND_CHARLIEWAVE:
			denied +
			"You cannot create a custom command with an existent command from `Charliewave`.",
		SUCCES_CUSTOM_COMMAND:
			approved + "Successfully **created** `{command}` custom command.",
		NOT_FOUND_CUSTOM_COMMAND: denied + "Not found any command with that name.",
		SUCCES_CUSTOM_COMMAND_DELETE:
			approved + "Successfully **deleted** `{command}` custom command.",
		GUILD_NO_CUSTOM_COMMANDS:
			denied + "This guild doesn't have any custom command.",
		PROVIDE_VALID_OPTION:
			denied + "You need to provide an option. `add or remove`",
		PROVIDE_CHANNEL: denied + "Please provide a channel by mentioning it.",
		CHANNEL_ALREADY_IGNORED:
			denied + "Mentioned channel is already ignored by Charliewave.",
		SUCCES_IGNORED:
			approved + "Successfully **added** {item} to `ignored channels`.",
		CHANNEL_NOT_IGNORED:
			denied + "Mentioned channel is not ignored by Charliewave.",
		SUCCES_REMOVED_IGNORED:
			approved + "Successfully **removed** {item} from `ignored channels`.",
		NOT_A_OPTION: denied + "Provided option: `{option}` is not a valid option.",
		NO_PERMISSIONS: denied + "You don't have permissions to use this command.",
		CURRENT_PREFIX:
			"Current server prefix: `{guildPrefix}`\nUse `{guildPrefix}prefix <prefix>` to set a new prefix!",
		UPDATE_PREFIX: approved + "Successfully **updated** prefix to `{prefix}`.",
		PLEASE_DISABLE_OR_ENABLE:
			denied + "Assign a operation to continue. `enable or disable`",
		SUCCES_ENABLE_MSGS:
			approved + "Successfully **enabled** `level up messages`.",
		SUCCES_DISABLE_MSGS:
			approved + "Successfully **disabled** `level up messages`.",
		SUCCES_ENABLE_ANTILINKS:
			approved + "Successfully **enabled** `anti links` feature.",
		SUCCES_DISABLE_ANTILINKS:
			approved + "Successfully **disabled** `anti links` feature.",
		AUTOROLE_DISABLED:
			approved + "Successfully **disabled** `autorole module` for this guild.",
		SUCCES_AUTOROLE_SET:
			approved +
			"Successfully **enabled** `autorole module`. Welcome role: {item}",
		MENTION_A_ROLE:
			denied +
			"Please provide all necessary arguments.\n`{prefix}autorole <str:enable> <roleMention>`",
		MENTION_A_CHANNEL:
			denied + "To continue this action, you need to mention a channel.",
		SUCCES_LEAVE_CHANNEL:
			approved +
			"Successfully **enabled** `leave message module`.\nLeave channel: {item}",
		LEAVE_CHANNEL_DISABLED:
			approved + "Successfully **disabled** `leave message module`.",
		WELCOME_CHANNEL_DISABLED:
			approved + "Successfully **disabled** `welcome message module`.",
		SUCCES_WELCOME_CHANNEL:
			approved +
			"Successfully **enabled** `welcome message module`.\nWelcome channel: {item}",
		PROVIDE_A_LANGUAGE:
			"<:charliewave_onlineglobe:779089847729389578> New language need to be provided.\nAvailable languages: {languages}.",
		INVALID_LANGUAGE:
			denied + "Invalid language provided.\nAvailable languages: {languages}.",
		SUCCES_LANGUAGE_EDIT:
			approved + "Successfully **updated** language to {language}.",
		CONFPREFIX: "**PREFIX:**",
		LEVEL_UP_MESSAGES: "**LEVEL-UP MSGs:**",
		CONFAUTOROLE: "**AUTOROLE:**",
		ANTILINKS: "**ANTILINKS:**",
		WELCOME_CHANNELCONF: "**WELCOME CHANNEL:**",
		LEAVE_CHANNELCONF: "**LEAVE CHANNEL:**",
		DISABLEDONE: "<:charliewave_disable:771461222296977418> Disabled",
		SETTINGS_DESC: "There are available settings for this guild.",
	},
	HYPIXEL: {
		NO_DATA: denied + "There is no data for this `username`.",
		ARGUE_A_USERNAME:
			denied +
			"Make sure you assign a `minecraft username` to fetch statistics.",
		DUELS_CATEGORY:
			denied +
			"Please assign a category: `(uhc, skywars, bridge, sumo, op, combo)` and a `minecraft username` to perform this command.",
		KILLS: "**KILLS:**",
		DEATHS: "**DEATHS:**",
		LEVEL: "**LEVEL:**",
		LOSSES: "**LOSSES:**",
		WINS: "**WINS:**",
		KD_RATIO: "**KD RATIO:**",
		FINAL_KD_RATIO: "**FINAL KD RATIO:**",
		WL_RATIO: "**WL RATIO:**",
		BROKEN_BEDS: "**BROKEN BEDS:**",
		BEDS_LOST: "**BEDS LOST:**",
		COINS: "**COINS:**",
		TOTAL_DEATHS: "**TOTAL DEATHS:**",
		FINAL_DEATHS: "**FINAL DEATHS:**",
		TOTAL_KILLS: "**TOTAL KILLS:**",
		TOTAL_FINAL_KILLS: "**TOTAL FINAL KILLS:**",
		WINSTREAK: "**WINSTREAK:**",
		TOTAL_WINS: "**TOTAL WINS:**",
		RANK: "**RANK:**",
		KARMA_POINTS: "**KARMA POINTS:**",
		LANGUAGE: "**LANGUAGE:**",
		VERSION: "**VERSION:**",
		GUILD: "**GUILD:**",
		RECENT_GAME: "**RECENT GAME:**",
		FIRST_LOGIN: "**FIRST LOGIN:**",
		LAST_LOGIN: "**LAST LOGIN:**",
		HEALTH: "**HEALTH:**",
		EFFECTIVE_HEALTH: "**EFFECTIVE HEALTH:**",
		DEFENSE: "**DEFENSE:**",
		STRENGTH: "**STRENGTH:**",
		SPEED: "**SPEED:**",
		CRIT_CHANCE: "**CRIT CHANCE:**",
		CRIT_DAMAGE: "**CRIT DAMAGE:**",
		PURSE: "**PURSE:**",
		DEATH_COUNT: "**DEATH COUNT:**",
		HELMET: "**HELMET:**",
		CHESTPLATE: "**CHESTPLATE:**",
		LEGGINGS: "**LEGGINGS:**",
		BOOTS: "**BOOTS:**",
		HEADS: "**HEADS:**",
		TOTAL_RANKED_WINS: "**TOTAL RANKED WINS:**",
		TOKENS: "**TOKENS:**",
		PRESTIGE: "**PRESTIGE:**",
		SOULS: "**SOULS:**",
		GAMES_PLAYED: "**GAMES PLAYED:**",
		HEADS_EATEN: "**HEADS EATEN:**",
	},
	FUN: {
		PROVIDE_ARGS: denied + "Please perform some arguments to use this command.",
		CANNOTTHROWYOURSELF: denied + "You cannot throw yourself.",
		HOW_GAY: "{author} is **{gayrate}%** gay.",
		IQ: "{author} has **{iqrate}** IQ.",
		HOW_SEXY: "{author} is **{sexyrate}%** sexy.",
	},
	TRASHGANG: {
		NOT_ALLOWED: denied + "You are not allowed to use this command.",
	},
	RACE: {
		AGAINS_YOURSELF: denied + "You cannot play against yourself.",
		ALREADY_A_GAME:
			denied + "Please wait until the current game of **{game}** is finished.",
		CHOOSE_THE_DIFFICULTY:
			"What difficulty do you want to use?\nAvailable difficulties: {map}.",
		ABORT_GAME: denied + "Failed to pick difficulty. Aborted command.",
		ACCEPT_THE_GAME: "**{opponent}**, do you accept this challenge?",
		DECLINED_RACE: denied + "Looks like they declined.",
		CHOOSE_THE_CAR:
			"**{user}**, what car do you want to be?\nAvailable cars: {map}.",
		ENDGAME_AFK: denied + "Game ended due to inactivity.",
		INTRO:
			"Welcome to `car-race`! Whenever a message pops up, type the word provided.\nWhoever types the word first advances their car!\nEither player can type `end` at any time to end the game.",
		START: "{text}\nGet Ready...",
		TYPE_NOW: "TYPE `{word}` NOW!",
		FACTS: "Come on, get your head in the game!",
		WIN: "Congratulations, {winner} you won the race!\nYou earned {coins} coins :coin: and {xp} xp <:charliewave_exp:771448234672521236> on this race!",
		RECENTLY_RACED:
			denied + "You've already raced recently, `{time}` remaining.",
		MENTION_A_USER: denied + "Mention another driver to start the race!",
	},
};
