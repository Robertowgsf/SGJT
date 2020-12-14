import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import styles from '../assets/styles';
import { DataTable } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import global from '../global';

const Apointment = () => {
    const [apointments, setApointments] = useState([]);

    async function getApointments() {
        try {
            let response = await fetch(
                'https://192.168.1.67:44331/api/WorkingTimeRecord', {
                headers: {
                    "Authorization": `Bearer ${global.jwt}`
                }
            }
            );
            let json = await response.json();
            setApointments(json);
        } catch (error) {
            console.error(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getApointments()
        }, [])
    );

    return (
        <View style={styles.container}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title><Text style={apointmentStyles.header}>Data</Text></DataTable.Title>
                    <DataTable.Title><Text style={apointmentStyles.header}>Projeto</Text></DataTable.Title>
                </DataTable.Header>
                {
                    apointments.map(apointment => {
                        return (
                            <DataTable.Row
                                key={apointment.id}
                            >
                                <DataTable.Cell>
                                    <Text style={{ color: apointment.type == "Entrada" ? "#27AE60" : "red" }}>{apointment.recordDate}</Text>
                                </DataTable.Cell>
                                <DataTable.Cell>
                                    {apointment.project}
                                </DataTable.Cell>
                            </DataTable.Row>
                        )
                    })
                }
            </DataTable>
        </View>
    );
}

const apointmentStyles = StyleSheet.create({
    header: {
        fontWeight: "bold",
        fontSize: 14,
    }
});

export default Apointment;