import ProductManagerDao from "../dao/Mongo/ProductManager.js";
import CartManagerDao from "../dao/Mongo/CartManager.js";
import UserManagerDao from "../dao/Mongo/UserManager.js";
import ChatManagerDao from "../dao/Mongo/ChatManager.js";
import TicketManagerDao from "../dao/Mongo/TicketManager.js";

//Completar repositories
import ProductRepository from "../repositories/product.repository.js";

const productService = new ProductRepository( new ProductManagerDao())
const cartService = new CartManagerDao()
const userService = new UserManagerDao()
const chatService = new ChatManagerDao()
const ticketService = new TicketManagerDao()

export {
    productService,
    cartService,
    userService,
    chatService,
    ticketService
}