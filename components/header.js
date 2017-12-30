import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default class Header extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPressHappinessButton}><Text style={styles.header}>{this.props.happiness}</Text></TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 100,
  }
})
