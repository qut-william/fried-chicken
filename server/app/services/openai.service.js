const axios = require("axios");
// const openai = require('openai');
// openai.api_key = process.env.OPENAI_API_KEY;

exports.chat = async (transactions, messages) => {
    const apiUrl = "https://api.openai.com/v1/chat/completions";
    const apiKey = process.env.OPENAI_API_KEY;

    const systemPrompt = "You are a helpful assistant in a banking app. Do not provide an answer over 100 words. Only answer banking related questions. Here is the users transaction data\n" + JSON.stringify(transactions)
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