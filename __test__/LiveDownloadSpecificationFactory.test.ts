import {LiveDownloadSpecificationFactory} from "../src/DownloadSpecification/LiveDownloadSpecificationFactory"
import {MockPlatformProvider} from "./mock/MockPlatformProvider"

test("Fallback to macOS system on Darwin platform", async () => {
  const platformProvider = new MockPlatformProvider("darwin")
  const factory = new LiveDownloadSpecificationFactory(platformProvider)
  const spec = factory.downloadSpecification("2.13.1", null, null)
  expect(spec.system).toStrictEqual("macos")
})

test("Fallback to universal architecture for macOS systems", async () => {
  const platformProvider = new MockPlatformProvider("darwin")
  const factory = new LiveDownloadSpecificationFactory(platformProvider)
  const spec = factory.downloadSpecification("2.13.1", "macos", null)
  expect(spec.architecture).toStrictEqual("universal")
})

test("Throws when encountering unsupported platform", async () => {
  const platformProvider = new MockPlatformProvider("win32")
  const factory = new LiveDownloadSpecificationFactory(platformProvider)
  expect(() => { 
    factory.downloadSpecification("2.13.1", null, null)
  }).toThrow()
})
