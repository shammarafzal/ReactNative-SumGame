import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import RandomNumber from "./RandomNumber";
import shuffle from "lodash.shuffle";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNumbers: [],
      time: 10,
      score: 0,
    };
  }

  componentDidMount() {
    this.intervalid = setInterval(() => {
      this.setState(
        (prevState) => {
          return { time: prevState.time - 1 };
        },
        () => {
          if (this.state.time === 0) {
            clearInterval(this.intervalid);
          }
        }
      );
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalid);
  }

  randomNumbers = Array.from({ length: this.props.randomNumbersCount }).map(
    () => 1 + Math.floor(10 * Math.random())
  );

  target = this.randomNumbers
    .slice(0, this.props.randomNumbersCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  shuffleRandomNumbers = shuffle(this.randomNumbers);

  selectNumber = (numberIndex) => {
    this.setState((prevState) => ({
      selectedNumbers: [...prevState.selectedNumbers, numberIndex],
    }));
    console.log(this.state.selectedNumbers);
  };

  gameStatus = () => {
    const sumSelected = this.state.selectedNumbers.reduce((acc, curr) => {
      return acc + this.shuffleRandomNumbers[curr];
    }, 0);
    if (this.state.time === 0) {
      return "LOST";
    }
    if (sumSelected < this.target) {
      return "PLAYING";
    }
    if (sumSelected === this.target) {
      clearInterval(this.intervalid);
      // this.props.updateScore()
      return "WON";
    }
    if (sumSelected > this.target) {
      clearInterval(this.intervalid);
      return "LOST";
    }
  };
  render() {
    gamestatus = "PLAYING";
    if (gamestatus !== "WON") {
      gamestatus = this.gameStatus();
    }

    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${gamestatus}`]]}>
          {this.target}
        </Text>
        <View style={styles.randomContainer}>
          {this.shuffleRandomNumbers.map((randomNumber, index) => (
            <RandomNumber
              id={index}
              key={index}
              status={gamestatus}
              number={randomNumber}
              onPress={this.selectNumber}
            />
          ))}
        </View>
        <View>
          <Text style={styles.score}>Score: {this.props.score}</Text>
          <Text style={styles.timer}>{this.state.time}</Text>
          <Text>{gamestatus}</Text>
        </View>

        {gamestatus !== "PLAYING" && (
          <View style={styles.mybtn}>
            <Button
              title="Play Again"
              color={"black"}
              onPress={() => this.props.resetGame(gamestatus)}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ddd",
    flex: 1,
    paddingTop: 30,
  },
  target: {
    fontSize: 45,
    backgroundColor: "#aaa",
    marginHorizontal: 50,
    textAlign: "center",
  },
  randomContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  STATUS_PLAYING: {
    backgroundColor: "#bbb",
  },
  STATUS_WON: {
    backgroundColor: "green",
  },
  STATUS_LOST: {
    backgroundColor: "red",
  },
  timer: {
    textAlign: "center",
    fontSize: 50,
    marginVertical: 80,
  },
  score: {
    textAlign: "center",
    fontSize: 20,
    marginVertical: 80,
  },
  mybtn: {
    width: 100,
    height: 50,
    // fontSize: 30,
    backgroundColor: "#999",
    // marginHorizontal: 15,
    marginVertical: 25,
    textAlign: "center",
    // flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignSelf: "center",
  },
});

export default Game;
