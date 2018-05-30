// eslint-disable-next-line import/no-extraneous-dependencies
const fs = require('mz/fs')
const path = require('path')

const inputFile = path.resolve(__dirname, '../build/index.html')
const outputFile = path.resolve(__dirname, '../../functions/html-template.js')
//const searchCriteria = /<div.*id=("|')root("|').*>(.|\n)*<\/div>/i

function expressFunction(markup) {
  return `module.exports = (content,init) => \`${markup}\`\n`
}

// eslint-disable-next-line no-console
console.log('Start to copy html markup to SSR code')

fs.readFile(inputFile, 'utf-8')
  .then((content) => {
    // const searchResult = content.match(searchCriteria)

    // if (!Array.isArray(searchResult)) {
    //   throw Error(`no string matching ${searchCriteria}`)
    // }
    // const openHtmlElem = searchResult[0].substring(0, searchResult[0].indexOf('</div>'))
    // const replacement = `${openHtmlElem} \${content} `
    // const newMarkup = content.replace(openHtmlElem, replacement)
    // return expressFunction(newMarkup)

    //console.log(content);
    

    const replacement = `\${content}`
    const temp1 = content.replace('{{SSR}}', replacement)

    //const replacement2 = `\${init}`
    const replacement2 = `<script>
      window.__initialState = \${JSON.stringify(init).replace(/</g, '\\u003c')}
    </script>`
    const temp2 = temp1.replace('{{preloadinit}}', replacement2)
  

    return expressFunction(temp2)

  })
  .then((moduleExpression) => {
    fs.writeFileSync(outputFile, moduleExpression, 'utf-8')
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Successfully copied html markup to SSR code')
  })
  .catch((error) => { throw new Error(error) })
