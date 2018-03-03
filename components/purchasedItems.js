import React from 'react'
import _ from 'lodash'
import { StyleSheet, Switch, Text, View } from 'react-native'

export default class PurchasedItems extends React.PureComponent {
  render () {
    let items = ''
    let controls = []

    _.forEach(this.props.items, (item) => {
      items += item.icon
    })

    if (!!this.props.items['allowance']) {
      controls.push(<View><Text>Allowance:</Text><Switch value={this.props.allowanceToggleValue} onValueChange={(value) => this.props.allowanceToggleCallback(value)} /></View>)
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {items}
        </Text>
        {controls}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 250,
    paddingTop: 30,
    // backgroundColor: 'yellow',
  },
  text: {
    fontSize: 50,
    textAlign: 'center',
  }
})
