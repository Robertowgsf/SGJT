import React from 'react';
import { View, Button } from 'react-native';
import { Input } from 'react-native-elements';
import styles from '../assets/styles';

const Profile = () => {
    return (
        <View style={styles.container}>
            <Input
                containerStyle={styles.bottomSpacer}
                label="Nome"
                labelStyle={styles.label}
            /><Input
                containerStyle={styles.bottomSpacer}
                label="Email"
                labelStyle={styles.label}
            /><Input
                containerStyle={styles.bottomSpacer}
                label="Senha"
                labelStyle={styles.label}
            />
            <Button
                color="#000"
                title="Atualizar"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}

export default Profile;