export type SystemContainer = {
  [name: string]: System
}

export type System = {
  name: string
  archs: {[name: string]: string}
}

export interface Version {
  versionNumber: string
  systems: SystemContainer
}