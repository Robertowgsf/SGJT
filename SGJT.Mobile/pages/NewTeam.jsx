import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { Input } from 'react-native-elements';
import styles from '../assets/styles';
import global from '../global';

const NewTeam = ({ navigation }) => {
    const [team, setTeam] = useState({
        name: "",
        users: []
    });

    async function saveTeam() {
        let response = await fetch(
            'https://localhost:44331/api/Team', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${global.jwt}`
            },
            body: JSON.stringify(team)
        });

        await response.json();
        navigation.navigate('Times')
    }

    return (
        <View style={styles.container}>
            <Input
                containerStyle={styles.bottomSpacer}
                label="Nome"
                labelStyle={styles.label}
                onChangeText={text => setTeam(Object.assign({}, team, { name: text }))}
                value={team.name}
            />
            <Button
                color="#000"
                title="Salvar"
                onPress={() => saveTeam()}
            />
        </View>
    );
}

export default NewTeam;