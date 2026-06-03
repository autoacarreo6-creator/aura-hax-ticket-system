import { 
  EmbedBuilder, 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle, 
  ChannelType, 
  PermissionFlagsBits,
  StringSelectMenuBuilder
} from 'discord.js';
import config from '../config.js';

export async function handleButton(client, interaction) {
  const { customId, user, guild } = interaction;

  // Crear ticket
  if (customId === 'create_ticket') {
    await interaction.deferReply({ ephemeral: true });

    // Verificar si el usuario ya tiene un ticket abierto
    const existingTicket = client.activeTickets.find(t => t.userId === user.id);
    if (existingTicket) {
      return interaction.editReply({
        content: `❌ Ya tienes un ticket abierto: <#${existingTicket.channelId}>`,
      });
    }

    // Crear canal de ticket
    const ticketChannel = await guild.channels.create({
      name: `ticket-${user.username}`,
      type: ChannelType.GuildText,
      parent: interaction.channel.parentId,
      permissionOverwrites: [
        {
          id: guild.id,
          deny: [PermissionFlagsBits.ViewChannel],
        },
        {
          id: user.id,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.AttachFiles,
            PermissionFlagsBits.ReadMessageHistory,
          ],
        },
      ],
    });

    // Guardar ticket activo
    client.activeTickets.set(ticketChannel.id, {
      userId: user.id,
      channelId: ticketChannel.id,
      createdAt: Date.now(),
    });

    // Embed de solicitud de compra
    const requestEmbed = new EmbedBuilder()
      .setTitle(`Solicitud de compra`)
      .setDescription(
        `Use el menú inferior para elegir su plan y el método de pago.\n\n` +
        `La licencia se publicará **en este canal** al finalizar el proceso.\n\n` +
        `• **PayPal:** entrega automática al confirmar el pago.\n` +
        `• **Otros métodos:** tras pagar, pulse **Ya realicé el pago**; solo el equipo autorizado puede pulsar **Pago verificado**.\n\n` +
        `${config.copyright}`
      )
      .setColor(config.colors.primary)
      .setFooter({ text: config.botName })
      .setTimestamp();

    // Select menu para el plan
    const planSelect = new StringSelectMenuBuilder()
      .setCustomId('select_plan')
      .setPlaceholder('Seleccione una suscripción')
      .addOptions(
        config.product.plans.map((plan, index) => ({
          label: plan.label,
          description: `Acceso ${plan.days} día${plan.days > 1 ? 's' : ''}`,
          value: `plan_${index}`,
          emoji: '🎮'
        }))
      );

    // Select menu para método de pago
    const paymentSelect = new StringSelectMenuBuilder()
      .setCustomId('select_payment_method')
      .setPlaceholder('Método de pago')
      .addOptions(
        config.paymentMethods.map(method => ({
          label: method.name,
          description: method.display,
          value: method.id,
          emoji: method.emoji
        }))
      );

    // Botón de cerrar ticket
    const closeButton = new ButtonBuilder()
      .setCustomId('close_ticket')
      .setLabel('Cerrar ticket')
      .setStyle(ButtonStyle.Danger)
      .setEmoji('🔒');

    const row1 = new ActionRowBuilder().addComponents(planSelect);
    const row2 = new ActionRowBuilder().addComponents(paymentSelect);
    const row3 = new ActionRowBuilder().addComponents(closeButton);

    await ticketChannel.send({ 
      content: `${user}`, 
      embeds: [requestEmbed], 
      components: [row1, row2, row3] 
    });

    await interaction.editReply({
      content: `✅ Ticket creado: ${ticketChannel}`,
    });
  }

  // Cerrar ticket
  if (customId === 'close_ticket') {
    await interaction.deferReply();

    const closeEmbed = new EmbedBuilder()
      .setTitle('🔒 Ticket Cerrado')
      .setDescription('Este ticket se cerrará en 5 segundos...')
      .setColor(config.colors.error)
      .setTimestamp();

    await interaction.editReply({ embeds: [closeEmbed] });

    setTimeout(async () => {
      client.activeTickets.delete(interaction.channel.id);
      await interaction.channel.delete();
    }, 5000);
  }

  // Botón "Ya realicé el pago"
  if (customId.startsWith('payment_done_')) {
    await interaction.deferUpdate();

    const ticketData = client.activeTickets.get(interaction.channel.id);
    if (!ticketData || !ticketData.selectedPlan || !ticketData.selectedPayment) {
      return;
    }

    const plan = config.product.plans[ticketData.selectedPlan];
    const payment = config.paymentMethods.find(p => p.id === ticketData.selectedPayment);

    // Crear mensaje de revisión pendiente
    const pendingEmbed = new EmbedBuilder()
      .setTitle(`@Vendedor X Revisión pendiente`)
      .setDescription(
        `**Verificación de pago manual**\n\n` +
        `Cliente: ${user}\n` +
        `Producto: ${config.product.name} — ${plan.days} día${plan.days > 1 ? 's' : ''}\n` +
        `Método: ${payment.name}\n` +
        `Importe: $${plan.price.toFixed(2)} USD\n\n` +
        `Si el pago es correcto, pulse **Pago verificado** para emitir la(s) licencia(s) en este canal.\n\n` +
        `${config.copyright}`
      )
      .setColor(config.colors.pending)
      .setFooter({ text: config.botName })
      .setTimestamp();

    const verifyButton = new ButtonBuilder()
      .setCustomId(`verify_payment_${user.id}`)
      .setLabel('Pago verificado')
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(verifyButton);

    await interaction.channel.send({ embeds: [pendingEmbed], components: [row] });

    // Enviar notificación al owner
    try {
      const owner = await client.users.fetch(process.env.OWNER_ID);
      const ownerEmbed = new EmbedBuilder()
        .setTitle(`🔔 Nueva Solicitud de Verificación`)
        .setDescription(
          `**Cliente:** ${user.tag} (${user.id})\n` +
          `**Producto:** ${config.product.name} — ${plan.days} días\n` +
          `**Método:** ${payment.name}\n` +
          `**Precio:** $${plan.price} USD\n` +
          `**Licencias:** ${ticketData.licenseQuantity || 1}\n\n` +
          `Canal: ${interaction.channel}`
        )
        .setColor(config.colors.warning)
        .setTimestamp();

      await owner.send({ embeds: [ownerEmbed] });
    } catch (error) {
      console.log('No se pudo enviar DM al owner');
    }
  }

  // Botón "Pago verificado" (solo owner o staff autorizado)
  if (customId.startsWith('verify_payment_')) {
    // Verificar si es el owner
    if (interaction.user.id !== process.env.OWNER_ID) {
      return interaction.reply({
        content: '❌ Solo el equipo autorizado puede verificar pagos.',
        ephemeral: true
      });
    }

    const ticketData = client.activeTickets.get(interaction.channel.id);
    if (!ticketData) return;

    const plan = config.product.plans[ticketData.selectedPlan];

    // Mostrar modal para que el owner ingrese la key manualmente
    const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = await import('discord.js');
    
    const modal = new ModalBuilder()
      .setCustomId(`owner_key_modal_${interaction.channel.id}`)
      .setTitle('Ingresar Licencia');

    const keyInput = new TextInputBuilder()
      .setCustomId('license_key')
      .setLabel('Licencia para el cliente')
      .setStyle(TextInputStyle.Short)
      .setRequired(true)
      .setPlaceholder('XXXX-XXXX-XXXX-XXXX');

    const row = new ActionRowBuilder().addComponents(keyInput);
    modal.addComponents(row);

    await interaction.showModal(modal);
  }

  // Aprobar key desde DM del owner (sistema alterno)
  if (customId.startsWith('approve_')) {
    const approvalId = customId.split('_')[1];
    const approval = client.pendingApprovals.get(approvalId);

    if (!approval) {
      return interaction.reply({ 
        content: '❌ Esta solicitud ya no está disponible.', 
        ephemeral: true 
      });
    }

    await interaction.deferUpdate();

    const plan = config.product.plans[approval.planIndex];
    const clientChannel = await client.channels.fetch(approval.channelId);
    const clientUser = await client.users.fetch(approval.userId);

    // Generar key
    const generatedKey = await generateKey(client, plan.days, approval.licenseQuantity || 1);

    const keyEmbed = new EmbedBuilder()
      .setTitle(`✅ Licencia Generada`)
      .setDescription(
        `**${clientUser}, tu compra ha sido aprobada!**\n\n` +
        `🎮 **Producto:** ${config.product.name}\n` +
        `⏰ **Duración:** ${plan.days} días\n` +
        `💵 **Precio:** $${plan.price} USD\n\n` +
        `🔑 **Tu licencia:**\n` +
        `\`\`\`\n${generatedKey}\n\`\`\`\n\n` +
        `${config.copyright}`
      )
      .setColor(config.colors.success)
      .setFooter({ text: config.botName })
      .setTimestamp();

    await clientChannel.send({ content: `${clientUser}`, embeds: [keyEmbed] });

    await interaction.editReply({
      content: `✅ Licencia entregada a ${clientUser.tag}`,
      components: []
    });

    client.pendingApprovals.delete(approvalId);

    setTimeout(async () => {
      client.activeTickets.delete(approval.channelId);
      try {
        await clientChannel.delete();
      } catch (error) {}
    }, 30000);
  }

  // Rechazar compra
  if (customId.startsWith('reject_')) {
    const approvalId = customId.split('_')[1];
    const approval = client.pendingApprovals.get(approvalId);

    if (!approval) {
      return interaction.reply({ 
        content: '❌ Esta solicitud ya no está disponible.', 
        ephemeral: true 
      });
    }

    await interaction.deferUpdate();

    const clientChannel = await client.channels.fetch(approval.channelId);
    const clientUser = await client.users.fetch(approval.userId);

    const rejectEmbed = new EmbedBuilder()
      .setTitle('❌ Pago Rechazado')
      .setDescription(
        `Lo sentimos, tu comprobante no fue aprobado.\n\n` +
        `Por favor verifica tu método de pago e intenta nuevamente.`
      )
      .setColor(config.colors.error)
      .setTimestamp();

    await clientChannel.send({ content: `${clientUser}`, embeds: [rejectEmbed] });

    await interaction.editReply({ 
      content: '❌ Compra rechazada.',
      components: [] 
    });

    client.pendingApprovals.delete(approvalId);
  }
}
