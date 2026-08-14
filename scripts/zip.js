import fs from 'fs'
import path from 'path'
import archiver from 'archiver'

const root = path.resolve(process.cwd())
const outPath = path.join(root, '..', `${path.basename(root)}-submission.zip`)

async function run() {
  const output = fs.createWriteStream(outPath)
  const archive = archiver('zip', { zlib: { level: 9 } })

  output.on('close', () => {
    console.log(`Created ${outPath} (${archive.pointer()} total bytes)`)
  })

  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') console.warn(err)
    else throw err
  })

  archive.on('error', (err) => {
    throw err
  })

  archive.pipe(output)

  // Exclude node_modules, dist, .git
  archive.glob('**/*', {
    cwd: root,
    ignore: ['node_modules/**', 'dist/**', '.git/**', 'node_modules/**/node_modules/**']
  })

  await archive.finalize()
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
