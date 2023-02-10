import {TemporaryFile} from "../../src/TemporaryFile/TemporaryFile"
import {TemporaryFileFactory} from "../../src/TemporaryFile/TemporaryFileFactory"
import {MockTemporaryFile} from "./MockTemporaryFile"

export class MockTemporaryFileFactory implements TemporaryFileFactory {
  makeTemporaryFile(fileExtension: string = ""): TemporaryFile {
    return new MockTemporaryFile()
  }
}
