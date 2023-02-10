import {VersionsService} from "./VersionsService"
import {HTMLReader} from "../HTMLReader/HTMLReader"
import {VersionsScraper} from "../VersionsScraper/VersionsScraper"
import {Version} from "../Version"

export class LiveVersionsService implements VersionsService {
  htmlReader: HTMLReader
  versionsScraper: VersionsScraper
  
  constructor(htmlReader: HTMLReader, versionsScraper: VersionsScraper) {
    this.htmlReader = htmlReader
    this.versionsScraper = versionsScraper
  }
  
  async loadVersions(): Promise<Version[]> {
    let html = await this.htmlReader.read()
    return this.versionsScraper.scrape(html)
  }
}