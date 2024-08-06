import fs from 'fs'
import path from 'path'

export async function getServerSideProps({ res }) {

  let directoryPath = path.join(process.cwd(), 'src/pages').replace(/\\/g, '/')

  let files = []

  function throughDirectory(directory) {
    fs.readdirSync(directory).forEach((file) => {
      const Absolute = path.join(directory, file)
      if (fs.statSync(Absolute).isDirectory()) return throughDirectory(Absolute)
      else return files.push(Absolute)
    })
  }

  throughDirectory(path.join(process.cwd(), 'src/pages'))

  console.log(directoryPath)

  const regex = new RegExp(/directoryPath|.js|.md/, '')

  const filter = [
    '/api',
    '_app.jsx',
    '_document.jsx',
    '_error.jsx',
    'sitemap.xml.js',
  ]

  // List of all pages to be included in the sitemap
  const staticPages = files
    .filter((staticPage) => {
      return !filter.some((f) => staticPage.includes(f))
    })
    .map((staticPagePath) => {
      console.log({ staticPagePath })
      const path = staticPagePath
        .replace(/\\/g, '/')
        .replace(directoryPath, '')
        .replace('.jsx', '')
        .replace('.js', '')
        .replace('.md', '')
        .replace('//', '/')
      console.log({ directoryPath })
      console.log({ path })
      return `${`https://developers.metaplex.com`}${path}`
    })

  // Include dynamic pages if you have any
  // Example: Fetch dynamic routes from your CMS or database

  // Combine static and dynamic pages
  const allPages = [...staticPages]

  // Generate the sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
            </url>
          `
        })
        .join('')}
    </urlset>`

  // Set the content type to XML
  res.setHeader('Content-Type', 'text/xml')
  // Send the XML response
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default function Sitemap() {
  // The function is empty because the response is handled in getServerSideProps
}
