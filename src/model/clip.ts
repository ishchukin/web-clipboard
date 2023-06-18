export const enum ClipType {
  UrlImage,
  Text
}

export interface ClipBase<T extends ClipType> {
  id: string
  type: T
}

export interface ClipUrlImage extends ClipBase<ClipType.UrlImage> {
  url: string
}

export interface ClipText extends ClipBase<ClipType.Text> {
  text: string
}

export type Clip = ClipUrlImage | ClipText
