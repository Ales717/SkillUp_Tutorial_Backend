export interface PeginatedResult {
  data: any[]
  meta: {
    total: number
    page: number
    last_page: number
  }
}
