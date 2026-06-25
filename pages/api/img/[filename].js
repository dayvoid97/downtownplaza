import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  const { filename } = req.query

  // Sanitize: only allow known image filenames (no path traversal)
  if (!filename || filename.includes('..') || filename.includes('/')) {
    return res.status(400).end('Bad request')
  }

  const imagePath = path.join(process.cwd(), 'images', filename)

  if (!fs.existsSync(imagePath)) {
    return res.status(404).end('Not found')
  }

  const ext = path.extname(filename).toLowerCase()
  const contentTypes = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
  }
  const contentType = contentTypes[ext] || 'application/octet-stream'

  res.setHeader('Content-Type', contentType)
  res.setHeader('Cache-Control', 'public, max-age=86400, immutable')

  const stream = fs.createReadStream(imagePath)
  stream.on('error', () => res.status(500).end('Read error'))
  stream.pipe(res)
}
