import { Command } from 'commander'
import { hima } from './index'

interface InputOpts {
  out: string
  date: string
  zoom: string
  ir: boolean
  batchSize: string
  debug: boolean
}

async function main(): Promise<void> {
  const path = process.cwd()

  const program = new Command()

  program.option('--out <path>', 'output directory', path)
  program.option('--date <date>', 'Date in yyyy/mm/dd hh:mm:ss', 'latest')
  program.option('--zoom <level>', 'Zoom level. 1-3 for IR. 1-5 for color', '1')
  program.option('--ir', 'Download Infrared Image', false)
  program.option('--batch-size', 'How many tiles to download in parallel?', '20')
  program.option('--debug', 'Enable debug logs?', false)

  program.parse(process.argv)

  const inputOpts = program.opts() as InputOpts

  console.log(inputOpts)

  await hima({
    date: inputOpts.date,
    output: inputOpts.out,
    zoom: parseInt(inputOpts.zoom),
    batchSize: parseInt(inputOpts.batchSize),
    infrared: inputOpts.ir,
    debug: inputOpts.debug,
  })
}

try {
  main()
} catch (err) {
  console.error(err)
}
