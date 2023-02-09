import {Version} from "../Version"

export interface ArchLinkExtractor {
  extract(pool: Version[], version: string, system: string, arch: string): string
}