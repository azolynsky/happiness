import React from 'react'
import _ from 'lodash'
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native'

export default class PurchasedItems extends React.PureComponent {
  render () {
    let items = []
    let controls = []

    _.forEach(this.props.items, (item) => {
      items.push(<Text>{item.icon}: {item.description}</Text>)
    })

    if (!!this.props.items['allowance']) {
      controls.push(<View><Text>Allowance:</Text><Switch value={this.props.allowanceToggleValue} onValueChange={(value) => this.props.allowanceToggleCallback(value)} /></View>)
    }

    return (
      <ScrollView style={styles.container}>
        {items}
        {controls}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    marginTop: 30,
    alignItems: 'flex-end'
    // backgroundColor: 'yellow',
  },
  text: {
    fontSize: 50,
    textAlign: 'center',
  }
})
