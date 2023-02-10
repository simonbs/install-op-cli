import * as core from "@actions/core"
import {ActionOptions} from "./Action"

export function getOptions(): ActionOptions {
  return {
    skipIfInstalled: core.getBooleanInput("skip-if-installed"),
    versionNumber: core.getInput("version-number"),
    system: core.getInput("system"),
    architecture: core.getInput("architecture")
  }
}
