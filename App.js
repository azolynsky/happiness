import React from 'react'
import { Animated, Button, ProgressViewIOS, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { cloneDeep, findLast, flatten, forEach, map, mapValues, sumBy } from 'lodash'

import EventMessage from './components/eventMessage'
import Header from './components/header'
import Store from './components/store'

import StoreItems from './data/storeItems'
import EventMessages from './data/eventMessages'

export default class App extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      happiness: 0,
      lifetimeHappiness: 0,
      fps: 60,
      totalTime: 3, // (in seconds)
      remainingTime: 3,
      eventMessages: EventMessages,
      eventMessage: function(state){
        let message = (findLast(this.eventMessages, function(em){ return em.shouldDisplay(state) }).text)
        return message
      },
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
    if (this.state.remainingTime <= 0){
      clearInterval(this.timer)
      alert('you died. fuck you.')
    }
  }

  componentDidMount() {
    this.timer = setInterval(
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
        <Header style={{flex: 1}} onPressHappinessButton={this.onPressHappinessButton} happiness={Math.round(this.state.happiness)}></Header>
        <EventMessage message={this.state.eventMessage(this.state)}></EventMessage>
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
