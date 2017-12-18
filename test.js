const lib = require('./index')

const emit_docs = `
красный синий красный зеленый красный фисташковый&
фисташковый алый лазоревый белый красный
`

const emit_allDocs = 10000

const emit_df = {
'красный': 100,
'синий': 80,
'зеленый': 75,
'фисташковый': 10,
'алый': 50,
'лазоревый': 25,
'белый': 200,
}

const docs = lib.parseDocs(emit_docs, '&')

const docsWord = lib.parseWordInDocs(docs)

const docs_tf = lib.tf_log(docsWord)

const with_all_tf_doc = doc => doc.map(([word, tf]) => tf )

const with_idf = (df, allDocs) => Math.log10(allDocs / df)

const with_docs_tf_idf = dcs_tf =>
  dcs_tf.map(doc => doc.map(([word, tf]) =>
    [ word, lib.tf_idf(tf, with_idf(emit_df[word], emit_allDocs)) ]
  ))

const docs_tf_idf = with_docs_tf_idf(docs_tf)

const with_pure_tfidf = d => d.map(([word, idf]) => idf)

// const with_zero_word = (doc, all_words_count) => doc.length < all_words_count ? doc.concat(Array(5).fill(0))

const uniq_words_count = (doc1, doc2) => {
  const objUniqWord = doc1.concat(doc2).reduce((acc, [w1]) => {
    const isW = doc2.find(([w2]) => w2 === w1)
    return acc[isW[0]]
      ? (acc[isW[0]]+=1, acc)
      : Object.assign(acc, {[w1]: 1})
  }, {})
  return Object.keys(objUniqWord).length
}

// const all_words_count = uniq_words_count(docs_tf_idf[0], docs_tf_idf[1])

const v1 = lib.vector(with_pure_tfidf(docs_tf_idf[0]))
const v2 = lib.vector(with_pure_tfidf(docs_tf_idf[1]))


console.log(docs_tf_idf[0])
console.log('/-----/')
console.log(v1,v2)

/*
console.log('/-----/')
console.log(docs_tf_idf(docs_tf))
console.log('/-----/')
console.log(docs_tf_idf(docs_tf))
*/