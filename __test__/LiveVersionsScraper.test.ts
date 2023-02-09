import {MockHTMLReader} from "./mock/MockHTMLReader"
import {getVersionsSnapshot} from "./mock/getVersionsSnapshot"
import {LiveVersionsScraper} from "../src/VersionsScraper"

test("Scrapes versions from HTML", async () => {
  const htmlReader = new MockHTMLReader()
  const html = await htmlReader.read()
  const versionsScraper = new LiveVersionsScraper()
  const versions = versionsScraper.scrape(html)
  const expectedVersions = getVersionsSnapshot()
  expect(versions).toStrictEqual(expectedVersions)
})
