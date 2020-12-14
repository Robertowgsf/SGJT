import React, { useState, useCallback } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import styles from '../assets/styles';
import { DataTable } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import global from '../global';

const Team = ({ navigation }) => {
    const [teams, setTeams] = useState([]);

    async function getTeams() {
        try {
            let response = await fetch(
                'https://192.168.1.67:44331/api/Team', {
                headers: {
                    "Authorization": `Bearer ${global.jwt}`
                }
            });
            let json = await response.json();
            setTeams(json);
        } catch (error) {
            console.error(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getTeams()
        }, [])
    );

    return (
        <View style={styles.container}>
            <DataTable style={styles.bottomSpacer}>
                <DataTable.Header>
                    <DataTable.Title><Text style={teamStyles.header}>Nome</Text></DataTable.Title>
                </DataTable.Header>
                {
                    teams.map(team => {
                        return (
                            <DataTable.Row
                                key={team.id}
                            >
                                <DataTable.Cell>
                                    {team.name}
                                </DataTable.Cell>
                            </DataTable.Row>
                        )
                    })
                }
            </DataTable>
            <View style={styles.bottomSpacer}>
                <Button
                    color="#000"
                    title="Novo Time"
                    onPress={() => navigation.navigate("Novo Time")}
                />
            </View>
        </View>
    );
}

const teamStyles = StyleSheet.create({
    header: {
        fontWeight: "bold",
        fontSize: 14,
    }
});

export default Team;