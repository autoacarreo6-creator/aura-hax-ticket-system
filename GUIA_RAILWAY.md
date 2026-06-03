# 🚂 Guía Completa: Desplegar en Railway

Esta guía te llevará paso a paso para desplegar tu bot en Railway y obtener 30 días gratis.

## 📋 Requisitos Previos

- ✅ Cuenta de GitHub
- ✅ Cuenta de Railway (se crea gratis)
- ✅ Bot de Discord configurado
- ✅ Tu código subido a GitHub

## 🎯 Paso 1: Preparar el Proyecto para Railway

### 1.1 Verificar archivos necesarios

Asegúrate de tener estos archivos:
- ✅ `package.json`
- ✅ `railway.json`
- ✅ `.gitignore` (debe incluir `.env`)

### 1.2 Subir a GitHub

```bash
# Inicializar repositorio (si no lo has hecho)
git init

# Agregar archivos
git add .

# Commit
git commit -m "Bot de tickets listo para Railway"

# Crear repositorio en GitHub y conectarlo
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git branch -M main
git push -u origin main
```

**⚠️ IMPORTANTE:** NO subas el archivo `.env` a GitHub. Debe estar en `.gitignore`

## 🚀 Paso 2: Crear Cuenta en Railway

1. Ve a [railway.app](https://railway.app)
2. Clic en "Login" → "Login with GitHub"
3. Autoriza Railway a acceder a GitHub
4. ✅ Cuenta creada

### 💰 Crédito Gratis

- Railway te da **$5 USD gratis** al registrarte
- Esto es suficiente para ~30 días de hosting
- No necesitas tarjeta de crédito inicialmente

## 🎮 Paso 3: Desplegar el Bot

### 3.1 Crear Nuevo Proyecto

1. En Railway, clic en "New Project"
2. Selecciona "Deploy from GitHub repo"
3. Busca y selecciona tu repositorio
4. Railway detectará automáticamente que es un proyecto Node.js

### 3.2 Configurar Variables de Entorno

**MUY IMPORTANTE:** Debes agregar tus variables de entorno en Railway.

1. En tu proyecto, ve a la pestaña "Variables"
2. Clic en "New Variable"
3. Agrega cada una:

```
DISCORD_TOKEN=tu_token_del_bot_aqui
OWNER_ID=tu_id_de_discord_aqui
GUILD_ID=id_del_servidor_aqui
```

**Cómo obtener cada valor:**

#### DISCORD_TOKEN
1. Ve a [Discord Developer Portal](https://discord.com/developers/applications)
2. Selecciona tu aplicación
3. Ve a "Bot" → "Token" → "Reset Token" → Copiar

#### OWNER_ID
1. En Discord, activa Modo Desarrollador (Configuración > Avanzado > Modo Desarrollador)
2. Clic derecho en tu usuario → Copiar ID

#### GUILD_ID
1. Clic derecho en tu servidor → Copiar ID

### 3.3 Configurar Intents del Bot

Antes de que funcione, asegúrate de activar los intents en Discord:

1. [Discord Developer Portal](https://discord.com/developers/applications)
2. Tu aplicación → "Bot"
3. Scroll hasta "Privileged Gateway Intents"
4. Activa:
   - ✅ PRESENCE INTENT
   - ✅ SERVER MEMBERS INTENT
   - ✅ MESSAGE CONTENT INTENT
5. Guarda cambios

### 3.4 Deploy Automático

Una vez agregadas las variables:
1. Railway desplegará automáticamente
2. Espera 1-2 minutos
3. Ve a la pestaña "Deployments"
4. Si ves "Success" ✅ → ¡Está funcionando!

## 📊 Paso 4: Verificar que Funciona

### 4.1 Ver Logs

1. En Railway, ve a "Deployments"
2. Clic en el deployment activo
3. Ve a "View Logs"
4. Deberías ver:
```
✅ Bot conectado como TuBot#1234
👑 Owner ID: 123456789
🎫 Sistema de tickets activo
```

### 4.2 Probar en Discord

1. Ve a tu servidor de Discord
2. El bot debería estar online 🟢
3. Escribe `!setup` en un canal
4. Debería aparecer el panel de tickets

## ⚙️ Paso 5: Configuración Adicional (Opcional)

### 5.1 Dominio Personalizado

Railway te da un dominio automático, pero no lo necesitas para el bot.

### 5.2 Monitoreo

En Railway puedes ver:
- 📊 Uso de CPU y RAM
- 💰 Créditos gastados
- 📈 Uptime
- 🔄 Reiniciar el bot

### 5.3 Actualizaciones Automáticas

Cada vez que hagas `git push` a tu repositorio:
- Railway detecta el cambio
- Redespliega automáticamente
- ¡Sin downtime!

## 🔧 Mantenimiento

### Reiniciar el Bot

1. Ve a tu proyecto en Railway
2. Tres puntos (...) → "Restart"

### Ver Uso de Créditos

1. Dashboard de Railway
2. Tu proyecto → "Usage"
3. Verás cuánto crédito te queda

### Agregar Más Créditos

Cuando se acaben los $5 gratis:
1. "Account Settings" → "Billing"
2. Puedes agregar $5 más (dura otro mes)
3. O conectar tarjeta para créditos automáticos

## 🆘 Solución de Problemas

### El bot no está online

**Verifica:**
1. ✅ Variables de entorno correctas
2. ✅ Token del bot válido
3. ✅ Intents activados
4. ✅ Logs sin errores en Railway

**Comando para ver logs:**
En Railway → Deployments → View Logs

### "Invalid Token" en logs

- Tu `DISCORD_TOKEN` está mal
- Regenera el token en Discord Developer Portal
- Actualiza en Railway Variables

### "Missing Permissions"

- El bot necesita permisos de administrador
- Re-invita el bot con este link:
```
https://discord.com/api/oauth2/authorize?client_id=TU_CLIENT_ID&permissions=8&scope=bot
```

### Bot se desconecta solo

- Se acabó el crédito de Railway
- Ve a Usage para verificar
- Agrega más crédito

## 💡 Tips

1. **Monitorea tu crédito:** Railway te avisa cuando queda poco
2. **Guarda las variables:** Haz backup de tu `.env` localmente
3. **Logs:** Revisa los logs regularmente por errores
4. **GitHub:** Mantén tu código actualizado

## 📞 Recursos

- [Documentación de Railway](https://docs.railway.app)
- [Discord Developer Portal](https://discord.com/developers)
- [Discord.js Docs](https://discord.js.org)

## 🎉 ¡Listo!

Tu bot ahora está:
- ✅ Online 24/7
- ✅ Desplegado en Railway
- ✅ Con 30 días gratis
- ✅ Actualizaciones automáticas

---

**¿Problemas?** Revisa los logs en Railway primero. El 90% de los problemas se ven ahí.
