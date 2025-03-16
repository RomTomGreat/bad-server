import { existsSync, rename } from 'fs'
import { basename, join, normalize, resolve } from 'path'

function movingFile(imagePath: string, from: string, to: string) {
    const fileName = basename(imagePath)
    const imagePathTemp = join(from, fileName)
    const imagePathPermanent = join(to, fileName)
    const correctImagePathTemp = normalize(imagePathTemp)
    const correctImagePathPermanent = normalize(imagePathPermanent)

    if (!correctImagePathTemp.startsWith(resolve(from))) {
        throw new Error('Неверный путь к временной папке')
    }
    if (!correctImagePathPermanent.startsWith(resolve(to))) {
        throw new Error('Неверный путь к постоянной папке')
    }

    if (!existsSync(correctImagePathTemp)) {
        throw new Error('Файл не найден во временной папке')
    }

    rename(correctImagePathTemp, correctImagePathPermanent, (err) => {
        if (err) {
            throw new Error('Ошибка при сохранении файла')
        }
    })
}

export default movingFile
