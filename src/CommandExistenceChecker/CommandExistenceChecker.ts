export interface CommandExistenceChecker {
  commandExists(cmd: string): Promise<boolean>
}