import {Version} from "../Version"

export interface VersionsScraper {
  scrape(html: string): Version[]
}