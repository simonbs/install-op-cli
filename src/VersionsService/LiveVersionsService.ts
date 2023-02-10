import {VersionsService} from "./VersionsService"
import {VersionsHTMLReader} from "../VersionsHTMLReader/VersionsHTMLReader"
import {VersionsScraper} from "../VersionsScraper/VersionsScraper"
import {Version} from "../Version"

export class LiveVersionsService implements VersionsService {
  versionsHTMLReader: VersionsHTMLReader
  versionsScraper: VersionsScraper
  
  constructor(versionsHTMLReader: VersionsHTMLReader, versionsScraper: VersionsScraper) {
    this.versionsHTMLReader = versionsHTMLReader
    this.versionsScraper = versionsScraper
  }
  
  async loadVersions(): Promise<Version[]> {
    let html = await this.versionsHTMLReader.read()
    return this.versionsScraper.scrape(html)
  }
}