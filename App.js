import React from 'react'
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { forEach, sumBy } from 'lodash'

import Header from './components/header'
import Store from './components/store'

import StoreItems from './data/storeItems'

export default class App extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      happiness: 10,
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

  buyItem = (key) => {
    let cost = this.state.items[key].cost()
    if (cost > this.state.happiness) return

    this.setState((prevState) => {
      let newState = this.state.items.slice()
      newState[key].owned++
      return {
        items: newState,
        happiness: prevState.happiness - cost
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
    return (
      <View style={styles.container}>
        <View style={{flex: 1, justifyContent:'center'}}>
        </View>
        <Header style={{flex: 1}} onPressHappinessButton={this.onPressHappinessButton} happiness={Math.round(this.state.happiness)}></Header>
        <Store items={this.state.items} happiness={this.state.happiness} buyItem={this.buyItem}></Store>
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
});
