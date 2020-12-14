import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

class Timer extends Component {
    state = {
        currentTime: this.getDate()
    };

    updateCurrentTime() {
        setInterval(() => {
            this.setState({
                currentTime: this.getDate()
            })
        }, 1000);
    };

    getDate() {
        var d = new Date(),
            minutes = d.getMinutes().toString().length == 1 ? '0' + d.getMinutes() : d.getMinutes(),
            hours = d.getHours().toString().length == 1 ? '0' + d.getHours() : d.getHours(),
            seconds = d.getSeconds().toString().length == 1 ? '0' + d.getSeconds() : d.getSeconds(),
            days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        return days[d.getDay()] + ' ' + hours + ':' + minutes + ':' + seconds;
    }

    render() {
        this.updateCurrentTime();

        return (
            <Text h1 style={timerStyles.currentTime}>{this.state.currentTime}</Text>
        );
    }
}

const timerStyles = StyleSheet.create({
    currentTime: {
        textAlign: "center"
    }
});

export default Timer