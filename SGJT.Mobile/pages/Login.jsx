import React, { useState } from 'react';
import { View, Button, TouchableOpacity } from 'react-native';
import { Text, Input } from 'react-native-elements';
import styles from '../assets/styles';
import global from "../global";

const Login = ({ navigation }) => {
    const [user, setUser] = useState({
        name: "",
        password: "",
    });

    async function login() {
        let response = await fetch(
            'https://192.168.1.67:44331/api/Auth/login', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        let jsonResponse = await response.json();

        if (response.status == 200) {
            global.username = user.name;
            global.jwt = jsonResponse.token;
            navigation.navigate('Home')
        }
    }

    function handleNavigation() {
        console.log("handle navigation");
        navigation.navigate('Register');
    }

    return (
        <View style={styles.container}>
            <Text h1 style={styles.bottomSpacer}>Bem vindo</Text>
            <Input
                containerStyle={styles.bottomSpacer}
                label="Name"
                labelStyle={styles.label}
                onChangeText={text => setUser(Object.assign({}, user, { name: text }))}
                value={user.name}
            /><Input
                containerStyle={styles.bottomSpacer}
                label="Senha"
                labelStyle={styles.label}
                onChangeText={text => setUser(Object.assign({}, user, { password: text }))}
                value={user.password}
                secureTextEntry={true}
            />
            <Button
                color="#000"
                title="Entrar"
                onPress={() => login()}
            />

            <TouchableOpacity onPress={handleNavigation} style={{ alignItems: 'center', justifyContent: 'center', marginTop: 24 }} >
                <Text style={{ textDecorationLine: "underline" }}>Não tenho conta</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Login;