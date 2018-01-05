import React from 'react'
import { Button, ProgressViewIOS, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { cloneDeep, findLast, flatten, forEach, map, mapValues, sumBy } from 'lodash'

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
      totalTime: 500, // (in seconds)
      remainingTime: 500,
      eventMessages: EventMessages,
      // [
      //   {
      //     text: "You're not very happy. Try tapping that 0.",
      //     shouldDisplay: (state) => state.happiness === 0
      //   },
      //   {
      //     text: "You're becoming happier!",
      //     shouldDisplay: (state) => state.happiness > 0
      //   },
      //   {
      //     text: "Oh now you're getting really happy!",
      //     shouldDisplay: (state) => state.happiness >= 15
      //   },
      //   {
      //     text: "Look a pacifier! I bet that would make you really happy. You should buy it.",
      //     shouldDisplay: (state) => state.items[0][0].owned === 0 && state.happiness >= 30
      //   },
      //   {
      //     text: "The pacifier is making you happy!",
      //     shouldDisplay: (state) => state.items[0][0].owned === 1
      //   },
      // ],
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
        <Header style={{flex: 1}} onPressHappinessButton={this.onPressHappinessButton} happiness={Math.round(this.state.happiness)}></Header>
        <Text style={styles.eventMessage}>{this.state.eventMessage(this.state)}</Text>
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
  eventMessage: {
    color: 'red',
    fontSize: 18
  }
});
