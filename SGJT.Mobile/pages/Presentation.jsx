import React from "react";
import { ImageBackground, StyleSheet, Button, View } from "react-native";

const Presentation = ({ navigation }) => {
    return (
        <ImageBackground source={require("../assets/image-presentation.png")} style={styles.image}>
            <View style={styles.container}>
                <View style={styles.separator}>
                    <Button
                        color="#000"
                        title="Entrar"
                        onPress={() => navigation.navigate('Login')}
                    />
                </View>
                <View style={styles.separator}>
                    <Button
                        color="#000"
                        title="Registrar"
                        onPress={() => navigation.navigate('Register')}
                    />
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({

    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    container: {
        marginHorizontal: 16,
        height: "100%",
        // float: "bottom",
        justifyContent: "flex-end"
    },
    separator: {
        marginBottom: 18
    }
});



export default Presentation;