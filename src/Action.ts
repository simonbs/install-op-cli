import {StateStore} from "./StateStore"
import {PlatformProvider} from "./PlatformProvider"
import {DownloadSpecificationFactory} from "./DownloadSpecification"
import {VersionsService} from "./VersionsService"
import {ArchLinkExtractor} from "./ArchLinkExtractor"
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
  fileDownloader: FileDownloader
  pkgInstaller: PKGInstaller
  
  constructor(
    stateStore: StateStore,
    platformProvider: PlatformProvider,
    downloadSpecificationFactory: DownloadSpecificationFactory,
    versionsService: VersionsService,
    archLinkExtractor: ArchLinkExtractor,
    fileDownloader: FileDownloader,
    pkgInstaller: PKGInstaller
  ) {
    this.stateStore = stateStore
    this.platformProvider = platformProvider
    this.downloadSpecificationFactory = downloadSpecificationFactory
    this.versionsService = versionsService
    this.archLinkExtractor = archLinkExtractor
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
    const fileURL = this.archLinkExtractor.extract(
      versions, 
      downloadSpecification.versionNumber, 
      downloadSpecification.system, 
      downloadSpecification.architecture
    )
    const file = await this.fileDownloader.download(fileURL)
    await this.pkgInstaller.install(file.filePath)
    file.cleanup()
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
