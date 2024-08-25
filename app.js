const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors'); // Import the cors package

const app = express();

app.use(cors()); // Use cors middleware
app.use(express.json()); // For parsing application/json

// Helper function to find the highest lowercase alphabet
function highestLowercaseAlphabet(alphabetArray) {
    const lowercaseAlphabets = alphabetArray.filter(ch => ch >= 'a' && ch <= 'z');
    return lowercaseAlphabets.length ? [Math.max(...lowercaseAlphabets)] : [];
}

// POST method endpoint
app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data || [];

        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: "Invalid input format. 'data' should be an array."
            });
        }

        const numbersArray = data.filter(item => !isNaN(item));
        const alphabetArray = data.filter(item => isNaN(item));

        const highestLowercase = highestLowercaseAlphabet(alphabetArray);

        const response = {
            is_success: true,
            user_id: "john_doe_17091999", // replace with dynamic value if needed
            email: "john@xyz.com",
            roll_number: "ABCD123",
            numbers: numbersArray,
            alphabets: alphabetArray,
            highest_lowercase_alphabet: highestLowercase
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({
            is_success: false,
            message: "An error occurred while processing your request."
        });
    }
});

// GET method endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
