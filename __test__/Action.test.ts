import {Action} from "../src/Action"
import {MockStateStore} from "./mock/MockStateStore"
import {MockActionOptions} from "./mock/MockActionOptions"
import {MockPlatformProvider} from "./mock/MockPlatformProvider"
import {MockDownloadSpecificationFactory} from "./mock/MockDownloadSpecificationFactory"
import {MockVersionsService} from "./mock/MockVersionsService"
import {MockArchLinkExtractor} from "./mock/MockArchLinkExtractor"
import {MockTemporaryFileFactory} from "./mock/MockTemporaryFileFactory"
import {MockFileDownloader} from "./mock/MockFileDownloader"
import {MockPKGInstaller} from "./mock/MockPKGInstaller"

test("Runs on darwin paltform", async () => {
  const action = new Action(
    new MockStateStore(),
    new MockPlatformProvider("darwin"),
    new MockDownloadSpecificationFactory("2.13.1", "macos", "universal"),
    new MockVersionsService(),
    new MockArchLinkExtractor(),
    new MockTemporaryFileFactory(),
    new MockFileDownloader(),
    new MockPKGInstaller()
  )
  const options = new MockActionOptions("2.13.1", "macos", "universal")
  await action.run(options)
})

test("Throws when running on unsupported platform", async () => {
  const action = new Action(
    new MockStateStore(),
    new MockPlatformProvider("win32"),
    new MockDownloadSpecificationFactory("2.13.1", "macos", "universal"),
    new MockVersionsService(),
    new MockArchLinkExtractor(),
    new MockTemporaryFileFactory(),
    new MockFileDownloader(),
    new MockPKGInstaller()
  )
  const options = new MockActionOptions("2.13.1", "macos", "universal")
  await expect(action.run(options)).rejects.toThrow()
})

test("Enters post-phase after running main-phase", async () => {
  const stateStore = new MockStateStore()
  const action = new Action(
    stateStore,
    new MockPlatformProvider("darwin"),
    new MockDownloadSpecificationFactory("2.13.1", "macos", "universal"),
    new MockVersionsService(),
    new MockArchLinkExtractor(),
    new MockTemporaryFileFactory(),
    new MockFileDownloader(),
    new MockPKGInstaller()
  )
  expect(stateStore.isPost).not.toBeTruthy()
  const options = new MockActionOptions("2.13.1", "macos", "universal")
  await action.run(options)
  expect(stateStore.isPost).toBeTruthy()
})

