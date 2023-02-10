import * as core from "@actions/core"
import {Action} from "./Action"
import {StateStore} from "./StateStore/StateStore"
import {KeyValueStateStore} from "./StateStore/KeyValueStateStore"
import {PlatformProvider} from "./PlatformProvider/PlatformProvider"
import {LivePlatformProvider} from "./PlatformProvider/LivePlatformProvider"
import {HTMLReader} from "./HTMLReader/HTMLReader"
import {LiveHTMLReader} from "./HTMLReader/LiveHTMLReader"
import {NetworkService} from "./NetworkService/NetworkService"
import {LiveNetworkService} from "./NetworkService/LiveNetworkService"
import {DownloadSpecificationFactory} from "./DownloadSpecification/DownloadSpecificationFactory"
import {LiveDownloadSpecificationFactory} from "./DownloadSpecification/LiveDownloadSpecificationFactory"
import {VersionsScraper} from "./VersionsScraper/VersionsScraper"
import {LiveVersionsScraper} from "./VersionsScraper/LiveVersionsScraper"
import {VersionsService} from "./VersionsService/VersionsService"
import {LiveVersionsService} from "./VersionsService/LiveVersionsService"
import {ArchLinkExtractor} from "./ArchLinkExtractor/ArchLinkExtractor"
import {LiveArchLinkExtractor} from "./ArchLinkExtractor/LiveArchLinkExtractor"
import {FileDownloader} from "./FileDownloader/FileDownloader"
import {LiveFileDownloader} from "./FileDownloader/LiveFileDownloader"
import {CommandRunner} from "./CommandRunner/CommandRunner"
import {LiveCommandRunner} from "./CommandRunner/LiveCommandRunner"
import {PKGInstaller} from "./PKGInstaller/PKGInstaller"
import {LivePKGInstaller} from "./PKGInstaller/LivePKGInstaller"
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
