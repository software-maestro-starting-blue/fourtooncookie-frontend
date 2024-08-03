import { View, Text } from 'react-native';
import * as S from './LoginInfoLayout.styled';
import { Member } from '../../../types/member';

export interface LoginInfoLayoutProps {
    member: Member | null;
}

const LoginInfoLayout = (props: LoginInfoLayoutProps) => {
    const { member } = props;

    return (
        <View>
            <Text style={S.styles.infoText}>이름: {member ? member.name : 'Loading...'}</Text>
            <Text style={S.styles.infoText}>연결된 계정: {member ? member.email : 'Loading...'}</Text>
        </View>
    );
}

export default LoginInfoLayout;