const riskKeywords = require("./riskKeywords");

function calculateRisk(emailText) {

    const email = emailText.toLowerCase();

    let score = 0;
    let reasons = [];

    // Keyword Detection
    for (const keyword in riskKeywords) {

        if (email.includes(keyword)) {

            score += riskKeywords[keyword];

            reasons.push(`Contains keyword: "${keyword}"`);

        }

    }

    // URL Detection
    const urlRegex = /(https?:\/\/[^\s]+)/gi;

    const urls = email.match(urlRegex);

    if (urls) {

        score += 15;

        reasons.push("Contains URL");

        urls.forEach(url => {

            if (
                url.includes(".xyz") ||
                url.includes(".ru") ||
                url.includes(".top") ||
                url.includes(".click")
            ) {

                score += 20;

                reasons.push("Suspicious domain detected");

            }

        });

    }

    // Exclamation Marks
    const exclamationCount = (email.match(/!/g) || []).length;

    if (exclamationCount >= 3) {

        score += 10;

        reasons.push("Too many exclamation marks");

    }

    // Capital Words
    const words = emailText.split(" ");

    const capsWords = words.filter(word =>
        word.length > 4 &&
        word === word.toUpperCase()
    );

    if (capsWords.length >= 3) {

        score += 10;

        reasons.push("Too many capitalized words");

    }

    let level;

    if (score <= 30) {

        level = "LOW";

    }

    else if (score <= 60) {

        level = "MEDIUM";

    }

    else {

        level = "HIGH";

    }

    return {

        score,
        level,
        reasons

    };

}

module.exports = calculateRisk;