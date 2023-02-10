import {TemporaryFile} from "./TemporaryFile"

export interface TemporaryFileFactory {
  makeTemporaryFile(fileExtension: string): TemporaryFile
}