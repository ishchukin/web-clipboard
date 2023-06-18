export interface ClipBase {
    id: string
}

export const enum ClipType {
    UrlImage,
    Text
}

export interface ClipUrlImage extends ClipBase {
    type: ClipType.UrlImage
    url: string
}

export interface ClipText extends ClipBase {
    type: ClipType.Text
    text: string
}

export type Clip = ClipUrlImage | ClipText
