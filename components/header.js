import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { filter, map } from 'lodash'
import EventMessage from './eventMessage'

export default class Header extends React.PureComponent {
  constructor(props) {
    super()
    this.state = {
      emojiAnimations: []
    }
  }

  onPressHappinessButton = () => {
    this.setState((prevState, props) => {
      let newEmojiArray = filter(prevState.emojiAnimations, (m) => {
        return Date.now() - m.added < this.props.animationExpiration
      })
      let left = Math.floor((Math.random() * 95) + 1)
      let top = Math.floor((Math.random() * 75) + 1)
      newEmojiArray.push({image: '🙂', left: left, top: top, added: Date.now()})
      return {
        emojiAnimations: newEmojiArray
      }
    })
    this.props.onPressHappinessButton()
  }

  render () {
    // only show moneyHeader if it's greater than 0
    let moneyHeader = this.props.money > 0 ? (
      <Text style={styles.textWrapper}>
        <Text style={styles.label}>{this.props.money}💵</Text>
      </Text>
    ) : null

    let emojiAnimations =  filter(this.state.emojiAnimations, (m) => {
      return Date.now() - m.added < this.props.animationExpiration
    })

    emojiAnimations = map(emojiAnimations, (m) => (
      <Text style={{ position: 'absolute', left: `${m.left}%`, backgroundColor: 'transparent' }}>{m.image}</Text>
    ))

    return (
      <TouchableOpacity onPress={this.onPressHappinessButton} style={{width: '100%'}}>
        <Text style={styles.textWrapper}>
          <Text style={styles.header}>{this.props.happiness}</Text>
          <Text style={styles.label}>🙂</Text>
        </Text>
        {moneyHeader}
        <View style={{width:'100%', height: 10}}>
          {emojiAnimations}
        </View>
        <EventMessage message={this.props.eventMessage} />
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
