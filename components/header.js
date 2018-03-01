import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default class Header extends React.PureComponent {
  render() {
    return (
        <TouchableOpacity onPress={this.props.onPressHappinessButton} style={{width: '100%'}}><Text style={styles.header}>{this.props.happiness}</Text></TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 100,
    width: '100%',
    fontFamily: 'Helvetica Neue',
    // backgroundColor: 'yellow',
    textAlign: 'center'
  }
})
