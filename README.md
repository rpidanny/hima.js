![alt text](https://github.com/rpidanny/hima.js/raw/master/banner.png "hima.js")
> Based off of [himawari.js](https://github.com/jakiestfu/himawari.js/)

## Highlights

- Promise API
- CLI
- TypeScript Support
- Actively Maintained

## Install

```bash
$ brew install graphicsmagick
$ npm install --save @rpidanny/hima
```

## Usage

### API

#### hima(options?)

##### options

Type: `object`

| key          | default        | type              | description       |
| ------------ | -------------- | ----------------- | ----------------- |
| `date`       | `latest`       | `string` / `date` | String in `yyyy/mm/dd hh:mm:ss` or a JS `Date` object.       |
| `zoom`       | `1`            | `number`          | zoom level. 1-3 for IR and 1-5 for color |
| `infrared`   | `false`        | `boolean`         | color image or IR image? |
| `output`     | `./`           | `string`          | Output file.      |
| `batchSize`  | `20`           | `number`          | How many tiles to download in parallel? If you get `ECONNRESET`, try lowering the `batchSize`. |
| `debug`      | `false`        | `boolean`         | enable logs?      |
| `timeout`    | `{ connect: 15000, response: 15000, request: 30000 }` | `object`    | [got timeout](https://github.com/sindresorhus/got#timeout)   |
| `progress`   | `None`         | `function`        | A callback function that is called on progress update. Receives two parameters: (`completed`, `total`) |

#### Example

```js
import { hima } from 'hima'

hima({
  zoom: 1,
  batchSize: 20,
  date: new Date(1581638400000), // 2020/02/14
  debug: true,
  progress: (completed, total) => console.log(`Completed ${completed}/${total}`)
})
  .then(console.log)
  .catch(console.error)

```

### CLI

Install package globally using:

`$ npm i -g @rpidanny/hima`

```bash
Usage: hima [options]

Options:
  --out <path>    output directory (default: "./")
  --date <date>   Date in yyyy/mm/dd hh:mm:ss (default: "latest")
  --zoom <level>  Zoom level. 1-3 for IR. 1-5 for color (default: "1")
  --ir            Download Infrared Image (default: false)
  --batch-size    How many tiles to download in parallel?
  --debug         Enable debug logs? (default: false)
  --quiet         Disable all logs? (default: false)
  -h, --help      display help for command
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
