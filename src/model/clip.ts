export type ClipView = {
  blob: Blob
}

export type Clip = {
  id: string
  timestamp: number
  views: Map<string, ClipView>
}
