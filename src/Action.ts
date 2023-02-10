import {StateStore} from "./StateStore/StateStore"
import {PlatformProvider} from "./PlatformProvider/PlatformProvider"
import {DownloadSpecificationFactory} from "./DownloadSpecification/DownloadSpecificationFactory"
import {VersionsService} from "./VersionsService/VersionsService"
import {ArchLinkExtractor} from "./ArchLinkExtractor/ArchLinkExtractor"
import {TemporaryFileFactory} from "./TemporaryFile/TemporaryFileFactory"
import {FileDownloader} from "./FileDownloader/FileDownloader"
import {PKGInstaller} from "./PKGInstaller/PKGInstaller"

export interface ActionOptions {
  versionNumber: string
  system: string | null
  architecture: string | null
}

export class Action {
  stateStore: StateStore
  platformProvider: PlatformProvider
  downloadSpecificationFactory: DownloadSpecificationFactory
  versionsService: VersionsService
  archLinkExtractor: ArchLinkExtractor
  temporaryFileFactory: TemporaryFileFactory
  fileDownloader: FileDownloader
  pkgInstaller: PKGInstaller
  
  constructor(
    stateStore: StateStore,
    platformProvider: PlatformProvider,
    downloadSpecificationFactory: DownloadSpecificationFactory,
    versionsService: VersionsService,
    archLinkExtractor: ArchLinkExtractor,
    temporaryFileFactory: TemporaryFileFactory,
    fileDownloader: FileDownloader,
    pkgInstaller: PKGInstaller
  ) {
    this.stateStore = stateStore
    this.platformProvider = platformProvider
    this.downloadSpecificationFactory = downloadSpecificationFactory
    this.versionsService = versionsService
    this.archLinkExtractor = archLinkExtractor
    this.temporaryFileFactory = temporaryFileFactory
    this.fileDownloader = fileDownloader
    this.pkgInstaller = pkgInstaller
  }

  async run(options: ActionOptions) {
    this.checkIfPlatformIsSupported()
    this.validateOptions(options)
    if (!this.stateStore.isPost) {
      await this.runMain(options)
      this.stateStore.isPost = true
    }
  }
  
  private async runMain(options: ActionOptions) {
    const downloadSpecification = this.downloadSpecificationFactory.downloadSpecification(
      options.versionNumber, 
      options.system, 
      options.architecture
    )
    const versions = await this.versionsService.loadVersions()
    const pkgURL = this.archLinkExtractor.extract(
      versions, 
      downloadSpecification.versionNumber, 
      downloadSpecification.system, 
      downloadSpecification.architecture
    )
    const pkgFile = this.temporaryFileFactory.makeTemporaryFile("pkg")
    await this.fileDownloader.download(pkgURL, pkgFile.filePath)
    await this.pkgInstaller.install(pkgFile.filePath)
    pkgFile.cleanup()
  }
  
  private validateOptions(options: ActionOptions) {
    if (options.versionNumber == null || options.versionNumber.length <= 0) {
      throw new Error("The version number must be specified.")
    }
  }
  
  private checkIfPlatformIsSupported() {
    if (this.platformProvider.platform !== "darwin") {
      throw new Error(
        "Unsupported platform: " + this.platformProvider.platform + ". "
        + "The action can only be used on macOS machines."
      )
    }
  }
}
