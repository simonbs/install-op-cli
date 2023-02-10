import {TemporaryFile} from "../../src/TemporaryFile"
import {TemporaryFileFactory} from "../../src/TemporaryFile"
import {MockTemporaryFile} from "./MockTemporaryFile"

export class MockTemporaryFileFactory implements TemporaryFileFactory {
  makeTemporaryFile(fileExtension: string = ""): TemporaryFile {
    return new MockTemporaryFile()
  }
}
