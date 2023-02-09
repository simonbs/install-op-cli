import {FileWriter} from "../../src/FileWriter"
import {MockTemporaryFile} from "./MockTemporaryFile"

export class MockFileWriter implements FileWriter {
  public writtenData: any | null

  async write(data: any): Promise<MockTemporaryFile> {
    this.writtenData = data
    return new MockTemporaryFile()
  }
}
