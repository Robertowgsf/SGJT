import React, { useState, useCallback } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import styles from '../assets/styles';
import { DataTable } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import global from '../global';

const Project = ({ navigation }) => {
    const [projects, setProjects] = useState([]);

    async function getProjects() {
        try {
            let response = await fetch(
                'https://192.168.1.67:44331/api/Project', {
                headers: {
                    "Authorization": `Bearer ${global.jwt}`
                }
            });
            let json = await response.json();
            setProjects(json);
        } catch (error) {
            console.error(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getProjects()
        }, [])
    );

    return (
        <View style={styles.container}>
            <DataTable style={styles.bottomSpacer}>
                <DataTable.Header>
                    <DataTable.Title><Text style={projectStyles.header}>Nome</Text></DataTable.Title>
                    <DataTable.Title><Text style={projectStyles.header}>Previsão de Finalização</Text></DataTable.Title>
                </DataTable.Header>
                {
                    projects.map(project => {
                        return (
                            <DataTable.Row
                                key={project.id}
                            >
                                <DataTable.Cell>
                                    {project.name}
                                </DataTable.Cell>
                                <DataTable.Cell>
                                    {project.deadline}
                                </DataTable.Cell>
                            </DataTable.Row>
                        )
                    })
                }
            </DataTable>
            <View style={styles.bottomSpacer}>
                <Button
                    color="#000"
                    title="Novo Projeto"
                    onPress={() => navigation.navigate("Novo Projeto")}
                />
            </View>
        </View>
    );
}

const projectStyles = StyleSheet.create({
    header: {
        fontWeight: "bold",
        fontSize: 14,
    }
});

export default Project;