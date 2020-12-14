import React, { useState, useCallback } from 'react';
import { View, Button, TextInput } from 'react-native';
import styles from '../assets/styles';
import Timer from '../components/Timer';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import global from '../global';

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [workingTimeRecord, setWorkingTimeRecord] = useState({
        project: 0,
        description: "",
        user: global.username
    });

    useFocusEffect(
        useCallback(() => {
            getProjects();
        }, [])
    );

    async function getProjects() {
        try {
            let response = await fetch(
                'https://localhost:44331/api/Project', {
                headers: {
                    "Authorization": `Bearer ${global.jwt}`
                }
            }
            );
            let json = await response.json();
            setProjects(json);
            let defaultProject = json.find(a => true);

            if (defaultProject != null)
                setWorkingTimeRecord(Object.assign({}, workingTimeRecord, { project: defaultProject.id }))
        } catch (error) {
            console.error(error);
        }
    }

    async function registerWorkingTimeRecord() {
        let response = await fetch(
            'https://localhost:44331/api/WorkingTimeRecord/registerWorkingTimeRecord', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${global.jwt}`
            },
            body: JSON.stringify(workingTimeRecord)
        });

        console.log(response);
    }

    return (
        <View style={styles.container}>
            <View style={styles.bottomSpacer}>
                <Timer></Timer>
            </View>
            <View style={styles.bottomSpacer}>
                <Picker
                    selectedValue={workingTimeRecord.project}
                    style={{ height: 40, borderRadius: 5 }}
                    onValueChange={(value, key) =>
                        setWorkingTimeRecord(Object.assign({}, workingTimeRecord, { project: value }))
                    }>
                    {
                        projects.map(project => {
                            return (
                                <Picker.Item key={project.id} label={project.name} value={project.id} />
                            )
                        })
                    }
                </Picker>
            </View>
            <View
                style={{
                    backgroundColor: "#fff",
                    borderColor: '#000000',
                    borderWidth: 1,
                    marginBottom: 16,
                    borderRadius: 5
                }}>
                <TextInput
                    style={{ padding: 5 }}
                    multiline
                    numberOfLines={5}
                    onChangeText={text => setWorkingTimeRecord(Object.assign({}, workingTimeRecord, { description: text }))}
                    value={workingTimeRecord.description}
                    editable
                    placeholder="Resuma o que você fez aqui..."
                />
            </View>
            <Button
                color="#000"
                title="Registrar Jornada"
                onPress={() => registerWorkingTimeRecord()}
            />
        </View>
    );
}

export default Home;