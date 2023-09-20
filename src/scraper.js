const axios = require('axios')
const cheerio = require('cheerio')
const { model } = require('mongoose')

const URLs = [
  'https://www.intel.com/content/www/us/en/products/details/processors/core/i3/products.html',
  'https://www.intel.com/content/www/us/en/products/details/processors/core/i5/products.html',
  'https://www.intel.com/content/www/us/en/products/details/processors/core/i7/products.html',
  'https://www.intel.com/content/www/us/en/products/details/processors/core/i9/products.html',
]

const CPUs = []

function scrapData() {

  const scrapingPromises = URLs.map(async (url)=>{

    const response = await axios.get(url)
    
    if (response.status === 200 ){
        const $ = cheerio.load(response.data)
        const attr = new Set()
        const data = []
        $('table').first().find('tr').each((index,element)=>{
          if (index === 0) {
            $(element).find('th').each((i,el)=>{
              attr.add($(el).text().trim())
            })
          }
          const props = [...attr]

          let obj = {}
          $(element).find('td').each((i,el)=>{
            obj[props[i]]=$(el).text().trim()
          })
          
          //console.log(obj)
          data.push(obj)
      })

      return data
     
      }
    else{
      console.error('Error :',err)
    }

})
return Promise.all(scrapingPromises).then(v=>v.flat(1))
}


module.exports = {
  getDATA : scrapData,
}
