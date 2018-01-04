import React from 'react'
import { Button, ProgressViewIOS, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { cloneDeep, flatten, forEach, map, mapValues, sumBy } from 'lodash'

import Header from './components/header'
import Store from './components/store'

import StoreItems from './data/storeItems'

export default class App extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      happiness: 10,
      lifetimeHappiness: 10,
      fps: 60,
      totalTime: 500, // (in seconds)
      remainingTime: 500,
      timeProgressedPercentage: function(){
        return (this.totalTime-this.remainingTime)/this.totalTime
      },
      happinessPerSecond: function(){
        return sumBy(flatten(this.items), function(item) {
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
    let cost = this.state.items[0][key].cost()
    if (cost > this.state.happiness) return

    this.setState((prevState) => {
      let newState = map(prevState.items, cloneDeep)
      newState[0][key].owned++
      return {
        items: newState,
        happiness: prevState.happiness - cost
      }
    })
  }

  tick = () => {
    this.setState((prevState, props) => ({
      happiness: prevState.happiness + (this.state.happinessPerSecond() / this.state.fps),
      remainingTime: prevState.remainingTime - (1 / this.state.fps)
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
        <View>
          <Text style={{fontFamily: 'Helvetica Neue'}}>{Math.round(this.state.remainingTime)} seconds remaining until you die.</Text>
          <ProgressViewIOS progressTintColor='#aa0000' progress={this.state.timeProgressedPercentage()}></ProgressViewIOS>
        </View>
        <Text>Wow you're so happy!</Text>
        <Header style={{flex: 1}} onPressHappinessButton={this.onPressHappinessButton} happiness={Math.round(this.state.happiness)}></Header>
        <Store items={this.state.items[0]} happiness={this.state.happiness} buyItem={this.buyItem}></Store>
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
