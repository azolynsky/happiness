import React from 'react'
import _ from 'lodash'
import { StyleSheet, Switch, Text, View } from 'react-native'

export default class PurchasedItems extends React.PureComponent {
  render () {
    let items = ''

    _.forEach(this.props.items, (item) => {
      items += item.icon
    })

    return (
      <Text style={styles.owned}>
        {items}
        <Switch value={this.props.allowanceToggleValue} onValueChange={(value) => this.props.allowanceToggleCallback(value)} />
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  owned: {
    flex: 1,
    fontSize: 50,
    width: 200,
    fontFamily: 'Helvetica Neue',
    paddingTop: 30,
    // backgroundColor: 'yellow',
    textAlign: 'center'
  }
})
