import {FileDownloader} from "../../src/FileDownloader/FileDownloader"

export class MockFileDownloader implements FileDownloader {
  download(url: string, filePath: string): Promise<void> {
      return Promise.resolve()
  }
}
