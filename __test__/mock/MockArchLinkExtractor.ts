import {Version} from "../../src/Version"
import {ArchLinkExtractor} from "../../src/ArchLinkExtractor"

export class MockArchLinkExtractor implements ArchLinkExtractor {
  url: string
  
  constructor(url: string = "https://example/cli.pkg") {
    this.url = url
  }
  
  extract(pool: Version[], version: string, system: string, arch: string): string {
    return this.url
  }
}
