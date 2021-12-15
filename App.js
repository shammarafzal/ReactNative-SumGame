import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Game from "./components/Game";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: 1,
      randomNumbersCount: 5,
      score: 0,
    };
  }

  resetGame = (status) => {
    console.log("Here");
    console.log(status);
    this.setState((prevState) => {
      return {
        gameId: prevState.gameId + 1,
      };
    });
    if (status !== "LOST") {
      this.setState((prevState) => {
        return {
          randomNumbersCount: prevState.randomNumbersCount + 1,
          score: prevState.score + 1,
        };
      });
    }
  };

  updateStore = () => {
    console.log("updated");
    this.setState((prevState) => {
      score = prevState + 1;
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Game
          key={this.state.gameId}
          resetGame={this.resetGame}
          randomNumbersCount={this.state.randomNumbersCount}
          updateScore={this.updateStore}
          score={this.state.score}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ddd",
    flex: 1,
  },
  score: {
    textAlign: "center",
    fontSize: 20,
    marginVertical: 80,
  },
});
