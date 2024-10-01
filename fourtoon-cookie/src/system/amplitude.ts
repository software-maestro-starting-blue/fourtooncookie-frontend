import { track } from '@amplitude/analytics-react-native';

export default function buttonTrack(message?: string) {
    track((message==undefined) ? 'buttonTrack' : message);
}
