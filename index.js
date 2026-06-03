import { Client, GatewayIntentBits, Partials, Collection } from 'discord.js';
import { config } from 'dotenv';
import config_bot from './config.js';
import { setupTicketPanel } from './commands/setup.js';
import { handleButton } from './handlers/buttonHandler.js';
import { handleSelect } from './handlers/selectHandler.js';
import { handleModal } from './handlers/modalHandler.js';
import { handleOwnerDM } from './handlers/ownerHandler.js';

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
  ]
});

// Storage temporal para tickets activos
client.activeTickets = new Collection();
client.pendingApprovals = new Collection();

client.once('ready', () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);
  console.log(`👑 Owner ID: ${process.env.OWNER_ID}`);
  console.log(`🎫 Sistema de tickets activo - ${config_bot.botName}`);
  console.log(`🔑 Modo: Keys manuales (owner ingresa las keys)`);
  
  client.user.setActivity('🎫 Aura Hax Tickets', { type: 3 });
});

// Manejo de mensajes (comandos básicos)
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // Comando para crear el panel de tickets (solo owner)
  if (message.content === '!setup' && message.author.id === process.env.OWNER_ID) {
    await setupTicketPanel(message);
    return;
  }

  // Manejo de DMs del owner para aprobar keys
  if (message.channel.type === 1 && message.author.id === process.env.OWNER_ID) {
    await handleOwnerDM(client, message);
  }
});

// Manejo de interacciones (botones, modales y selects)
client.on('interactionCreate', async (interaction) => {
  try {
    if (interaction.isButton()) {
      await handleButton(client, interaction);
    } else if (interaction.isStringSelectMenu()) {
      await handleSelect(client, interaction);
    } else if (interaction.isModalSubmit()) {
      await handleModal(client, interaction);
    }
  } catch (error) {
    console.error('Error en interacción:', error);
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({ 
        content: '❌ Ocurrió un error al procesar tu solicitud.', 
        ephemeral: true 
      });
    }
  }
});

// Manejo de errores
process.on('unhandledRejection', error => {
  console.error('Error no manejado:', error);
});

client.login(process.env.DISCORD_TOKEN);
