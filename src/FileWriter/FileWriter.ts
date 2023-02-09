import {TemporaryFile} from "../TemporaryFile"

export interface FileWriter {
  write(data: any): Promise<TemporaryFile>
}