// const openai = require("openai");

// const client = new openai.OpenAI({
//     apiKey: process.env.LLM_API_KEY
// });




// const response = client.responses.create({
//   model: "gpt-5-nano",
//   input: "يعني ايه داتابيز",
//   store: true,
// });

// response.then((result) => console.log(result.output_text));



const  Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
    await groq.chat.completions.create({
        messages: [{
            role: "user",
            content: "Explain the importance of fast language models",
        },],
        model: "openai/gpt-oss-20b",
    })
    .then((chatCompletion) => {
        console.log(chatCompletion.choices[0]?.message?.content || "");
    });
}

main();
