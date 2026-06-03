# 🚀 Setup Rápido - Aura Hax Ticket

Guía paso a paso para poner el bot en funcionamiento en 10 minutos.

## ✅ Checklist Rápido

- [ ] Node.js instalado
- [ ] Bot creado en Discord Developer Portal
- [ ] Token del bot
- [ ] Tu Discord ID
- [ ] Server ID de tu servidor
- [ ] (Opcional) Cuenta de KeyAuth

## 📝 Paso 1: Configurar el Bot en Discord

### 1.1 Crear Aplicación

1. Ve a https://discord.com/developers/applications
2. Clic en **"New Application"**
3. Nombre: **Aura Hax Ticket**
4. Acepta los términos

### 1.2 Crear Bot

1. En el menú izquierdo → **"Bot"**
2. Clic en **"Add Bot"**
3. Confirma

### 1.3 Configurar Bot

En la sección Bot:

**Token:**
- Clic en **"Reset Token"**
- Copia el token (guárdalo en un lugar seguro)
- ⚠️ **NUNCA lo compartas**

**Privileged Gateway Intents (MUY IMPORTANTE):**
- ✅ Activa **PRESENCE INTENT**
- ✅ Activa **SERVER MEMBERS INTENT**  
- ✅ Activa **MESSAGE CONTENT INTENT**
- Guarda cambios

### 1.4 Invitar Bot al Servidor

1. En el menú izquierdo → **"OAuth2"** → **"URL Generator"**

2. **Scopes** (marca):
   - ✅ bot
   - ✅ applications.commands

3. **Bot Permissions** (marca):
   - ✅ Administrator (o selecciona los permisos que necesites)

4. Copia la URL generada abajo
5. Pégala en tu navegador
6. Selecciona tu servidor
7. Autoriza el bot

## 🔧 Paso 2: Configurar el Proyecto

### 2.1 Instalar Node.js

Si no lo tienes:
- Ve a https://nodejs.org
- Descarga la versión LTS
- Instala

Verifica:
```bash
node --version
npm --version
```

### 2.2 Instalar Dependencias

En la carpeta del bot:

```bash
npm install
```

### 2.3 Crear archivo .env

Crea un archivo llamado `.env` en la raíz del proyecto:

```env
# Información del Bot
DISCORD_TOKEN=tu_token_aqui
OWNER_ID=tu_discord_id_aqui
GUILD_ID=id_de_tu_servidor_aqui

# KeyAuth (opcional - deja vacío por ahora)
KEYAUTH_NAME=
KEYAUTH_OWNERID=
KEYAUTH_SECRET=

# Info de Pago (opcional - personaliza después)
BINANCE_ADDRESS=
NEQUI_NUMBER=
NEQUI_NAME=
PAYPAL_EMAIL=
```

### 2.4 Obtener tus IDs

**Tu Discord ID (OWNER_ID):**
1. En Discord, ve a **Configuración** → **Avanzado**
2. Activa **Modo Desarrollador**
3. Clic derecho en tu usuario → **Copiar ID**
4. Pégalo en `.env` como `OWNER_ID`

**Server ID (GUILD_ID):**
1. Clic derecho en tu servidor (en la lista de servidores)
2. **Copiar ID**
3. Pégalo en `.env` como `GUILD_ID`

**Token del Bot (DISCORD_TOKEN):**
1. Ya lo copiaste del Developer Portal
2. Pégalo en `.env` como `DISCORD_TOKEN`

## ▶️ Paso 3: Ejecutar el Bot

```bash
npm start
```

Deberías ver:
```
✅ Bot conectado como AuraHaxTicket#1234
👑 Owner ID: 123456789
🎫 Sistema de tickets activo - Aura Hax Ticket
```

Si ves esto → **¡FUNCIONÓ!** ✅

## 🎮 Paso 4: Crear Panel de Tickets

1. Ve a tu servidor de Discord
2. El bot debe estar online 🟢
3. En cualquier canal, escribe: **`!setup`**
4. El bot creará el panel de tickets

¡Listo! Ya está funcionando.

## 🧪 Paso 5: Probar

### Prueba como Cliente

1. Haz clic en **"🎫 Crear Ticket"**
2. Se creará un canal privado
3. Selecciona un plan
4. Selecciona cantidad
5. Selecciona método de pago
6. Haz clic en **"Ya realicé el pago"**

### Prueba como Owner

1. En el canal del ticket verás un embed rojo
2. Haz clic en **"Pago verificado"**
3. El bot generará una licencia
4. El ticket se cerrará automáticamente

## 🔑 (Opcional) Configurar KeyAuth

Si quieres keys reales en lugar de temporales:

1. Lee **[KEYAUTH_SETUP.md](KEYAUTH_SETUP.md)**
2. Crea cuenta en keyauth.cc
3. Obtén tus credenciales
4. Agrégalas en `.env`
5. Reinicia el bot

## 🆘 Problemas Comunes

### "Invalid Token"
- Tu token está mal
- Regenera el token en Developer Portal
- Actualiza `.env`

### Bot no responde a comandos
- Verifica que **MESSAGE CONTENT INTENT** esté activado
- Verifica que el bot tenga permisos en el servidor

### "Missing Permissions"
- El bot necesita permisos de administrador
- O al menos: Manage Channels, Send Messages, Embed Links

### No puedo enviar DM al owner
- Asegúrate de tener tus DMs abiertos
- Verifica que tu ID en `OWNER_ID` sea correcto

## 📚 Siguiente Paso

Lee la documentación completa en:
- **[README.md](README.md)** - Documentación principal
- **[KEYAUTH_SETUP.md](KEYAUTH_SETUP.md)** - Setup de KeyAuth
- **[GUIA_RAILWAY.md](GUIA_RAILWAY.md)** - Hosting en Railway

## ☁️ Subir a Railway (Hosting Gratis)

Cuando quieras tener el bot online 24/7:

1. Sube el proyecto a GitHub (sin el archivo .env)
2. Ve a railway.app
3. Crea cuenta con GitHub
4. Deploy desde el repo
5. Agrega las variables de entorno
6. ¡Listo!

Guía detallada en **[GUIA_RAILWAY.md](GUIA_RAILWAY.md)**

---

**¿Dudas?** Revisa los archivos de documentación o los logs del bot para ver errores.

**¡Disfruta tu bot!** 🎉
