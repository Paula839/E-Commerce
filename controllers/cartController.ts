import {Request, Response} from "express"
import { ObjectId } from "mongodb";
import {users, user} from "../models/userModel";
import { product, products} from "../models/productModel";
import {cartItem} from "../models/cartModel";



const get = async (req: Request, res: Response) => {
    try {
        const userId:ObjectId =  ObjectId.createFromHexString(req.body.userId);
        const user: user | null = await users.findOne({ _id: userId });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const userCart: cartItem[] = user.cart;

        const itemIds: ObjectId[] = userCart.map((cartItem) => cartItem.item);

        const listProducts: product[] = (await products.find({ _id: { $in: itemIds } }).toArray());
        const totalPrice: number = listProducts.reduce((sum, product) => {
            const cartItem = userCart.find((item) => item.item.toString() === product._id.toString());
            return sum + product.price * (cartItem?.quantity || 0); // Use quantity from cartItem
        }, 0);

        

        res.status(200).json({ products: listProducts, userCart, totalPrice });
    } catch (error) {
        
        res.status(500).json({ message: "Failed to fetch cart products", error });
    }
};


const post = async (req: Request, res: Response) => {
    const userId:ObjectId =  ObjectId.createFromHexString(req.body.userId);
    let { productId, quantity } = req.body;

    if (!productId || !quantity || quantity <= 0) {
        res.status(400).json({ message: "Product ID and quantity are required" });
        return;
    }

    try {
        const product = await products.findOne({ _id: new ObjectId(productId) });
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        const user = await users.findOne({ _id: new ObjectId(userId) });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const existingCartItem = user.cart.find(cartItem => cartItem.item.toString() === product._id.toString());

        if (existingCartItem) {
            await users.updateOne(
                { _id: new ObjectId(userId), "cart.item": product._id },
                { $inc: { "cart.$.quantity": quantity } }  
            );
            res.status(200).json({ message: "Product quantity updated in cart" });
        } else {
            let newCartItem: cartItem = {
                item: new ObjectId(productId),
                name: product.name,  
                quantity: quantity,
            };

            await users.updateOne(
                { _id: new ObjectId(userId) },
                { $push: { cart: newCartItem } }
            );

            res.status(201).json({ message: "Product added to cart" });
        }

    } catch (error) {
        res.status(500).json({ message: "Failed to add product to cart", error });
    }
};



const del = async (req : Request<{id: string}>, res : Response) => {
    try {
        const userId:ObjectId =  ObjectId.createFromHexString(req.body.userId);
        
        const user:user | null = await users.findOne({_id : userId})
        if(!user) {
            res.status(404).json({message: "User not found"})
            return
        }

        const userCart:cartItem[] = user.cart
        if(!Array.isArray(userCart)) {
            res.status(404).json({message: "Your cart is empty or invalid"})
            return
        }

        const itemId: string = (req.params.id)

        const index = userCart.findIndex(cartItem => cartItem.item.toString() === itemId);

        if(index >= 0) {
            userCart.splice(index, 1)
        }

        await users.updateOne({_id: userId}, {$set: {cart: userCart}})
        res.status(200).json({message: "Product deleted from cart"})

    }  catch(error) {
        res.status(500).json({message: "Failed to delete a product from cart", error})
    }
}

export const cartController = {
    get,
    post,
    del
}