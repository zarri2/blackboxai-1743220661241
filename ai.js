// Simple AI response logic
function getAIResponse(userInput) {
    const input = userInput.toLowerCase().trim();
    
    // Simple knowledge base
    const knowledgeBase = {
        "hello": "Hello there! How can I assist you today?",
        "hi": "Hello there! How can I assist you today?",
        "bye": "Goodbye! Have a great day!",
        "goodbye": "Goodbye! Have a great day!",
        "what can you do": "I can answer questions, have simple conversations, and assist with basic information.",
        "help": "I can answer questions, have simple conversations, and assist with basic information.",
        "weather": "I don't have real-time weather data, but you can check your local weather service.",
        "news": "I can't provide live news updates, but I recommend checking a news website.",
        "name": "I'm your AI assistant. You can call me Alex.",
        "who are you": "I'm an AI calling assistant designed to help with basic questions.",
        "time": `The current time is ${new Date().toLocaleTimeString()}.`,
        "date": `Today is ${new Date().toLocaleDateString()}.`,
        "today": `Today is ${new Date().toLocaleDateString()}.`
    };

    // Check knowledge base
    for (const [keyword, response] of Object.entries(knowledgeBase)) {
        if (input.includes(keyword)) {
            if (keyword === 'bye' || keyword === 'goodbye') {
                setTimeout(() => {
                    if (typeof endCall === 'function') endCall();
                }, 2000);
            }
            return response;
        }
    }

    // Default responses
    const defaultResponses = [
        "I understand. Can you tell me more?",
        "That's interesting. What else would you like to discuss?",
        "I see. How can I help you with this?",
        "Thanks for sharing. Is there anything specific you'd like to know?"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}
