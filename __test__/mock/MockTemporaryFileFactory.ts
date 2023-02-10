import {TemporaryFile} from "../../src/TemporaryFile/TemporaryFile"
import {TemporaryFileFactory} from "../../src/TemporaryFile/TemporaryFileFactory"
import {MockTemporaryFile} from "./MockTemporaryFile"

export class MockTemporaryFileFactory implements TemporaryFileFactory {
  fileExtension: string | null = null
  
  makeTemporaryFile(fileExtension: string = ""): TemporaryFile {
    this.fileExtension = fileExtension
    return new MockTemporaryFile()
  }
}
