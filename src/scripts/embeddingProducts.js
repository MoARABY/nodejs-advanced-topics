const openai = require("openai");
const productModel = require('../../DB/models/productModel')

const client = new openai.OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: process.env.GROQ_API_URL,
});

const embeddingProducts = async () => {

    const products = await productModel.find().lean()

    await Promise.all(products.map(async (product) => {
        const text = `${product.name}\n${product.description || ""}`;
        const response = await client.embeddings.create({
            model: "text-embedding-ada-002",
            input: text
        });
        const embedding = response.data[0].embedding;
        await productModel.findByIdAndUpdate(product._id, { $set: { embedding } });
        console.log(`Updated product ${product.name}`);
    }));


    console.log("All embeddings generated and stored");
    process.exit(0);
}

embeddingProducts().catch(console.error);