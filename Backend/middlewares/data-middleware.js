import {DocDocument} from '../models/user.js'

documentSchema.pre('save', function(next) {
    if (!this.claimNumber) {
        this.claimNumber = generateClaimNumber(); // Call function to generate claim number
    }
    next();
});

function generateClaimNumber() {
    const prefix = 'CLAIM-';
    const randomNumber = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit random number
    return `${prefix}${randomNumber}`;
}