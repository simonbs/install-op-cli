import tmp from "tmp"
import {TemporaryFile} from "./TemporaryFile"

export class DiskTemporaryFile implements TemporaryFile {
  public filePath: string
  fileObj: any
  
  constructor() {
    this.fileObj = tmp.fileSync()
    this.filePath = this.fileObj.name
  }
  
  cleanup() {
    this.fileObj.removeCallback()
  }
}