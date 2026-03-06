export function calculateTfIdfSimilarity(doc1: string, doc2: string, allDocs: string[]): number {
  // 1. Tokenize and remove stop words
  const stopWords = new Set(['the', 'is', 'in', 'and', 'to', 'a', 'of', 'for', 'on', 'with', 'as', 'by', 'an', 'this', 'that', 'it', 'are', 'be', 'or', 'from', 'at', 'which', 'not', 'have', 'has', 'but', 'they', 'you', 'we', 'can', 'will', 'if', 'when', 'how', 'what', 'who', 'where', 'why', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now']);
  
  const tokenize = (text: string) => {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word));
  };

  const doc1Tokens = tokenize(doc1);
  const doc2Tokens = tokenize(doc2);
  const allDocsTokens = allDocs.map(tokenize);

  // 2. Calculate Term Frequency (TF)
  const getTf = (tokens: string[]) => {
    const tf: Record<string, number> = {};
    const totalTerms = tokens.length;
    if (totalTerms === 0) return tf;
    
    tokens.forEach(token => {
      tf[token] = (tf[token] || 0) + 1;
    });
    
    for (const token in tf) {
      tf[token] = tf[token] / totalTerms;
    }
    return tf;
  };

  const tf1 = getTf(doc1Tokens);
  const tf2 = getTf(doc2Tokens);

  // 3. Calculate Inverse Document Frequency (IDF)
  const idf: Record<string, number> = {};
  const totalDocs = allDocsTokens.length;
  
  // Get unique terms across doc1 and doc2 to calculate IDF only for relevant terms
  const relevantTerms = new Set([...Object.keys(tf1), ...Object.keys(tf2)]);
  
  relevantTerms.forEach(term => {
    let docsWithTerm = 0;
    allDocsTokens.forEach(docTokens => {
      if (docTokens.includes(term)) {
        docsWithTerm++;
      }
    });
    // Add 1 to avoid division by zero, and 1 to the numerator to smooth
    idf[term] = Math.log((totalDocs + 1) / (docsWithTerm + 1)) + 1; 
  });

  // 4. Calculate TF-IDF vectors
  const vector1: Record<string, number> = {};
  const vector2: Record<string, number> = {};
  
  relevantTerms.forEach(term => {
    vector1[term] = (tf1[term] || 0) * idf[term];
    vector2[term] = (tf2[term] || 0) * idf[term];
  });

  // 5. Calculate Cosine Similarity
  let dotProduct = 0;
  let mag1 = 0;
  let mag2 = 0;

  relevantTerms.forEach(term => {
    dotProduct += vector1[term] * vector2[term];
    mag1 += vector1[term] * vector1[term];
    mag2 += vector2[term] * vector2[term];
  });

  mag1 = Math.sqrt(mag1);
  mag2 = Math.sqrt(mag2);

  if (mag1 === 0 || mag2 === 0) return 0;
  
  return dotProduct / (mag1 * mag2);
}
