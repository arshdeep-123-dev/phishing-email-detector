const mongoose = require("mongoose");
const analysisSchema = new mongoose.Schema({
    sender: {
        type: String,
        default: "Unknown"
    },
    subject: {
        type: String,
        default: "No Subject"
    },
    email: {
        type: String,
        required: true
    },
    score: Number,
    level: String,
    reasons: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model("Analysis", analysisSchema);