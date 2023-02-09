import {promises as fs} from "fs"
import {FileWriter} from "./FileWriter"
import {TemporaryFile} from "../TemporaryFile/TemporaryFile"
import {DiskTemporaryFile} from "../TemporaryFile/DiskTemporaryFile"

export class DiskFileWriter implements FileWriter {
  async write(data: any): Promise<TemporaryFile> {
    const tmpFile = new DiskTemporaryFile()
    await fs.writeFile(tmpFile.filePath, data, "binary")
    return tmpFile
  }
}