import { SlashCommandBuilder } from 'discord.js';

const fortunes = [
  'A small detour makes the best story.',
  'You will discover a shortcut at the worst time.',
  'Ask again after a snack.',
  'A quiet hour brings a loud idea.',
  'Today favors bold coffee decisions.'
];

const eightBall = [
  'Yes.',
  'No.',
  'Maybe.',
  'Definitely not.',
  'Ask later.'
];

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clampInt(value, min, max, fallback) {
  if (Number.isFinite(value)) {
    return Math.min(max, Math.max(min, value));
  }
  return fallback;
}

export const commandDefinitions = [
  {
    data: new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Replies with pong and latency.'),
    async execute(interaction) {
      const sent = await interaction.reply({ content: 'Pong...', fetchReply: true });
      const latency = sent.createdTimestamp - interaction.createdTimestamp;
      await interaction.editReply(`Pong. Round-trip ${latency}ms.`);
    }
  },
  {
    data: new SlashCommandBuilder()
      .setName('fortune')
      .setDescription('Get a mildly random fortune.'),
    async execute(interaction) {
      await interaction.reply(randomItem(fortunes));
    }
  },
  {
    data: new SlashCommandBuilder()
      .setName('8ball')
      .setDescription('Ask the bot a yes/no question.')
      .addStringOption((option) =>
        option
          .setName('question')
          .setDescription('Your question')
          .setRequired(true)
      ),
    async execute(interaction) {
      const question = interaction.options.getString('question', true);
      await interaction.reply(`**Q:** ${question}\n**A:** ${randomItem(eightBall)}`);
    }
  },
  {
    data: new SlashCommandBuilder()
      .setName('roll')
      .setDescription('Roll dice.')
      .addIntegerOption((option) =>
        option
          .setName('sides')
          .setDescription('Number of sides per die (2-100)')
          .setRequired(false)
      )
      .addIntegerOption((option) =>
        option
          .setName('count')
          .setDescription('Number of dice (1-10)')
          .setRequired(false)
      ),
    async execute(interaction) {
      const sidesRaw = interaction.options.getInteger('sides');
      const countRaw = interaction.options.getInteger('count');
      const sides = clampInt(sidesRaw, 2, 100, 6);
      const count = clampInt(countRaw, 1, 10, 1);

      const rolls = Array.from({ length: count }, () => 1 + Math.floor(Math.random() * sides));
      const total = rolls.reduce((sum, value) => sum + value, 0);

      await interaction.reply(`Rolled ${count}d${sides}: ${rolls.join(', ')} (total ${total})`);
    }
  },
  {
    data: new SlashCommandBuilder()
      .setName('choose')
      .setDescription('Pick from comma- or pipe-separated choices.')
      .addStringOption((option) =>
        option
          .setName('choices')
          .setDescription('Example: pizza, tacos, ramen')
          .setRequired(true)
      ),
    async execute(interaction) {
      const raw = interaction.options.getString('choices', true);
      const choices = raw
        .split(/[,|]/)
        .map((item) => item.trim())
        .filter(Boolean);

      if (choices.length === 0) {
        await interaction.reply('Give me at least one choice.');
        return;
      }

      await interaction.reply(`I choose: **${randomItem(choices)}**`);
    }
  }
];

export const commandsJson = commandDefinitions.map((command) => command.data.toJSON());
