import * as path from "path"
import fs from "fs"

export function getVersionsSnapshot() {
  const filePath = path.join(__dirname, "./data/versionsSnapshot.json")
  const string = fs.readFileSync(filePath, "utf8")
  return JSON.parse(string)
}