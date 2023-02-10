import {DiskTemporaryFile} from "./DiskTemporaryFile"
import {TemporaryFile} from "./TemporaryFile"
import {TemporaryFileFactory} from "./TemporaryFileFactory"

export class DiskTemporaryFileFactory implements TemporaryFileFactory {
  makeTemporaryFile(fileExtension: string = ""): TemporaryFile {
    return new DiskTemporaryFile(fileExtension)
  }
}
