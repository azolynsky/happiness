import React from 'react'
import { Button, ScrollView, Text, View } from 'react-native'

export default class Store extends React.Component {
  shouldComponentUpdate(nextProps) {
    for (let key in this.props.items){
      // if the store removed a product, return true
      if (!!nextProps.items[key] == false)
        return true

      let oldCanAfford = this.props.items[key].cost() <= this.props.happiness
      let newCanAfford = nextProps.items[key].cost() <= nextProps.happiness

      if (newCanAfford != oldCanAfford)
        return true
    }

    return false
  }

  buyButtonColor = (item) => {
    return item.cost() <= this.props.happiness? '#000' : '#ccc'
  }

  buyPressed = (key) => {
    this.props.buyItem(key)
  }

  render() {
    let store = []

    for (let key in this.props.items) {
      let item = this.props.items[key]
      //if (item.owned == 0){
        store.push(
          <View style={{alignItems:'center'}}>
            <Button key={key} color={this.buyButtonColor(item)} onPress={() => this.buyPressed(key)} title={`${item.name}`}></Button>
            <Text style={{color: this.buyButtonColor(item)}}>{item.description}</Text>
          </View>
        )
      //}
    }

    return (
      <ScrollView style={{flex: 1, marginBottom: 30, width:'100%'}}>
        {store}
      </ScrollView>
    )
  }
}
