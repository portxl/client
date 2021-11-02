/** @format */

const { embed } = require("../../utils/Utils");
const {
  MessageActionRow,
  MessageButton,
  version: discordVersion,
} = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = class Process extends Command {
  constructor() {
    super({
      name: "process",
      aliases: ["stats", "status"],
      description: "Displays bot stats.",
      usage: "",
      category: "<:charliewave_general:771633361340727336> Misc",
      ownerOnly: false,
      cooldown: 3000,
      memberPerms: [],
      clientPerms: [],
    });
  }
  async exec(message) {
    let inviteLink = `https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&permissions=1916267615&scope=bot%20applications.commands`;

    const buttonInvite = new MessageButton()
      .setURL(inviteLink)
      .setLabel("Invite")
      .setStyle("LINK");

    const buttonSupport = new MessageButton()
      .setURL("https://discord.gg/RPRfpnM6MZ")
      .setLabel("Support")
      .setStyle("LINK");

    const buttonWebsite = new MessageButton()
      .setURL("https://skillzl.me/chrlwv")
      .setLabel("Website")
      .setStyle("LINK")
      .setDisabled(true);

    const row = new MessageActionRow().addComponents(
      buttonInvite,
      buttonSupport,
      buttonWebsite
    );

    let emb;
    emb = embed()
      .setColor(0x36393e)
      .setTitle(
        `${this.client.user.tag} ${this.constructor.getTargetEmojiByStatus(
          this.client.presence.status,
          this.client.presence.clientStatus != undefined &&
            this.client.presence.clientStatus.mobile
        )}`
      )
      .addField(
        "<:charliewave_settings:771462923855069204> **SYSTEM:**",
        stripIndents`**Memory:**: ${this.constructor.formatBytes(
          process.memoryUsage().heapUsed,
          2
        )}\n\
                **Discord.js:** v${discordVersion}\n\
                **NodeJS: **${process.version}\n\
				**Developer:** skillzl#7600`,
        true
      )
      .addField(
        "<:charliewave_supporter:771641583963340821> **INTENTS:**",
        stripIndents`**Users:**: ${this.client.users.cache.size.toLocaleString()}\n\
                **Guilds:** ${this.client.guilds.cache.size.toLocaleString()}\n\
                **Channels:** ${this.client.channels.cache.size.toLocaleString()}\n\
            **Database:** [mongoDb](https://www.mongodb.com/), ping: ${Math.round(
              await this.client.databasePing()
            )}ms`,
        true
      )
      .setThumbnail(
        this.client.user.avatarURL({ dynamic: true, size: 2048, format: "png" })
      );
    return message.reply({ embeds: [emb], components: [row] });
  }

  static getTargetEmojiByStatus(status, mobile) {
    switch (status) {
      case "dnd":
        return "<:charliewave_dnd:771635335486111744>";
      case "idle":
        return "<:charliewave_idle:771635289839501333>";
      case "online":
        return mobile === "online"
          ? "<:charliewave_mobile:771635443698499584>"
          : "<:charliewave_online:771635233384693791>";
    }
  }

  static formatBytes(a, b) {
    if (0 == a) return "0 Bytes";
    var c = 1024,
      d = b || 2,
      e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f];
  }
};
