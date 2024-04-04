import { createBot, createFlow, MemoryDB, createProvider, addKeyword } from "@bot-whatsapp/bot"
import { BaileysProvider } from '@bot-whatsapp/provider-baileys'

const flowBienvenida = addKeyword('hola').addAnswer('Hola biwov_ bienvenido')

/*

*/
const main = async () => {
    const provider = createProvider(BaileysProvider)

    provider.initHttpServer(3002)

    provider.http?.server.post('/send-message', (req, res) => {
        
        const body = req.body
        const message = body.message
        const mediaUrl = body.mediaUrl

        provider.sendMessage('573188268103', message, {
            media: mediaUrl
        })

        console.log(body)
        res.end('esto es del server de polka')
    })

    await createBot({
        flow: createFlow([flowBienvenida]),
        database: new MemoryDB(),
        provider
    })
}

main()