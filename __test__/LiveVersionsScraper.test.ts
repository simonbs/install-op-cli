import {MockVersionsHTMLReader} from "./mock/MockVersionsHTMLReader"
import {getVersionsSnapshot} from "./mock/getVersionsSnapshot"
import {LiveVersionsScraper} from "../src/VersionsScraper/LiveVersionsScraper"

test("Scrapes versions from HTML", async () => {
  const versionsHTMLReader = new MockVersionsHTMLReader()
  const html = await versionsHTMLReader.read()
  const versionsScraper = new LiveVersionsScraper()
  const versions = versionsScraper.scrape(html)
  const expectedVersions = getVersionsSnapshot()
  expect(versions).toStrictEqual(expectedVersions)
})
