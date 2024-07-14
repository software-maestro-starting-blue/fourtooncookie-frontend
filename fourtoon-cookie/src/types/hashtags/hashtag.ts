import { ImageRequireSource } from "react-native";


export interface Hashtag {
    id: number,
    image: ImageRequireSource,
}

export const hashtags = [
    {
        id: 0,
        image: require(`../../../assets/hashtag/hashtag-0.png`)
    },
    {
        id: 1,
        image: require(`../../../assets/hashtag/hashtag-1.png`)
    },
    {
        id: 2,
        image: require(`../../../assets/hashtag/hashtag-2.png`)
    },
    {
        id: 3,
        image: require(`../../../assets/hashtag/hashtag-3.png`)
    },
    {
        id: 4,
        image: require(`../../../assets/hashtag/hashtag-4.png`)
    },
    {
        id: 5,
        image: require(`../../../assets/hashtag/hashtag-5.png`)
    }
] // TODO: 자동으로 주입할 수 있는 Factory를 만들어야 함.