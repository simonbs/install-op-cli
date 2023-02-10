import tmp from "tmp"
import {TemporaryFile} from "./TemporaryFile"

export class DiskTemporaryFile implements TemporaryFile {
  public filePath: string
  fileObj: any
  
  constructor(fileExtension: string = "") {
    this.fileObj = tmp.fileSync({postfix: fileExtension})
    this.filePath = this.fileObj.name
  }
  
  cleanup() {
    this.fileObj.removeCallback()
  }
}