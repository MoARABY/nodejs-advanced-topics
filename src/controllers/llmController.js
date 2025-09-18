const openai = require("openai");
const productModel = require('../../DB/models/productModel')
const cosineSimilarity = require("../utils/cosineSimilarity");

const client = new openai.OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: process.env.GROQ_API_URL,
});


const askAI = async (req, res) => { 
    const { id } = req.params
    const { userQuestion } = req.body

    if (!userQuestion) {
        return res.status(400).json({ error: "Question is required" });
    }

    const product = await productModel.findById(id).lean()
    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    const prompt = `
    عندك البيانات التالية عن المنتج:
    ${JSON.stringify(product)}

    السؤال: ${userQuestion}

    رجع إجابة بسيطة ومباشرة للمستخدم بناءً على المنتج.
    `;

    const response = await client.responses.create({
        model: "openai/gpt-oss-20b",
        input: prompt
    })
    console.log(response)
    response ? res.status(200).json({ answer: response.output_text }) : res.status(404).json({ error: "No answer from AI" })
}

const embeddingSearch = async (req, res) => {
    const { id } = req.params;
    const { userQuestion } = req.body;
// نتأكد الاول من الداتا
    if (!userQuestion) {
        return res.status(400).json({ error: "Question is required" });
    }

    const product = await productModel.findById(id).lean();
    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }
    // نجيب الامبدينج بتاع السؤال
    const questionEmbedding = await client.embeddings.create({
        model: "text-embedding-3-small",
        input: userQuestion,
    });
    const qVec = questionEmbedding.data[0].embedding;

    // نحسب التشابه بين الامبدينج بتاع السؤال والمنتج
    const similarity = cosineSimilarity(product.embedding, qVec);

    console.log("Similarity:", similarity);

    if (similarity < 0.7) { // لو التشابه قليل
        return res.status(200).json({ answer: "للأسف، ما عنديش معلومات كافية عن المنتج ده." });
    } else {
        const prompt = `
        المنتج: ${product.name}
        الوصف: ${product.description}
        السؤال: ${userQuestion}
        رجّع إجابة واضحة ومبسطة.
        `;
    }
    const response = await client.responses.create({
        model: "openai/gpt-oss-20b",
        input: prompt,
    });

    res.status(200).json({ answer: response.output_text });
}



module.exports = { askAI , embeddingSearch }
