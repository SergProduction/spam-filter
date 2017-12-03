/*
в бд будут только спам документы(сообщения), нормальных сообщений не будет
у каждого слова будет порядковый номер, и вес по дефолту 100%
так же должен быть скан документов на skip-n-gramm, это будет еще один слой распознования
после того как документ(сообщение) помеченно как спам `/spam` - бот будет читать последующие нормальные сообщения,
находить схожие ключевые слова с спам документом, и уменьшать вес общему слову как спам,
тем саммым, спамный документ очиститься от нормальных слов,
или часто встечающищся слов и предлогов в нормальных сообщениях,
и по оставшимся словам можно будет утвердить что они наиболее вероятно спамные
*/ // depricated

/*
tf = count_word / all_word_in_doc
idf = Math.log10( docs.length / word_count_in_docs )
tf-idf = tf * idf
*/

/*
const fs = require('fs')
const path = require('path')
const Datastore = require('nedb')


fs.readFile(path.join(__dirname, './spam.txt'), (err, file) => {
  const text = file.toString('utf8')
  const docs = parseDocs(text, /-;/g)
  const d = parseWordInDocs(docs)
  const tf = comput_tf(d)
  const idf = comput_idf(d[0][0], d)
  // console.log(tf, idf)
})
*/

exports.parseDocs = (text, separate) => {
  return separate
    ? text.split(separate)
    : [text]
}

exports.parseWordInDocs = docs => {
  const d = []
  return docs.map((doc, i) => {
    const words = doc.split(/[\n\s]+/g).filter(word => word !== '')
    return words
  })
}

exports.comput_tf = docs => {
  return docs.map(doc => {
    return doc.map(word => {
      const count = doc.filter(w => w === word)
      const tf = count.length / doc.length
      return [ word, tf ]
    })
  })
}

exports.comput_idf = (word, docs) => {
  let word_count_in_docs = 0
  docs.forEach(doc => {
    const res = doc.find(([wrd, weight]) => wrd === word)
    if (res) {
      word_count_in_docs += 1
    }
  })

  return word_count_in_docs !== 0
    ? Math.log10(docs.length / word_count_in_docs)
    : 0
}
