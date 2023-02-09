import fs from "fs"
import path from "path"
import {HTMLReader} from "../../src/HTMLReader"

export class MockHTMLReader implements HTMLReader {
  async read(): Promise<string> {
    const filePath = path.join(__dirname, "./data/versions.html")
    return fs.readFileSync(filePath, "utf8")
  }
}