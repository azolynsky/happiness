import React from 'react'
import { Animated, Button, ProgressViewIOS, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { cloneDeep, findLast, flatten, forEach, map, mapValues, pickBy, sumBy } from 'lodash'

import EventMessage from './components/eventMessage'
import Header from './components/header'
import Store from './components/store'

import StoreItems from './data/storeItems'
import EventMessages from './data/eventMessages'

export default class App extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      happiness: 360,
      money: 0,
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

  onPressHappinessButton = () => {
    let happinessPerClick = 1, moneyPerClick = 1
    let items = this.state.items

    // --ADDERS--
    //level 1
    //toys +2
    happinessPerClick += 2 * items[1].toys.owned

    // --MULTIPLIERS--
    //level 1
    //friend x2
    for (let i = 0; i < items[1].friend.owned; i++){
      happinessPerClick = happinessPerClick * 2
    }

    //level 4
    //secondJob x2
    for (let i = 0; i < items[4].secondJob.owned; i++){
      happinessPerClick = happinessPerClick * 2
    }

    //level 5
    //career x4
    for (let i = 0; i < items[5].career.owned; i++){
      happinessPerClick = happinessPerClick * 4
    }

    // --REPLACEMENT EFFECTS--

    // --COMMIT WORK--
    this.setState((prevState, props) => ({
      happiness: prevState.happiness + happinessPerClick
    }))
  }

  updateNumbers = () => {
    let happinessPerSecond = 0, moneyPerSecond = 0
    let items = this.state.items

    // --ADDERS--
    //level 0
    //pacifier +1
    happinessPerSecond += 1 * items[0].pacifier.owned

    //blankie +2 @night
    if (true){ //if it's night time somehow?
      happinessPerSecond += 2 * items[0].blankie.owned
    }

    //level 2
    //bike +100
    happinessPerSecond += 100 * items[2].bike.owned

    //level 3
    //girlfriend +1000
    happinessPerSecond += 1000 * items[3].girlfriend.owned


    // --MULTIPLIERS--
    //married x2, x2
    for (let i = 0; i < items[5].married.owned; i++){
      happinessPerSecond = happinessPerSecond * 2
      moneyPerSecond = moneyPerSecond * 2
    }

    //collegeFriend x2
    for (let i = 0; i < items[4].collegeFriend.owned; i++){
      happinessPerSecond = happinessPerSecond * 2
    }

    // --REPLACEMENT EFFECTS--


    // --COMMIT WORK--
    this.setState((prevState, props) => ({
      happiness: prevState.happiness + (happinessPerSecond / this.state.fps)
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
        <Store items={pickBy(this.state.items[this.state.level], (i) => {return i.owned === 0} )} happiness={this.state.happiness} buyItem={this.buyItem}></Store>
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
