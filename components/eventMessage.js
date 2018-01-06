import React from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'

export default class EventMessage extends React.PureComponent {

  constructor(props) {
    super()
    this.state = {
      message: props.message,
      opacity: new Animated.Value(1)
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextState.message != this.state.message
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.message != this.props.message){
      Animated.timing(this.state.opacity,{
        toValue: 0,
        duration: 300,
      }).start(() => this.updateMessage(nextProps.message))
    }
  }

  updateMessage(message){
    this.setState({message: message})
  }

  componentDidUpdate() {
    Animated.timing(this.state.opacity,{
      toValue: 1,
      duration: 300,
    }).start()
  }

  render() {
    const opacity = this.state.opacity

    return (
      <View>
        <Animated.Text style={[styles.eventMessage, {opacity}]}>{this.state.message}</Animated.Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  eventMessage: {
    color: '#aa0000',
    fontSize: 18
  }
});
