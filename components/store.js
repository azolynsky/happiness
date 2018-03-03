import React from 'react'
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default class Store extends React.Component {
  shouldComponentUpdate(nextProps) {
    for (let key in this.props.items){
      // if the store removed a product, return true
      if (!!nextProps.items[key] == false)
        return true

      let oldCanAfford = this.props.items[key].happinessCost <= this.props.happiness && this.props.items[key].moneyCost <= this.props.money
      let newCanAfford = nextProps.items[key].happinessCost <= nextProps.happiness && nextProps.items[key].moneyCost <= nextProps.money

      if (newCanAfford != oldCanAfford)
        return true
    }

    return false
  }

  buyButtonColor = (item) => {
    return item.happinessCost <= this.props.happiness && item.moneyCost <= this.props.money ? '#000' : '#ccc'
  }

  buyPressed = (key) => {
    this.props.buyItem(key)
  }

  render() {
    let store = []

    for (let key in this.props.items) {
      let item = this.props.items[key]
      let label = item.happinessCost > 0 ? `${item.happinessCost} 🙂` : ''
      label += item.moneyCost > 0 ? `${item.moneyCost} 💵` : ''

      store.push(
        <TouchableOpacity key={key} onPress={() => this.buyPressed(key)} style={{alignItems:'center'}}>
          <Text style={{fontSize: 20, fontWeight:'bold', color: this.buyButtonColor(item)}}>{label}: {item.name}</Text>
          <Text style={{color: this.buyButtonColor(item)}}>{item.description}</Text>
        </TouchableOpacity>
      )
    }

    return (
      <ScrollView style={styles.store}>
        {store}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  store: {
    flex: 1,
    marginBottom: 30,
    width: '100%',
    // backgroundColor: 'pink'
  }
})
