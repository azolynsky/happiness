import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default class Header extends React.Component {
  render() {
    return (
      <View style={{alignItems:'center', justifyContent:'center'}}>
        <Text>Wow you're so happy!</Text>
        <TouchableOpacity onPress={this.props.onPressHappinessButton}><Text style={styles.header}>{this.props.happiness}</Text></TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 100,
    fontFamily: 'Helvetica Neue'
  }
})
