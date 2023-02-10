import fs from "fs"
import path from "path"
import {VersionsHTMLReader} from "../../src/VersionsHTMLReader/VersionsHTMLReader"

export class MockVersionsHTMLReader implements VersionsHTMLReader {
  async read(): Promise<string> {
    const filePath = path.join(__dirname, "./data/versions.html")
    return fs.readFileSync(filePath, "utf8")
  }
}