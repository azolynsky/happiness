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
      happiness: 1000,
      lifetimeHappiness: 0,
      fps: 60,
      totalTime: 300, // (in seconds)
      remainingTime: 300,
      level: 0,
      elapsedTime: 0,
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
      items: {...StoreItems}
    }
  }

  onPressHappinessButton = () => {
    let baseHappinessPerClick = 0, baseMoneyPerClick = 0, moneyPerClickMultiplier = 1, happinessPerClickMultiplier = 1

    //TODO: make this be affected by the items you own!

    this.setState((prevState, props) => ({
      happiness: prevState.happiness + 1
    }))
  }

  buyItem = (key) => {
    let  item = this.state.items[this.state.level][key]
    let cost = item.cost()
    if (cost > this.state.happiness) return

    this.setState((prevState) => {
      return item.singletonFunction(prevState)
    })

    this.setState((prevState) => {
      let newStateItems = map(prevState.items, cloneDeep)
      newStateItems[this.state.level][key].owned++
      return {
        items: newStateItems,
        happiness: prevState.happiness - cost
      }
    })
  }

  updateNumbers = () => {
    let baseHappinessPerSecond = 0, baseMoneyPerSecond = 0,
    happinessPerSecondMultiplier = 1, moneyPerSecondMultiplier = 1

    // --ADDERS--
    //level 0
    let items = this.state.items[0]

    let item = items.pacifier
    baseHappinessPerSecond += 1 * item.owned

    item = items.blankie
    if (true){ //if it's night time somehow?
      baseHappinessPerSecond += 2 * item.owned
    }

    //level 1
    items = this.state.items[1]


    // --MULTIPLIERS--


    // --REPLACEMENT EFFECTS--


    // --COMMIT WORK--
    this.setState((prevState, props) => ({
      happiness: prevState.happiness + (baseHappinessPerSecond * happinessPerSecondMultiplier) / this.state.fps
    }))
  }

  tick = () => {
    this.updateNumbers()

    this.setState((prevState, props) => ({
      elapsedTime: prevState.elapsedTime + 1 / this.state.fps
      //remainingTime: prevState.remainingTime - (1 / this.state.fps)
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
        {/* <View>
          <Text style={{fontFamily: 'Helvetica Neue'}}>{Math.round(this.state.remainingTime)} seconds remaining until you die.</Text>
          <ProgressViewIOS progressTintColor='#aa0000' progress={this.state.timeProgressedPercentage()}></ProgressViewIOS>
        </View> */}
        <Header style={{flex: 1}} onPressHappinessButton={this.onPressHappinessButton} happiness={Math.round(this.state.happiness)}></Header>
        <EventMessage message={this.state.eventMessage(this.state)}></EventMessage>
        <Store items={this.state.items[this.state.level]} happiness={this.state.happiness} buyItem={this.buyItem}></Store>
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
