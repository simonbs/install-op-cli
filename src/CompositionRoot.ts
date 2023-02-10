import * as core from "@actions/core"
import {Action} from "./Action"
import {StateStore} from "./StateStore/StateStore"
import {KeyValueStateStore} from "./StateStore/KeyValueStateStore"
import {PlatformProvider, LivePlatformProvider} from "./PlatformProvider"
import {HTMLReader, LiveHTMLReader} from "./HTMLReader"
import {NetworkService, LiveNetworkService} from "./NetworkService"
import {DownloadSpecificationFactory, LiveDownloadSpecificationFactory} from "./DownloadSpecification"
import {VersionsScraper, LiveVersionsScraper} from "./VersionsScraper"
import {VersionsService, LiveVersionsService} from "./VersionsService"
import {ArchLinkExtractor, LiveArchLinkExtractor} from "./ArchLinkExtractor"
import {FileDownloader, LiveFileDownloader} from "./FileDownloader"
import {CommandRunner, LiveCommandRunner} from "./CommandRunner"
import {PKGInstaller, LivePKGInstaller} from "./PKGInstaller"
import {TemporaryFileFactory} from "./TemporaryFile/TemporaryFileFactory"
import {DiskTemporaryFileFactory} from "./TemporaryFile/DiskTemporaryFileFactory"

export class CompositionRoot {
  static getAction(): Action {
    return new Action(
      this.getStateStore(),
      this.getPlatformProvider(),
      this.getDownloadSpecificationFactory(),
      this.getVersionsService(),
      this.getArchLinkExtractor(),
      this.getTemporaryFileFactory(),
      this.getFileDownloader(),
      this.getPKGInstaller()
    )
  }
  
  private static getStateStore(): StateStore {
    return new KeyValueStateStore(core)
  }
  
  private static getPlatformProvider(): PlatformProvider {
    return new LivePlatformProvider()
  }
  
  private static getDownloadSpecificationFactory(): DownloadSpecificationFactory {
    return new LiveDownloadSpecificationFactory(this.getPlatformProvider())
  }
  
  private static getVersionsService(): VersionsService {
    return new LiveVersionsService(this.getHTMLReader(), this.getVersionsScraper())
  }
  
  private static getVersionsScraper(): VersionsScraper {
    return new LiveVersionsScraper()
  }
  
  private static getHTMLReader(): HTMLReader {
    return new LiveHTMLReader(this.getNetworkService())
  }
  
  private static getArchLinkExtractor(): ArchLinkExtractor {
    return new LiveArchLinkExtractor()
  }
  
  private static getFileDownloader(): FileDownloader {
    return new LiveFileDownloader(this.getCommandRunner())
  }
  
  private static getPKGInstaller(): PKGInstaller {
    return new LivePKGInstaller(this.getCommandRunner())
  }
  
  private static getCommandRunner(): CommandRunner {
    return new LiveCommandRunner()
  }
  
  private static getNetworkService(): NetworkService {
    return new LiveNetworkService(this.getCommandRunner())
  }
  
  private static getTemporaryFileFactory(): TemporaryFileFactory {
    return new DiskTemporaryFileFactory()
  }
}
