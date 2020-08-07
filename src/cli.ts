import path from 'path'
import { program } from 'commander'
import cliProgress from 'cli-progress'
import colors from 'colors' // TODO: replace with chalk

import { downloadImage, downloadImages } from './index'
import { ProgressFunction } from './types'

import packageJson from '../package.json'

interface ImageInputOpts {
  out: string
  date: string
  zoom: string
  ir: boolean
  batchSize: string
  debug: boolean
  quiet: boolean
}

interface ImagesInputOpts {
  out: string
  startDate: string
  endDate: string
  interval: number
  zoom: string
  ir: boolean
  batchSize: string
  debug: boolean
  quiet: boolean
}

const getProgressHandler = (title: string, quiet: boolean): ProgressFunction | undefined => {
  if (quiet) {
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
    status: colors.inverse(title),
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

const handleImageCommand = async (inputOpts: ImageInputOpts): Promise<void> => {
  const { output } = await downloadImage({
    date: inputOpts.date,
    output: path.resolve(inputOpts.out),
    zoom: parseInt(inputOpts.zoom),
    batchSize: (inputOpts.batchSize && parseInt(inputOpts.batchSize)) || 20,
    infrared: inputOpts.ir,
    debug: inputOpts.quiet || inputOpts.debug,
    progress: getProgressHandler('Downloading Image', inputOpts.quiet),
  })

  if (!inputOpts.quiet && output) {
    console.log(colors.green.inverse(`File saved at ${output}`))
  }
}

const handleImagesCommand = async (inputOpts: ImagesInputOpts): Promise<void> => {
  const { images } = await downloadImages({
    startDate: inputOpts.startDate,
    endDate: inputOpts.endDate,
    interval: inputOpts.interval,
    output: path.resolve(inputOpts.out),
    zoom: parseInt(inputOpts.zoom),
    batchSize: (inputOpts.batchSize && parseInt(inputOpts.batchSize)) || 20,
    infrared: inputOpts.ir,
    debug: inputOpts.quiet || inputOpts.debug,
    progress: getProgressHandler('Downloading Images', inputOpts.quiet),
  })
  if (!inputOpts.quiet && images) {
    console.log(colors.green.inverse(`${images.length} Images saved to ${inputOpts.out}`))
  }
}

async function main(): Promise<void> {
  const rootPath = process.cwd()

  const defaultFile = path.resolve(rootPath, `${new Date().toISOString()}.jpg`)

  program.version(packageJson.version)

  program
    .command('image [env]')
    .description('Download single image')
    .option('--out <path>', 'Output file', defaultFile)
    .option('--date <date>', 'Date in yyyy/mm/dd hh:mm:ss', 'latest')
    .option('--zoom <level>', 'Zoom level. 1-3 for IR. 1-5 for color', '1')
    .option('--ir', 'Download Infrared Image', false)
    .option('--batch-size', 'How many tiles to download in parallel?', '20')
    .option('--debug', 'Enable debug logs?', false)
    .option('--quiet', 'Disable all logs?', false)
    .action(async (_env, options) => await handleImageCommand(options))

  program
    .command('images [options]')
    .description('Download multiple image')
    .option('--out <path>', 'Output directory', rootPath)
    .option('--start-date <date>', 'Date in yyyy/mm/dd hh:mm:ss')
    .option('--end-date <date>', 'Date in yyyy/mm/dd hh:mm:ss')
    .option('--interval <minutes>', 'Date in yyyy/mm/dd hh:mm:ss', '10')
    .option('--zoom <level>', 'Zoom level. 1-3 for IR. 1-5 for color', '1')
    .option('--ir', 'Download Infrared Image', false)
    .option('--batch-size', 'How many tiles to download in parallel?', '20')
    .option('--debug', 'Enable debug logs?', false)
    .option('--quiet', 'Disable all logs?', false)
    .action(async (_env, options) => await handleImagesCommand(options))

  program.parse(process.argv)
}

try {
  main()
} catch (err) {
  console.error(err)
}
