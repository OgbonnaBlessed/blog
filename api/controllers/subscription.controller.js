import Subscriber from '../models/subscriber.model.js';
import { errorHandler } from '../utils/error.js';

// Subscribe a new user
export const subscribeUser = async (req, res, next) => {
    const { email } = req.body;

    // Check if the email is provided
    if (!email) {
        return next(errorHandler(400, 'Email is required'));
    }

    try {
        // Check if the email already exists
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(200).json({ exists: true, message: 'You are already subscribed' });
        }

        // Create a new subscriber
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();
        
        res.status(201).json({ success: true, message: 'Subscription successful' });
    } catch (error) {
        next(error);
    }
};