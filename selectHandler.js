import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } from 'discord.js';
import config from '../config.js';

export async function handleSelect(client, interaction) {
  const { customId, values, user } = interaction;

  // Obtener datos del ticket
  let ticketData = client.activeTickets.get(interaction.channel.id);
  if (!ticketData) return;

  // Selección de plan
  if (customId === 'select_plan') {
    await interaction.deferUpdate();

    const planIndex = parseInt(values[0].split('_')[1]);
    const plan = config.product.plans[planIndex];

    // Guardar selección
    ticketData.selectedPlan = planIndex;
    client.activeTickets.set(interaction.channel.id, ticketData);

    // Mostrar selector de cantidad de licencias
    const quantitySelect = new StringSelectMenuBuilder()
      .setCustomId('select_quantity')
      .setPlaceholder('Cantidad de licencias')
      .addOptions([
        { label: '1 licencia — $' + (plan.price * 1).toFixed(2) + ' USD', value: '1', emoji: '1️⃣' },
        { label: '2 licencias — $' + (plan.price * 2).toFixed(2) + ' USD', value: '2', emoji: '2️⃣' },
        { label: '3 licencias — $' + (plan.price * 3).toFixed(2) + ' USD', value: '3', emoji: '3️⃣' },
        { label: '4 licencias — $' + (plan.price * 4).toFixed(2) + ' USD', value: '4', emoji: '4️⃣' },
        { label: '5 licencias — $' + (plan.price * 5).toFixed(2) + ' USD', value: '5', emoji: '5️⃣' }
      ]);

    const embed = new EmbedBuilder()
      .setTitle(`${config.product.name} — ${plan.days} día${plan.days > 1 ? 's' : ''}`)
      .setDescription(
        `**Acceso ${plan.days} día${plan.days > 1 ? 's' : ''}**\n\n` +
        `Precio base **$${plan.price.toFixed(2)} USD**. Seleccione cantidad de licencias.\n\n` +
        `${config.copyright}`
      )
      .setColor(config.colors.primary)
      .setFooter({ text: config.botName })
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(quantitySelect);

    await interaction.followUp({ embeds: [embed], components: [row] });
  }

  // Selección de cantidad
  if (customId === 'select_quantity') {
    await interaction.deferUpdate();

    const quantity = parseInt(values[0]);
    const plan = config.product.plans[ticketData.selectedPlan];

    // Guardar cantidad
    ticketData.licenseQuantity = quantity;
    client.activeTickets.set(interaction.channel.id, ticketData);

    // Mostrar periodo (por si se necesita)
    const embed = new EmbedBuilder()
      .setTitle(`${quantity} licencia${quantity > 1 ? 's' : ''} — $${(plan.price * quantity).toFixed(2)} USD`)
      .setDescription(
        `${quantity}× ${config.product.name} — ${plan.days} día${plan.days > 1 ? 's' : ''}\n\n` +
        `**Total a enviar:** $${(plan.price * quantity).toFixed(2)} USD\n\n` +
        `Ahora selecciona tu método de pago.\n\n` +
        `${config.copyright}`
      )
      .setColor(config.colors.primary)
      .setFooter({ text: config.botName })
      .setTimestamp();

    await interaction.followUp({ embeds: [embed] });
  }

  // Selección de método de pago
  if (customId === 'select_payment_method') {
    await interaction.deferUpdate();

    const paymentId = values[0];
    const payment = config.paymentMethods.find(p => p.id === paymentId);
    
    if (!payment) return;

    // Guardar método de pago
    ticketData.selectedPayment = paymentId;
    client.activeTickets.set(interaction.channel.id, ticketData);

    const plan = config.product.plans[ticketData.selectedPlan];
    const quantity = ticketData.licenseQuantity || 1;
    const totalPrice = plan.price * quantity;

    // Información específica del método de pago
    let paymentInfo = '';
    let totalDisplay = '';

    if (paymentId === 'paypal') {
      const commission = totalPrice * 0.06; // 6% comisión
      const total = totalPrice + commission;
      totalDisplay = `**Total:** $${total.toFixed(2)} USD`;
      paymentInfo = `Comisión ~$${commission.toFixed(2)} (base $${totalPrice.toFixed(2)} USD)`;
    } else if (paymentId === 'binance') {
      totalDisplay = `**Total:** $${totalPrice.toFixed(2)} USD`;
      paymentInfo = `USDT (BEP20)`;
    } else if (paymentId === 'nequi') {
      const copRate = 4000; // Tasa aproximada, puedes ajustarla
      const totalCOP = Math.round(totalPrice * copRate);
      totalDisplay = `**Total:** ${totalCOP.toLocaleString()} COP`;
      paymentInfo = `Pago en pesos colombianos (COP)`;
    }

    const paymentEmbed = new EmbedBuilder()
      .setTitle(`Pago — ${payment.name}`)
      .setDescription(
        `${config.product.name} — ${plan.days} día${plan.days > 1 ? 's' : ''} — $${totalPrice.toFixed(2)} USD\n\n` +
        `${totalDisplay}\n\n` +
        `${paymentInfo}\n\n` +
        `**[AQUÍ IRÍA LA INFO DE PAGO ESPECÍFICA]**\n` +
        `(Número de cuenta, dirección wallet, etc.)\n\n` +
        `Realice la transferencia y pulse **Ya realicé el pago**. Nuestro equipo verificará el pago y la(s) licencia(s) se publicará(n) en este canal.\n\n` +
        `${config.copyright}`
      )
      .setColor(config.colors.primary)
      .setFooter({ text: config.botName })
      .setTimestamp();

    const doneButton = new ButtonBuilder()
      .setCustomId(`payment_done_${user.id}`)
      .setLabel('Ya realicé el pago')
      .setStyle(ButtonStyle.Success)
      .setEmoji('✅');

    const row = new ActionRowBuilder().addComponents(doneButton);

    await interaction.followUp({ embeds: [paymentEmbed], components: [row] });
  }
}
