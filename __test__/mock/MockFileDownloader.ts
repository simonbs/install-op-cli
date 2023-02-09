import {FileDownloader} from "../../src/FileDownloader"
import {TemporaryFile} from "../../src/TemporaryFile"
import {MockTemporaryFile} from "./MockTemporaryFile"

export class MockFileDownloader implements FileDownloader {
  download(url: string): Promise<TemporaryFile> {
    return Promise.resolve(new MockTemporaryFile())
  }
}
