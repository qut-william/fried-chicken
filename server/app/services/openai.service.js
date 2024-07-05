const axios = require("axios");
// const openai = require('openai');
// openai.api_key = process.env.OPENAI_API_KEY;

exports.chat = async (transactions, messages) => {
    const apiUrl = "https://api.openai.com/v1/chat/completions";
    const apiKey = process.env.OPENAI_API_KEY;

    const systemPrompt = `
    You are a helpful assistant in a banking app for Australians. 

    Guidelines:
    1. Only answer banking-related questions.
    2. Do not exceed 100 words in your response.
    3. If prompted about spending or when you provide a dollar amount, add this note at the start of your message:
    
    "&AR&"

    Here is the user's transaction data:
    ${JSON.stringify(transactions)}
    `;
    const promptMessages = [{ role: "system", content: systemPrompt }, ...messages]

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
    };

    const body = {
        model: "gpt-3.5-turbo",
        messages: promptMessages
    };

    try {
        const response = await axios.post(apiUrl, body, { headers });
        const content = response.data.choices[0].message.content
        console.log(content)
        if (content.startsWith("&AR&")) {
            const slicedContent = content.slice(4);
            return [...messages, { AR: true, role: "system", content: slicedContent }];
        }
        return [...messages, { role: "system", content }];
    } catch (err) {
        console.log(err)
        throw new Error("OpenAI - Couldn't process ChatGPT Prompt");
    }
};

// exports.getSearchResults = async (q) => {
//     const apiUrl = "https://api.openai.com/v1/chat/completions";
//     const apiKey = process.env.OPENAI_API_KEY;

//     const headers = {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${apiKey}`,
//     };

//     const body = {
//         model: "gpt-3.5-turbo",
//         messages: [
//             {
//                 role: "system",
//                 content: "",
//             },
//             {
//                 role: "user",
//                 content: `Please format the ${q}\n`,
//             },
//         ],
//     };

//     try {
//         console.log("trying to send")
//         const response = await axios.post(apiUrl, body, { headers });
//         return response.data.choices[0].message.content;
//     } catch (err) {
//         console.log(err.response)
//         // console.log(err.response.status)

//         throw new Error(err.message);
//     }
// };