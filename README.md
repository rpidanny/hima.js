![alt text](https://github.com/rpidanny/hima.js/raw/master/banner.png "hima.js")

![gh-actions](https://github.com/rpidanny/hima.js/workflows/Publish/badge.svg) [![codecov](https://codecov.io/gh/rpidanny/hima.js/branch/master/graph/badge.svg)](https://codecov.io/gh/rpidanny/hima.js)

## Highlights

- Promise API
- CLI
- TypeScript Support
- Actively Maintained
- Download Single Image
- Download Multiple Images between two dates
- Create Timelapse Video

## Install

```bash
$ brew install graphicsmagick
$ brew install ffmpeg
$ npm install --save @rpidanny/hima
```

`ffmpeg` is required to create the timelapse video. Feel free to skip this if you don't want to create timelapse videos.

## Usage

### CLI

Install package globally using:

`$ npm i -g @rpidanny/hima`

```bash
Usage: hima image [options]

Download single image

Options:
  --out <path>    Output file (default: "./<currentdate>.jpg")
  --date <date>   Date in yyyy/mm/dd hh:mm:ssZ (default: "latest")
  --zoom <level>  Zoom level. 1-3 for IR. 1-5 for color (default: "1")
  --ir            Download Infrared Image (default: false)
  --batch-size    How many tiles to download in parallel?
  --debug         Enable debug logs? (default: false)
  --quiet         Disable all logs? (default: false)
  -h, --help      display help for command
```

```bash
Usage: hima images [options]

Download multiple images

Options:
  --out <path>          Output directory (default: "./")
  --start-date <date>   Date in yyyy/mm/dd hh:mm:ssZ
  --end-date <date>     Date in yyyy/mm/dd hh:mm:ssZ
  --interval <minutes>  Interval between two images (default: "10")
  --zoom <level>        Zoom level. 1-3 for IR. 1-5 for color (default: "1")
  --ir                  Download Infrared Image (default: false)
  --batch-size          How many tiles to download in parallel?
  --debug               Enable debug logs? (default: false)
  --quiet               Disable all logs? (default: false)
  -h, --help            display help for command
```

```bash
Usage: hima timelapse [options]

Create timelapse video

Options:
  --out <path>            Output file (default: "./<currentdate>.mp4")
  --start-date <date>     Date in yyyy/mm/dd hh:mm:ssZ
  --end-date <date>       Date in yyyy/mm/dd hh:mm:ssZ
  --interval <minutes>    Interval between two images (default: "10")
  --quality <resolution>  Resolution. 480, 720, 1080, 1440, 2160 (default: "1080")
  --fps <rate>            Framerate of the video (default: "25")
  --ir                    Download Infrared Image (default: false)
  --batch-size            How many tiles to download in parallel?
  --debug                 Enable debug logs? (default: false)
  --quiet                 Disable all logs? (default: false)
  -h, --help              display help for command
```

### API

#### downloadImage(options?)

##### options

Type: `object`

| key          | default        | type              | description       |
| ------------ | -------------- | ----------------- | ----------------- |
| `date`       | `latest`       | `string` / `date` | String in `yyyy/mm/dd hh:mm:ssZ` or a JS `Date` object.       |
| `zoom`       | `1`            | `number`          | zoom level. 1-3 for IR and 1-5 for color |
| `infrared`   | `false`        | `boolean`         | color image or IR image? |
| `output`     | `./currentdate.jpg`           | `string`          | Output file.      |
| `batchSize`  | `20`           | `number`          | How many tiles to download in parallel? If you get `ECONNRESET`, try lowering the `batchSize`. |
| `debug`      | `false`        | `boolean`         | enable logs?      |
| `timeout`    | `{ connect: 15000, response: 15000, request: 30000 }` | `object`    | [got timeout](https://github.com/sindresorhus/got#timeout)   |
| `progress`   | `None`         | `function`        | A callback function that is called on progress update. Receives two parameters: (`completed`, `total`) |

#### Example

```js
import { downloadImage } from '@rpidanny/hima'

downloadImage({
  zoom: 1,
  batchSize: 20,
  date: '2019/10/21 18:30:20Z', // 2020/02/14
  debug: true,
  progress: (completed, total) => console.log(`Completed ${completed}/${total}`)
})
  .then(console.log)
  .catch(console.error)

```

#### downloadImages(options?)

##### options

Type: `object`

| key          | default  | type              | description       | required |
| ------------ | -------- | ----------------- | ----------------- | -------- |
| `startDate`  | none     | `string` / `date` | String in `yyyy/mm/dd hh:mm:ssZ` or a JS `Date` object. | `yes` |
| `endDate`    | none     | `string` / `date` | String in `yyyy/mm/dd hh:mm:ssZ` or a JS `Date` object. | `yes` |
| `interval`   | `10`     | `number`          | Interval between two images in minutes. (min: 10) | `no` |
| `zoom`       | `1`      | `number`          | zoom level. 1-3 for IR and 1-5 for color | `no` |
| `infrared`   | `false`  | `boolean`         | color image or IR image? | `no` |
| `output`     | `./`     | `string`          | Output file.      | `no` |
| `batchSize`  | `20`     | `number`          | How many tiles to download in parallel? If you get `ECONNRESET`, try lowering the `batchSize`. | `no` |
| `debug`      | `false`  | `boolean`         | enable logs?      | `no` |
| `timeout`    | `{ connect: 15000, response: 15000, request: 30000 }` | `object`    | [got timeout](https://github.com/sindresorhus/got#timeout)   | `no` |
| `progress`   | `None`   | `function`        | A callback function that is called on progress update. Receives two parameters: (`completed`, `total`) | `no` |

#### Example

```js
import { downloadImages, intervals } from '@rpidanny/hima'

downloadImages({
  zoom: 2,
  batchSize: 5,
  startDate: '2020/02/14 05:00:00Z',
  endDate: '2020/03/14 05:00:00Z',
  interval: intervals.DAY, // 1440 minutes
  debug: true,
  output: './images',
  progress: (completed, total) => console.log(`Completed ${completed}/${total}`)
})
  .then(console.log)
  .catch(console.error)

```

#### createTimelapse(options?)

##### options

Type: `object`

| key          | default        | type              | description       | required |
| ------------ | -------------- | ----------------- | ----------------- | -------- |
| `startDate`  | none           | `string` / `date` | String in `yyyy/mm/dd hh:mm:ssZ` or a JS `Date` object.       | `yes` |
| `endDate`    | none           | `string` / `date` | String in `yyyy/mm/dd hh:mm:ssZ` or a JS `Date` object.       | `yes` |
| `interval`   | `10`           | `number`          | Interval between two images in minutes. (min: 10) | `no` |
| `quality`    | `1080`         | `string`          | Resolution. 480, 720, 1080, 1440, 2160 | `no` |
| `fps`        | `25`           | `number`          | Framerate of the video. | `no` |
| `infrared`   | `false`        | `boolean`         | color image or IR image? | `no` |
| `output`     | `./<currentdate>.mp4` | `string`   | Output file.      | `no` |
| `batchSize`  | `20`           | `number`          | How many tiles to download in parallel? If you get `ECONNRESET`, try lowering the `batchSize`. | `no` |
| `debug`      | `false`        | `boolean`         | enable logs?      | `no` |
| `timeout`    | `{ connect: 15000, response: 15000, request: 30000 }` | `object`    | [got timeout](https://github.com/sindresorhus/got#timeout)   | `no` |
| `progress`   | `None`         | `function`        | A callback function that is called on progress update. Receives two parameters: (`completed`, `total`) | `no` |

#### Example

```js
import { createTimelapse, intervals } from '@rpidanny/hima'

createTimelapse({
  quality: '2160',
  batchSize: 64,
  startDate: '2019/10/14 05:00:00Z',
  endDate: '2020/03/14 05:00:00Z',
  interval: intervals.DAY, // 1440 minutes
  debug: true,
  output: './video.mp4',
  progress: (c, t) => console.log(`${(c / t) * 100}% complete`),
})
  .then(console.log)
  .catch(console.error)
```

## Development

Checkout the repository locally, then:

```bash
$ npm i
$ npm run hima
```

## Contribute

Help make this package better and future proof.

- Clone the code
- Install dependencies with `npm i`
- Create a new branch with `git checkout -b new_feature`
- Commit your changes and push your branch
- Submit a PR to `master`
