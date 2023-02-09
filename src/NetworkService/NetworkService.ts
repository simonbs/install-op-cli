import {Response} from "./Response"

export interface NetworkService {
  get(url: string): Promise<Response>
  getBlob(url: string): Promise<Response>
}