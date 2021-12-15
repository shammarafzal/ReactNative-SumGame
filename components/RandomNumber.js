import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class RandomNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
    };
  }
  handlePress = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
    this.props.onPress(this.props.id);
  };
  render() {
    const status =
      this.props.status === "WON" || this.props.status === "LOST"
        ? true
        : false;
    return (
      <TouchableOpacity
        disabled={this.state.disabled || status}
        onPress={this.handlePress}
      >
        <Text
          style={[
            styles.random,
            this.state.disabled && styles.selected,
            status && styles.selected,
          ]}
        >
          {this.props.number}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  random: {
    width: 100,
    fontSize: 30,
    backgroundColor: "#999",
    marginHorizontal: 15,
    marginVertical: 25,
    textAlign: "center",
  },
  selected: {
    opacity: 0.3,
  },
});

export default RandomNumber;
