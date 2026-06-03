// Sistema alternativo para aprobar por DM (texto simple)
// Si prefieres escribir comandos en lugar de usar botones

export async function handleOwnerDM(client, message) {
  const content = message.content.toLowerCase();

  // Listar aprobaciones pendientes
  if (content === '!pending' || content === '!pendientes') {
    if (client.pendingApprovals.size === 0) {
      return message.reply('No hay solicitudes pendientes.');
    }

    let list = '**📋 Solicitudes Pendientes:**\n\n';
    client.pendingApprovals.forEach((approval, id) => {
      list += `ID: \`${id}\`\n`;
      list += `Usuario: <@${approval.userId}>\n`;
      list += `Producto: ${approval.productType}\n`;
      list += `Método: ${approval.paymentMethod}\n\n`;
    });

    return message.reply(list);
  }

  // Comando de ayuda
  if (content === '!help' || content === '!ayuda') {
    return message.reply(
      '**🤖 Comandos del Owner:**\n\n' +
      '`!pending` - Ver solicitudes pendientes\n' +
      '`!help` - Mostrar esta ayuda\n\n' +
      '**Nota:** Usa los botones en las notificaciones para aprobar/rechazar compras.'
    );
  }
}
