import {StateStore} from "./StateStore"
import {PlatformProvider} from "./PlatformProvider"
import {DownloadSpecificationFactory} from "./DownloadSpecification"
import {VersionsService} from "./VersionsService"
import {ArchLinkExtractor} from "./ArchLinkExtractor"
import {TemporaryFileFactory} from "./TemporaryFile"
import {FileDownloader} from "./FileDownloader"
import {PKGInstaller} from "./PKGInstaller"

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
  
  private checkIfPlatformIsSupported() {
    if (this.platformProvider.platform !== "darwin") {
      throw new Error(
        "Unsupported platform: " + this.platformProvider.platform + ". "
        + "The action can only be used on macOS machines."
      )
    }
  }
}
