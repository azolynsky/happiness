
export default class StoreItem {
  constructor (name, description, baseCost, moneyCost, emoji = '', singletonFunction = () => { return }) {
    this.owned = 0
    this.name = name
    this.description = description
    this.happinessCost = baseCost
    this.moneyCost = moneyCost
    this.icon = emoji
    this.singletonFunction = singletonFunction
  }

  // cost () {
  //   return Math.floor(this.baseCost * Math.pow(1.15, this.owned))
  // }
}
