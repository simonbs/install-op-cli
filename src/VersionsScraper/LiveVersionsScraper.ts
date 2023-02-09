import {Version, SystemContainer} from "../Version"
import {VersionsScraper} from "./VersionsScraper"
import * as cheerio from "cheerio"

export class LiveVersionsScraper implements VersionsScraper {
  scrape(html: string): Version[] {
    let versions: Version[] = []
    const $ = cheerio.load(html)
    const articles = $("article")
    for (const article of articles) {
      const version = mapVersion($, article)
      versions.push(version)
    }
    return versions
  }
}

function mapVersion($, article) {
  const versionNumber = $(article).find("h3").contents().first().text().trim()
  const rawSystems = $(article).find(".cli-archs").find("p.system")
  const systems = mapSystems($, rawSystems)
  return {versionNumber, systems}
}

function mapSystems($, rawSystems) {
  let systems: SystemContainer = {}
  for (const rawSystem of rawSystems) {
    const name = $(rawSystem).contents().first().text().trim().replace(/[^a-zA-Z ]/g, "")
    const archs = mapArchs($, rawSystem)
    systems[name.toLowerCase()] = {name, archs}
  }
  return systems
}

function mapArchs($, rawSystem) {
  let archs = {}
  const links = $(rawSystem).find("a")
  for (const link of links) {
    const text = $(link).text()
    const href = $(link).attr("href")
    archs[text] = href
  }
  return archs
}