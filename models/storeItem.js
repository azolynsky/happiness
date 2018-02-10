
export default class StoreItem {
  constructor (name, description, baseCost, singletonFunction = () => { return }) {
    this.owned = 0
    this.name = name
    this.description = description
    this.baseCost = baseCost
    this.singletonFunction = singletonFunction
  }

  cost () {
    return Math.floor(this.baseCost * Math.pow(1.15, this.owned))
  }
}
