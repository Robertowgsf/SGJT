import React, { useState } from 'react';
import { View, Button, TouchableOpacity } from 'react-native';
import { Text, Input } from 'react-native-elements';
import styles from '../assets/styles';

const Register = ({ navigation }) => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "Gestor"
    });

    async function registerUser() {
        let response = await fetch(
            'https://192.168.1.67:44331/api/Auth/register', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (response.status == 200 || response.status == 204) {
            navigation.navigate('Login')
        }
    }

    return (
        <View style={styles.container}>
            <Text h1 style={styles.bottomSpacer}>Cadastre sua conta</Text>
            <Input
                containerStyle={styles.bottomSpacer}
                label="Nome"
                labelStyle={styles.label}
                onChangeText={text => setUser(Object.assign({}, user, { name: text }))}
                value={user.name}
            /><Input
                containerStyle={styles.bottomSpacer}
                label="Email"
                labelStyle={styles.label}
                onChangeText={text => setUser(Object.assign({}, user, { email: text }))}
                value={user.email}
            />
            <Input
                containerStyle={styles.bottomSpacer}
                label="Senha"
                labelStyle={styles.label}
                onChangeText={text => setUser(Object.assign({}, user, { password: text }))}
                value={user.password}
                secureTextEntry={true}
            /><Input
                containerStyle={styles.bottomSpacer}
                label="Confirme sua senha"
                labelStyle={styles.label}
                onChangeText={text => setUser(Object.assign({}, user, { confirmPassword: text }))}
                value={user.confirmPassword}
                secureTextEntry={true}
            />
            <Button
                color="#000"
                title="Cadastrar"
                onPress={() => registerUser()}
            />
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 24 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} >
                    <Text style={{ textDecorationLine: "underline" }}>Já tenho uma conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Register;