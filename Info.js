import React from 'react';
import { StyleSheet, Text, View, Linking, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

class Info extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            gameId: this.props.navigation.state.params.id
        };
    }

    componentDidMount() {
        return fetch(`https://androidlessonsapi.herokuapp.com/api/game/details?game_id=${this.state.gameId}`, {
            method: "GET"
        })
            .then((response) => response.json())
            .then((responseJson) => {

                AsyncStorage.setItem('nameGame', responseJson.name);

                this.setState({
                    isLoading: false,
                    gameName: responseJson.name,
                    gameType: responseJson.type,
                    gameYear: responseJson.year,
                    gamePlayers: responseJson.players,
                    gameDescription: responseJson.description_en,
                    gameUrl: responseJson.url
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View style={[styles.container, {width: this.state.w, height: this.state.h}]}>
                <Button title="Retour à la liste" type="outline" onPress={() =>{
                    this.props.navigation.state.params.onNavigateBack(this.state.gameName),
                    this.props.navigation.goBack()
                }} />
                <Text h1 style={[styles.h1]}>{this.state.gameName}</Text>
                <View>
                    <Text style={[styles.text]}>Players : {this.state.gamePlayers}</Text>
                    <Text style={[styles.text]}>Type : {this.state.gameType}</Text>
                    <Text style={[styles.text]}>Year : {this.state.gameYear}</Text>
                    <Text style={[styles.text]}>Description : {this.state.gameDescription}</Text>
                    <View style={styles.container}>
                        <Button style={styles.button} title="Page wikipédia" type="outline" onPress={() => Linking.openURL(`${this.state.gameUrl}`)} />
                    </View>
                </View>
            </View>
        );
    }
}
export default Info;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#010930',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#eee',
        padding: 30
    },
    text: {
        color: '#eee'
    },
    button: {
        color: '#eee',
        padding: 20,
    },
    h1: {}
});
