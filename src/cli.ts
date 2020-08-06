import path from 'path'
import { Command } from 'commander'
import cliProgress from 'cli-progress'
import colors from 'colors' // TODO: replace with chalk

import { downloadImage } from './index'
import { ProgressFunction } from './types'

interface InputOpts {
  out: string
  date: string
  zoom: string
  ir: boolean
  batchSize: string
  debug: boolean
  quiet: boolean
}

const getProgressHandler = (inputOpts: InputOpts): ProgressFunction | undefined => {
  if (inputOpts.quiet) {
    return
  }
  const progressBar = new cliProgress.SingleBar(
    {
      format: `{status} |${colors.cyan('{bar}')}| {percentage}% | {completed}/{totalTiles} Chunks`,
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true,
    },
    cliProgress.Presets.shades_classic,
  )
  progressBar.start(100, 0, {
    percentage: 0,
    status: colors.inverse('Downloading Image'),
    completed: 0,
    totalTiles: 0,
  })

  return (completed, totalTiles) => {
    if (completed >= totalTiles) {
      progressBar.update((completed / totalTiles) * 100, {
        status: colors.inverse.green('Download Complete'),
        completed,
        totalTiles,
      })
      return progressBar.stop()
    }
    progressBar.update((completed / totalTiles) * 100, {
      completed,
      totalTiles,
    })
  }
}

async function main(): Promise<void> {
  const rootPath = process.cwd()

  const program = new Command()

  program.option('--out <path>', 'output directory', rootPath)
  program.option('--date <date>', 'Date in yyyy/mm/dd hh:mm:ss', 'latest')
  program.option('--zoom <level>', 'Zoom level. 1-3 for IR. 1-5 for color', '1')
  program.option('--ir', 'Download Infrared Image', false)
  program.option('--batch-size', 'How many tiles to download in parallel?', '20')
  program.option('--debug', 'Enable debug logs?', false)
  program.option('--quiet', 'Disable all logs?', false)

  program.parse(process.argv)

  const inputOpts = program.opts() as InputOpts

  const { output } = await downloadImage({
    date: inputOpts.date,
    output: path.resolve(inputOpts.out),
    zoom: parseInt(inputOpts.zoom),
    batchSize: (inputOpts.batchSize && parseInt(inputOpts.batchSize)) || 20,
    infrared: inputOpts.ir,
    debug: inputOpts.quiet || inputOpts.debug,
    progress: getProgressHandler(inputOpts),
  })

  if (!inputOpts.quiet && output) {
    console.log(colors.green.inverse(`File saved at ${output}`))
  }
}

try {
  main()
} catch (err) {
  console.error(err)
}
