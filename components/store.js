import React from 'react'
import { Button, ScrollView } from 'react-native'

export default class Store extends React.Component {
  shouldComponentUpdate(nextProps) {
    for (let i = 0; i < nextProps.items.length; i++){
      let oldCanAfford = this.props.items[i].cost() <= this.props.happiness
      let newCanAfford = nextProps.items[i].cost() <= nextProps.happiness

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
    let store = this.props.items.map((item, key) => {
      return (<Button key={key} color={this.buyButtonColor(item)} onPress={() => this.buyPressed(key)} title={`${item.name}`}></Button>)
    }, this)

    return (
      <ScrollView style={{flex: 1, marginBottom: 30, width:'100%'}}>
        {store}
      </ScrollView>
    )
  }
}
