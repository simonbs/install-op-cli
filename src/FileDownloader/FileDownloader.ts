import {TemporaryFile} from "../TemporaryFile"

export interface FileDownloader {
  download(url: string): Promise<TemporaryFile>
}