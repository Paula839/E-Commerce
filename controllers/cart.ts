import {Request, Response} from "express"
import { ObjectId } from "mongodb";
import {buyers} from "../models/userModel";
import {items} from "../models/productModel";



const get = async (req : Request, res : Response) => {
    try {
        const userId = req.userId // Authorization JWT Token
        const user = await buyers.findOne({_id : userId})
        if(!user) {
            return res.status(404).json({message: "User not found"})
        }

        const userCart = user.cart

        const products = await items.find({_id: userCart}).toArray();

        const totalPrice = products.reduce((sum, product) => {
            return sum + product.price * product.quantity;
        }, 0)

        return res.status(200).json({products, totalPrice})


    } catch(error) {
        return res.status(500).json({message: "Failed to fetch cart products", error})
    }
}

const post = async (req : Request, res : Response) => {
    try {
        const userId = req.userId // Authorization JWT Token
        const user = await buyers.findOne({_id : userId})
        if(!user) {
            return res.status(404).json({message: "User not found"})
        }

        const { itemId, quantity } = req.body;
        
        if(!itemId || !quantity || quantity <= 0) {
            return res.status(400).json({message: "Invalid request"})
        }

        
        const userCart = user.cart
        
        const existingItemIndex = userCart.indexOf(itemId);
        if (existingItemIndex !== -1) {
            userCart[existingItemIndex].quantity += quantity;
        }
        
        userCart.push(req.body.itemId)

        await buyers.updateOne({_id: userId}, {$set: {cart: userCart}})

        return res.status(200).json({message: "Product added to cart"})


    } catch(error) {
        return res.status(500).json({message: "Failed to add product to cart", error})
    }
}

const del = async (req : Request<{id: string}>, res : Response) => {
    try {
        const userId = new ObjectId(req.params.id)

        const user = await buyers.findOne({_id : userId})
        if(!user) {
            return res.status(404).json({message: "User not found"})
        }

        const userCart = user.cart
        if(!Array.isArray(userCart)) {
            return res.status(404).json({message: "Your cart is empty or invalid"})
        }

        const itemId = req.body.itemId

        const index = userCart.indexOf(itemId)

        if(index >= 0) {
            userCart.splice(index, 1)
        }

        await buyers.updateOne({_id: userId}, {$set: {cart: userCart}})
        return res.status(200).json({message: "Product deleted from cart"})

    }  catch(error) {
        return res.status(500).json({message: "Failed to delete a product from cart", error})
    }
}

export const cartController = {
    get,
    post,
    del
}