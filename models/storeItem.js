export default class StoreItem {
  constructor (name, value, baseCost, shouldDisplay) {
    this.name = name
    this.value = value
    this.baseCost = baseCost
    this.owned = 0
    this._shouldDisplay = shouldDisplay
  }

  shouldDisplay (currentHappiness) {
    return this._shouldDisplay(currentHappiness)
  }

  cost () {
    return Math.floor(this.baseCost * Math.pow(1.15, this.owned))
  }
}
