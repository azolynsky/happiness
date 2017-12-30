import React from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { forEach, sumBy } from 'lodash'
import Header from './components/header'
import StoreItems from './data/storeItems'

export default class App extends React.Component {
  constructor() {
    super()
    this.buyButtonColor = this.buyButtonColor.bind(this)
    this.state = {
      happiness: 0,
      fps: 60,
      happinessPerSecond: function(){
        return sumBy(this.items, function(item) {
          return item.owned * item.value
        })
      },
      items: [...StoreItems]
    }
  }

  onPressHappinessButton = () => {
    this.setState((prevState, props) => ({
      happiness: prevState.happiness + this.state.happinessPerSecond()/10 + 1
    }))
  }

  buyButtonColor = (item) => {
    return item.cost <= this.state.happiness? 'black' : 'gray'
  }

  buyItem = (key) => {
    this.setState((prevState) => {
      let newState = this.state.items.slice()
      newState[key].owned++
      return {
        items: newState
      }
    })
  }

  tick = () => {
    this.setState((prevState, props) => ({
      happiness: prevState.happiness + (this.state.happinessPerSecond() / this.state.fps)
    }))
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000 / this.state.fps
    )
  }

  render() {
    let store = this.state.items.map((item, key) => {
      return (<Button key={key} color={this.buyButtonColor(item)} onPress={() => this.buyItem(key)} title={item.name}></Button>)
    }, this)

    return (
      <View style={styles.container}>
        <Text>Wow you're so happy!</Text>
        <Header onPressHappinessButton={this.onPressHappinessButton.bind(this)} happiness={Math.round(this.state.happiness)}></Header>
        {store}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: '#555'
  }
});
