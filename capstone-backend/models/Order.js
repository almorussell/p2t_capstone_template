import mongoose from "mongoose"; // const mongoose = require("mongoose");

// order item schema is a sub mongoose schema that will be a piece of the orderSchema
const orderItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
}, { _id: false });

// shipping address schema is a sub mongoose schema that will be a piece of the orderSchema
const shippingAddressSchema = new mongoose.Schema({
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
}, { _id: false });

// const paymentResultSchema = new mongoose.Schema({
//     id: { type: String },
//     status: { type: String },
//     update_time: { type:String },
//     email_address: { type: String },
// }, { _id: false });

// main order schema that will interact with the database and create new orders
const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    orderItems: [orderItemSchema], // list of orders structured based off of orderItemSchema
    shippingAddress: shippingAddressSchema, // same as orderItemSchema referenced above
    paymentMethod: {
        type: String,
        required: true,
        enum: ['card', 'stripe'], // enum is a from python and is a list, only allowing payments with a card or stripe
        default: 'card',
    },
    // paymentResult: paymentResultSchema,
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDeliver: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
    stripePaymentIntentId: {
        type: String,
    },
    stripeSessionId: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

orderSchema.index({ user: 1 }); // only use this index if you are keeping track of user orders
orderSchema.index({ isPaid: 1 }); // these indexes are database indexes, allows you to search efficiently, without an ID
orderSchema.index({ isDeliver: 1 }); // database indexes are like book tabs
orderSchema.index({ createdAt: -1 });

orderSchema.virtual('orderNumber').get(function(){ // creates custom order number
    return `ORDER-${this._id.toString().substring(18, 24).toUpperCase()}`; // we're using the id and converting it to string, 
    // then calling the substring method to grab characters from string 18 and end right before 24
});

const Order = mongoose.model('Order', orderSchema);

export default Order; // module.exports = Order;