import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { Input } from 'react-native-elements';
import styles from '../assets/styles';
import global from '../global';

const NewProject = ({ navigation }) => {
    const [project, setProject] = useState(
        {
            name: "",
            description: "",
            estimatedHours: 0,
            workedHours: 0,
            status: "",
            startDate: "",
            deadline: "",
            teams: []
        }
    );

    async function saveProject() {
        let response = await fetch(
            'https://localhost:44331/api/Project', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${global.jwt}`
            },
            body: JSON.stringify(project)
        });

        await response.json();
        navigation.navigate('Projetos')
    }

    return (
        <View style={styles.container}>
            <Input
                containerStyle={styles.bottomSpacer}
                label="Nome"
                labelStyle={styles.label}
                onChangeText={text => setProject(Object.assign({}, project, { name: text }))}
                value={project.name}
            /><Input
                containerStyle={styles.bottomSpacer}
                label="Previsão de Finalização"
                labelStyle={styles.label}
                onChangeText={text => setProject(Object.assign({}, project, { deadline: text }))}
                value={project.deadline}
            /><Input
                containerStyle={styles.bottomSpacer}
                label="Descrição"
                labelStyle={styles.label}
                onChangeText={text => setProject(Object.assign({}, project, { description: text }))}
                value={project.description}
            /><Input
                containerStyle={styles.bottomSpacer}
                label="Data de Início"
                labelStyle={styles.label}
                onChangeText={text => setProject(Object.assign({}, project, { startDate: text }))}
                value={project.startDate}
            />
            <Button
                color="#000"
                title="Salvar"
                onPress={() => saveProject()}
            />
        </View>
    );
}

export default NewProject;