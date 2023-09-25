import { Server } from 'socket.io'
import jwt, { verify } from 'jsonwebtoken'
import config from './config/config.js'
import { chatService, userService, cartService } from './Service/index.js'
import { logger } from './config/logger.js'

const colors = ['#E6B0AA', '#D7BDE2', '#85C1E9', '#73C6B6', '#FAD7A0', '#F5CBA7', '#AED6F1', '#A9DFBF', '#F9E79F', '#F8C471']


export function initializeSockets(http_server) {
    const socket_server = new Server(http_server, {
        transports: ['websocket'],
    })

    socket_server.on('connection', async socket => {
        //console.log('socket:', socket)

        let token = verifyToken(socket)
        //console.log(token)
        //Cart counter
        if(!token) socket.emit('cartCounter', 0) 
        if(token) {
            const userCart = await cartService.getById(token.cartId)
            const totalQuantity = userCart.products.reduce((total, product) => total + product.quantity, 0)
            socket.emit('cartCounter', totalQuantity)
        }
    
        //Chat seccion
        let color
        let userData
        socket.on('chatAuth', async () => {
            userData = verifyToken(socket)
            console.log('userData', userData)

            if (userData) {
                const username = userData.name;
                socket.emit('chatAuth', { username })

                try {
                    if (userData.chatColor === '') {
                        color = colors[Math.floor(Math.random() * colors.length)]
                        await userService.setColor(userData.id, color)
                    } else {
                        color = await userService.getColorById(userData.id)
                    }
                } catch (err) {
                    console.error(err)
                }

                socket.emit('chatAuth', { username, color })
            }
        });

    
        socket.on('new_message', async (data) => {
            try {
                const dataToSend = {...data, socketId: socket.id, color}
                await chatService.create(dataToSend)
                const chatFromDB = await chatService.getAll()
                socket_server.emit('allMessages', { chatFromDB })
            } catch(error) {
                console.log('Socket Error: ', error)
            }
        })
    
        socket.on('load_messages', async () => {
            try {
                const chatFromDB = await chatService.getAll()
                //console.log('chatFromDB:', chatFromDB)
                socket.emit('allMessages', { chatFromDB })
            } catch(error) {
                console.log('Socket Error: ', error)
            }
        })
    
    })
}

function verifyToken(socket) {
    let token
    const { cookie } = socket.handshake.headers
    const cookiePairs = cookie.trim().split(';')
    for (const cookiePair of cookiePairs) {
        const [name, value] = cookiePair.trim().split('=')
        if (name === 'token') {
            token = value
            break
        }
    }
    if (token) {
        try {
            const decodedToken = jwt.verify(token, config.SECRET_JWT)
            return decodedToken
        } catch (err) {
            logger.error('Error al verificar el token:', err)
        }
    }
    return null
}