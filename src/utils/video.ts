import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'

const asyncExec = promisify(exec)

const qualityToZoomMapping = {
  '480': 1,
  '720': 2,
  '1080': 2,
  '1440': 3,
  '2160': 3,
}

const getZoomFromQuality = (quality: string): number => {
  if (Object.keys(qualityToZoomMapping).indexOf(quality) > -1) {
    return qualityToZoomMapping[quality]
  } else {
    return 1
  }
}

const stitchImagesFromDir = async (
  inputDir: string,
  resolution: string,
  fps: number,
  outputFile: string,
): Promise<void> => {
  const command = `cat ${path.join(
    inputDir,
    '*.jpg',
  )} | ffmpeg -f image2pipe -framerate ${fps} -vcodec mjpeg -i - -vcodec hevc -vf scale=-1:${resolution} ${outputFile}`
  await asyncExec(command)
}

export { getZoomFromQuality, stitchImagesFromDir }
