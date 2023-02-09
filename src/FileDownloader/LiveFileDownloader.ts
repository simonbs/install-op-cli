import {FileDownloader} from "./FileDownloader"
import {FileWriter} from "../FileWriter"
import {NetworkService} from "../NetworkService"
import {TemporaryFile} from "../TemporaryFile"

export class LiveFileDownloader implements FileDownloader {
  networkService: NetworkService
  fileWriter: FileWriter
  
  constructor(networkService: NetworkService, fileWriter: FileWriter) {
    this.networkService = networkService
    this.fileWriter = fileWriter
  }
  
  async download(url: string): Promise<TemporaryFile> {
    const response = await this.networkService.getBlob(url)
    return this.fileWriter.write(response.data)
  }
}