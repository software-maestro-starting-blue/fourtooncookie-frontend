

export interface Hashtag {
    id: number,
    image: any,
}

export const hashtags = [
    {
        id: 0,
        image: require(`../../../assets/hashtag/hashtag-0.png`)
    }
] // TODO: 자동으로 주입할 수 있는 Factory를 만들어야 함.