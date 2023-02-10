import {Action} from "../src/Action"
import {MockStateStore} from "./mock/MockStateStore"
import {MockActionOptions} from "./mock/MockActionOptions"
import {MockPlatformProvider} from "./mock/MockPlatformProvider"
import {MockCommandExistenceChecker} from "./mock/MockCommandExistenceChecker"
import {MockDownloadSpecificationFactory} from "./mock/MockDownloadSpecificationFactory"
import {MockVersionsService} from "./mock/MockVersionsService"
import {MockArchLinkExtractor} from "./mock/MockArchLinkExtractor"
import {MockTemporaryFileFactory} from "./mock/MockTemporaryFileFactory"
import {MockFileDownloader} from "./mock/MockFileDownloader"
import {MockPKGInstaller} from "./mock/MockPKGInstaller"

test("Runs on darwin platform", async () => {
  const action = new Action(
    new MockStateStore(),
    new MockPlatformProvider("darwin"),
    new MockCommandExistenceChecker(),
    new MockDownloadSpecificationFactory("2.13.1", "macos", "universal"),
    new MockVersionsService(),
    new MockArchLinkExtractor(),
    new MockTemporaryFileFactory(),
    new MockFileDownloader(),
    new MockPKGInstaller()
  )
  const options = new MockActionOptions(false, "2.13.1", "macos", "universal")
  await action.run(options)
})

test("Throws when running on unsupported platform", async () => {
  const action = new Action(
    new MockStateStore(),
    new MockPlatformProvider("win32"),
    new MockCommandExistenceChecker(),
    new MockDownloadSpecificationFactory("2.13.1", "macos", "universal"),
    new MockVersionsService(),
    new MockArchLinkExtractor(),
    new MockTemporaryFileFactory(),
    new MockFileDownloader(),
    new MockPKGInstaller()
  )
  const options = new MockActionOptions(false, "2.13.1", "macos", "universal")
  await expect(action.run(options)).rejects.toThrow()
})

test("Enters post-phase after running main-phase", async () => {
  const stateStore = new MockStateStore()
  const action = new Action(
    stateStore,
    new MockPlatformProvider("darwin"),
    new MockCommandExistenceChecker(),
    new MockDownloadSpecificationFactory("2.13.1", "macos", "universal"),
    new MockVersionsService(),
    new MockArchLinkExtractor(),
    new MockTemporaryFileFactory(),
    new MockFileDownloader(),
    new MockPKGInstaller()
  )
  expect(stateStore.isPost).not.toBeTruthy()
  const options = new MockActionOptions(false, "2.13.1", "macos", "universal")
  await action.run(options)
  expect(stateStore.isPost).toBeTruthy()
})

test("Downloaded package has .pkg file extension", async () => {
  const temporaryFileFactory = new MockTemporaryFileFactory()
  const action = new Action(
    new MockStateStore(),
    new MockPlatformProvider("darwin"),
    new MockCommandExistenceChecker(),
    new MockDownloadSpecificationFactory("2.13.1", "macos", "universal"),
    new MockVersionsService(),
    new MockArchLinkExtractor(),
    temporaryFileFactory,
    new MockFileDownloader(),
    new MockPKGInstaller()
  )
  const options = new MockActionOptions(false, "2.13.1", "macos", "universal")
  await action.run(options)
  expect(temporaryFileFactory.fileExtension).toBe(".pkg")
})

test("Installs package if it is not installed", async () => {
  const pkgInstaller = new MockPKGInstaller()
  const action = new Action(
    new MockStateStore(),
    new MockPlatformProvider("darwin"),
    new MockCommandExistenceChecker(false),
    new MockDownloadSpecificationFactory("2.13.1", "macos", "universal"),
    new MockVersionsService(),
    new MockArchLinkExtractor(),
    new MockTemporaryFileFactory(),
    new MockFileDownloader(),
    pkgInstaller
  )
  const options = new MockActionOptions(false, "2.13.1", "macos", "universal")
  await action.run(options)
  expect(pkgInstaller.didInstall).toBeTruthy()
})

test("Installs package even if it is already installed", async () => {
  const pkgInstaller = new MockPKGInstaller()
  const action = new Action(
    new MockStateStore(),
    new MockPlatformProvider("darwin"),
    new MockCommandExistenceChecker(true),
    new MockDownloadSpecificationFactory("2.13.1", "macos", "universal"),
    new MockVersionsService(),
    new MockArchLinkExtractor(),
    new MockTemporaryFileFactory(),
    new MockFileDownloader(),
    pkgInstaller
  )
  const options = new MockActionOptions(false, "2.13.1", "macos", "universal")
  await action.run(options)
  expect(pkgInstaller.didInstall).toBeTruthy()
})

test("Skips installing package if it is already installed and skipIfInstalled is true", async () => {
  const pkgInstaller = new MockPKGInstaller()
  const action = new Action(
    new MockStateStore(),
    new MockPlatformProvider("darwin"),
    new MockCommandExistenceChecker(true),
    new MockDownloadSpecificationFactory("2.13.1", "macos", "universal"),
    new MockVersionsService(),
    new MockArchLinkExtractor(),
    new MockTemporaryFileFactory(),
    new MockFileDownloader(),
    pkgInstaller
  )
  const options = new MockActionOptions(true, "2.13.1", "macos", "universal")
  await action.run(options)
  expect(pkgInstaller.didInstall).not.toBeTruthy()
})
