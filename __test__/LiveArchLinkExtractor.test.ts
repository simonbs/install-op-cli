import {getVersionsSnapshot} from "./mock/getVersionsSnapshot"
import {LiveArchLinkExtractor} from "../src/ArchLinkExtractor"

test("Extracts the expected link", async () => {
  const versions = getVersionsSnapshot()
  const archLinkExtractor = new LiveArchLinkExtractor()
  const link = archLinkExtractor.extract(versions, "2.7.3", "macos", "universal")
  expect(link).toBe("https://cache.agilebits.com/dist/1P/op2/pkg/v2.7.3/op_apple_universal_v2.7.3.pkg")
})

test("Extracts the expected link when passing a beta version", async () => {
  const versions = getVersionsSnapshot()
  const archLinkExtractor = new LiveArchLinkExtractor()
  const link = archLinkExtractor.extract(versions, "2.8.0-beta.05", "macos", "universal")
  expect(link).toBe("https://cache.agilebits.com/dist/1P/op2/pkg/v2.8.0-beta.05/op_apple_universal_v2.8.0-beta.05.pkg")
})

test("Throws error when version could not be found", async () => {
  const versions = getVersionsSnapshot()
  const archLinkExtractor = new LiveArchLinkExtractor()
  expect(() => {
    archLinkExtractor.extract(versions, "dummy", "macos", "universal")
  }).toThrow()
})

test("Throws error when system could not be found", async () => {
  const versions = getVersionsSnapshot()
  const archLinkExtractor = new LiveArchLinkExtractor()
  expect(() => {
    archLinkExtractor.extract(versions, "2.7.3", "dummy", "universal")
  }).toThrow()
})

test("Throws error when architechture could not be found", async () => {
  const versions = getVersionsSnapshot()
  const archLinkExtractor = new LiveArchLinkExtractor()
  expect(() => {
    archLinkExtractor.extract(versions, "2.7.3", "macos", "dummy")
  }).toThrow()
})
