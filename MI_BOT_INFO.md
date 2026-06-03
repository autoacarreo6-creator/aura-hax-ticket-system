# 📝 Información de Mi Bot

Guarda esta información de forma segura. La necesitarás para configurar el bot.

## 🤖 Información del Bot en Discord

**Nombre del Bot:** Aura Hax Ticket

### Paso 1: Discord Developer Portal

1. Ve a: https://discord.com/developers/applications
2. Si ya creaste tu aplicación, selecciónala
3. Si no, crea una nueva con el botón "New Application"

### Paso 2: Obtener Token

1. En el menú izquierdo → **Bot**
2. Si no existe el bot, clic en **"Add Bot"**
3. Clic en **"Reset Token"**
4. Copia el token (⚠️ no lo compartas con nadie)
5. Pégalo en tu archivo `.env` como:
   ```
   DISCORD_TOKEN=tu_token_aqui
   ```

### Paso 3: Activar Intents

En la sección **Bot** → **Privileged Gateway Intents**:

- ✅ **PRESENCE INTENT** (activar)
- ✅ **SERVER MEMBERS INTENT** (activar)
- ✅ **MESSAGE CONTENT INTENT** (activar)

Guarda los cambios.

### Paso 4: Obtener Application ID / Client ID

1. En el menú izquierdo → **OAuth2** → **General**
2. Copia el **Client ID**
3. Lo necesitarás para invitar el bot

### Paso 5: Invitar el Bot

URL para invitar (reemplaza CLIENT_ID):
```
https://discord.com/api/oauth2/authorize?client_id=CLIENT_ID&permissions=8&scope=bot%20applications.commands
```

O usa el URL Generator:
1. **OAuth2** → **URL Generator**
2. Scopes: `bot` + `applications.commands`
3. Permissions: `Administrator`
4. Copia y pega la URL en tu navegador

## 👤 Información del Owner

### Tu Discord ID

1. Abre Discord
2. **Configuración de Usuario** → **Avanzado**
3. Activa **Modo Desarrollador**
4. Clic derecho en tu usuario → **Copiar ID**
5. Ese es tu `OWNER_ID`

Pégalo en `.env`:
```
OWNER_ID=tu_id_aqui
```

## 🏠 Información del Servidor

### Server ID / Guild ID

1. Clic derecho en tu servidor
2. **Copiar ID**
3. Ese es tu `GUILD_ID`

Pégalo en `.env`:
```
GUILD_ID=id_del_servidor
```

## 🔑 KeyAuth (Opcional)

Si quieres usar KeyAuth para generar licencias reales:

### Crear Cuenta

1. Ve a: https://keyauth.cc
2. Crea una cuenta
3. Confirma tu email

### Crear Aplicación

1. Dashboard → **"Add Application"**
2. **Application Name:** `Aura Hax FF` (o el nombre que quieras)
3. **Version:** `1.0.0`
4. Guarda

### Obtener Credenciales

**Application Name:**
- El nombre que pusiste (ej: `Aura Hax FF`)

**Owner ID:**
- Dashboard → **Settings** → Copia tu **Owner ID**

**Seller Key / Secret:**
- Tu aplicación → **Seller** o **API** → Genera/Copia tu **Seller Key**

Pégalo todo en `.env`:
```
KEYAUTH_NAME=Aura Hax FF
KEYAUTH_OWNERID=tu_owner_id
KEYAUTH_SECRET=tu_seller_key
```

## 💳 Información de Pago

Edita estas secciones en `.env` con tu información real:

```env
# Binance (USDT BEP20)
BINANCE_ADDRESS=tu_direccion_wallet_aqui

# Nequi
NEQUI_NUMBER=3123456789
NEQUI_NAME=Tu Nombre Completo

# PayPal
PAYPAL_EMAIL=tu@email.com
```

Luego, edita `handlers/selectHandler.js` para que muestre esta información cuando el cliente seleccione el método de pago.

## 📋 Resumen de Variables

Tu archivo `.env` completo debe verse así:

```env
# Bot de Discord
DISCORD_TOKEN=MTA1Nz...
OWNER_ID=123456789...
GUILD_ID=987654321...

# KeyAuth (opcional)
KEYAUTH_NAME=Aura Hax FF
KEYAUTH_OWNERID=abc123...
KEYAUTH_SECRET=def456...

# Métodos de Pago (personaliza)
BINANCE_ADDRESS=0x1234...
NEQUI_NUMBER=3123456789
NEQUI_NAME=Tu Nombre
PAYPAL_EMAIL=tu@email.com
```

## 🔒 Seguridad

### ⚠️ NUNCA COMPARTAS:
- ❌ Tu `DISCORD_TOKEN`
- ❌ Tu `KEYAUTH_SECRET`
- ❌ Tu archivo `.env`

### ✅ Puedes compartir:
- ✅ El Client ID (para invitaciones)
- ✅ El nombre de tu aplicación
- ✅ Las licencias generadas con tus clientes

## 📚 Próximos Pasos

1. ✅ Completa tu `.env` con toda la información
2. ✅ Ejecuta `npm install`
3. ✅ Ejecuta `npm start`
4. ✅ Ve a tu servidor y escribe `!setup`
5. ✅ Prueba el sistema

## 🆘 Si algo sale mal

1. Verifica que todas las variables estén en `.env`
2. Verifica que los intents estén activados
3. Revisa los logs del bot para ver errores
4. Asegúrate de que el token sea válido

---

**Guarda este archivo de forma segura pero NO LO SUBAS A GITHUB.**
