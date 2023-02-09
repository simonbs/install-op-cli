import {TemporaryFile} from "../../src/TemporaryFile"

export class MockTemporaryFile implements TemporaryFile {
  public filePath: string
  public didCleanup: boolean
  
  constructor() {
    this.filePath = "/dev/null"
    this.didCleanup = false
  }
  
  cleanup() {
    this.didCleanup = true
  }
}
