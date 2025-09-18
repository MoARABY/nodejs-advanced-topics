
function cosineSimilarity(vecA, vecB) {
    let dot = 0.0;
    let normA = 0.0;
    let normB = 0.0;
    for (let i = 0; i < vecA.length; i++) {
       dot += vecA[i] * vecB[i];
       normA += vecA[i] * vecA[i];
       normB += vecB[i] * vecB[i];
    }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

module.exports = cosineSimilarity;
