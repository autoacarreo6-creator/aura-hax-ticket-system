# 🔑 Configuración de KeyAuth

Esta guía te ayudará a integrar KeyAuth con tu bot de Discord para generar licencias automáticamente.

## 📋 ¿Qué es KeyAuth?

KeyAuth es un sistema de licenciamiento que te permite:
- ✅ Generar keys automáticamente
- ✅ Control de expiración (días)
- ✅ Sistema de suscripciones
- ✅ Panel de administración web
- ✅ Verificación de keys

## 🚀 Paso 1: Crear Cuenta en KeyAuth

1. Ve a [keyauth.cc](https://keyauth.cc)
2. Crea una cuenta gratis
3. Confirma tu email

## 🎮 Paso 2: Crear tu Aplicación

1. En el dashboard, clic en **"Add Application"**
2. Dale un nombre (ej: "Aura Hax FF")
3. Completa la información:
   - **Application Name:** Aura Hax FF
   - **Version:** 1.0.0
4. Clic en **Create**

## 🔧 Paso 3: Obtener tus Credenciales

### 3.1 Application Name
- Es el nombre que pusiste al crear la app
- Ejemplo: `Aura Hax FF`

### 3.2 Owner ID
1. En el dashboard, ve a **Settings**
2. Copia tu **Owner ID**
3. Se ve algo así: `abc123def456`

### 3.3 Secret/Seller Key
1. En tu aplicación, ve a **Seller** o **API**
2. Genera o copia tu **Seller Key**
3. ⚠️ **¡NUNCA compartas esta key!**

## 📝 Paso 4: Configurar en el Bot

Edita tu archivo `.env`:

```env
KEYAUTH_NAME=Aura Hax FF
KEYAUTH_OWNERID=abc123def456
KEYAUTH_SECRET=tu_seller_key_aqui
```

## ✅ Paso 5: Probar la Integración

### 5.1 Ejecutar el bot

```bash
npm start
```

### 5.2 Ver los logs

Deberías ver:
```
✅ Bot conectado como AuraHaxBot#1234
👑 Owner ID: 123456789
🔑 KeyAuth inicializado
✅ KeyAuth session inicializada
🎫 Sistema de tickets activo - Aura Hax Ticket
```

Si ves **"🔑 KeyAuth inicializado"** → ¡Funciona!

### 5.3 Hacer una compra de prueba

1. Crea un ticket
2. Selecciona un plan
3. Selecciona método de pago
4. Pulsa "Ya realicé el pago"
5. Como owner, pulsa "Pago verificado"
6. **El bot generará una key automáticamente con KeyAuth**

## 🎯 Paso 6: Configurar Suscripciones en KeyAuth

Para que las keys funcionen correctamente, necesitas crear las suscripciones:

1. En KeyAuth, ve a tu aplicación
2. Clic en **"Subscriptions"**
3. Crea las siguientes:

| Name | Duration | Level |
|------|----------|-------|
| 1 Day | 1 day | 1 |
| 7 Days | 7 days | 1 |
| 15 Days | 15 days | 1 |
| 30 Days | 30 days | 1 |
| 365 Days | 365 days | 1 |

## 🔍 Verificar que las Keys Funcionan

### Opción 1: Desde el Bot

Cuando se genera una key, verás en los logs:
```
✅ Key generada: XXXX-XXXX-XXXX-XXXX
```

### Opción 2: En KeyAuth Dashboard

1. Ve a tu aplicación
2. Clic en **"Licenses"**
3. Deberías ver las keys generadas

## ⚙️ Funciones Adicionales

### Ver info de una key

El bot puede verificar keys automáticamente. Si quieres agregar un comando:

```javascript
// En handlers/ownerHandler.js
if (content.startsWith('!keyinfo ')) {
  const key = content.split(' ')[1];
  const info = await client.keyauth.getKeyInfo(key);
  
  if (info) {
    return message.reply(
      `**Info de Key:**\n` +
      `Key: ${info.key}\n` +
      `Expira: ${new Date(info.expires * 1000).toLocaleString()}\n` +
      `Estado: ${info.status}\n` +
      `Nivel: ${info.level}`
    );
  }
  
  return message.reply('❌ Key no encontrada');
}
```

### Eliminar una key

```javascript
if (content.startsWith('!delkey ')) {
  const key = content.split(' ')[1];
  const deleted = await client.keyauth.deleteKey(key);
  
  if (deleted) {
    return message.reply('✅ Key eliminada');
  }
  
  return message.reply('❌ Error al eliminar key');
}
```

## 🆘 Solución de Problemas

### "KeyAuth no inicializado"

**Problema:** El bot no cargó KeyAuth

**Solución:**
1. Verifica que las 3 variables estén en `.env`
2. Reinicia el bot
3. Revisa los logs

### "Error al generar key"

**Problema:** KeyAuth rechazó la solicitud

**Soluciones:**
1. Verifica que tu **Seller Key** sea correcta
2. Asegúrate de tener créditos en KeyAuth
3. Verifica que las suscripciones estén creadas

### "Invalid seller key"

**Problema:** La Seller Key está mal

**Solución:**
1. Ve a KeyAuth → Tu app → Seller/API
2. Regenera la Seller Key
3. Actualiza `.env`
4. Reinicia el bot

### Keys temporales en lugar de KeyAuth

**Problema:** El bot genera keys random en lugar de usar KeyAuth

**Solución:**
- Esto pasa cuando KeyAuth no está configurado
- Es el comportamiento por defecto (fallback)
- Configura las variables de `.env` correctamente

## 💰 Precios de KeyAuth

KeyAuth tiene planes gratuitos y de pago:

- **Free:** 10 users máximo
- **Starter ($9.99/mes):** 100 users
- **Premium ($24.99/mes):** 1000 users
- **Enterprise:** Ilimitado

Para comenzar, el plan Free es suficiente.

## 📊 Monitorear tus Ventas

En KeyAuth dashboard puedes ver:
- 📈 Número de keys generadas
- 👥 Usuarios activos
- 💰 Revenue (si integras pagos)
- 📊 Estadísticas por suscripción

## 🔐 Seguridad

⚠️ **NUNCA compartas:**
- Tu Seller Key
- Tu Secret Key
- Tu Owner ID (es menos crítico pero mejor mantenerlo privado)

✅ **Sí puedes compartir:**
- El nombre de tu aplicación
- Las keys generadas con tus clientes

## 🎉 ¡Listo!

Tu bot ahora está integrado con KeyAuth y puede:
- ✅ Generar keys automáticamente
- ✅ Controlar expiración
- ✅ Verificar keys
- ✅ Ver estadísticas

---

**¿Problemas?** Revisa primero que tus credenciales de KeyAuth estén correctas en `.env`
