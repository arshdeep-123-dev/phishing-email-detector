const calculateRisk = require("../utils/riskCalculator");
const Analysis = require("../models/Analysis");
exports.analyzeEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                message: "Email content required"
            });
        }
        const result = calculateRisk(email);
        // Save into MongoDB
        const analysis = new Analysis({
            email,
            score: result.score,
            level: result.level,
            reasons: result.reasons
        });
        console.log("Saving to MongoDB...");
        await analysis.save();
        console.log("Saved Successfully");
        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.getHistory = async (req, res) => {
    try {
        const history = await Analysis
            .find()
            .sort({ createdAt: -1 });
        res.json(history);
    }    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};