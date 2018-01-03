export default class StoreItem {
  constructor (name, value, baseCost) {
    this.name = name
    this.value = value
    this.baseCost = baseCost
    this.owned = 0
  }

  cost () {
    return Math.floor(this.baseCost * Math.pow(1.15, this.owned))
  }
}
