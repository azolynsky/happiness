import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default class Header extends React.PureComponent {
  render () {
    return (
      <TouchableOpacity onPress={this.props.onPressHappinessButton} style={{width: '100%'}}>
        <Text style={styles.textWrapper}>
          <Text style={styles.header}>{this.props.happiness}</Text>
          <Text style={styles.label}>🙂</Text>
        </Text>
        <Text style={styles.textWrapper}>
          <Text style={styles.label}>$</Text>
          <Text style={styles.header}>{this.props.money}</Text>
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  textWrapper: {
    width: '100%',
    textAlign: 'center',
  },
  label: {
    fontSize: 50,
  },
  header: {
    fontSize: 80,
    fontFamily: 'Helvetica Neue',
    textAlign: 'center',
    //backgroundColor: 'yellow',
  }
})
