import React from 'react'
import StoreItem from '../models/storeItem'
import { cloneDeep, findLast, flatten, forEach, map, mapValues, sumBy } from 'lodash'

export default items = {
  0: {
    'pacifier':   new StoreItem('Pacifier', '+1 Happiness/sec', 10),
    'blankie':    new StoreItem('Blankie', '+2 Happiness/sec at night', 100),
    'bottle':     new StoreItem('Bottle', 'Lowers cost to be a Big Kid', 200, (prevState) => {
      let newStateItems = map(prevState.items, cloneDeep)
      newStateItems[0]['bigKid'].baseCost = 300
      return { items: newStateItems }
    }),
    'bigKid':     new StoreItem('Be a Big Kid', 'Level up!', 3000, (prevState) => { return { level: 1 } })
  },
  1: {
    'toys':       new StoreItem('Toys', '+2 Happiness per click', 400),
    'friend':     new StoreItem('Make a Friend', 'Double Happiness per click', 400),
    'candy':      new StoreItem('Candy', '4x Happiness per click for 1 hour', 400),
    'school':     new StoreItem('Go to School', 'Level up!', 400, (prevState) => { return { level: 2 } })
  },
  2: {
    'videoGames': new StoreItem('Video Games', 'Each click gains XP as well', 400),
    'allowance':  new StoreItem('Allowance', 'If you would gain 1 Happiness, instead gain 4 Money (toggle)', 400),
    'bike':       new StoreItem('Bike', '+100 Happiness per second', 400),
    'teenager':   new StoreItem('Become a Teenager', 'Level up!', 400, (prevState) => { return { level: 3 } }),
  },
  3: {
    'firstJob':   new StoreItem('First Job', 'Clicking only gets you Money now', 400),
    'girlfriend': new StoreItem('Girlfriend', '+1000 Happiness per second', 400),
    'car':        new StoreItem('Car', 'For every 10 Money you spend, gain 1 Happiness per second', 400),
    'college':    new StoreItem('Go to College', 'Level up!', 400, (prevState) => { return { level: 4 } })
  },
  4: {
    'secondJob':  new StoreItem('Second Job', '2x Money per click', 400),
    'habit':      new StoreItem('Develop a Habit', 'If you would gain 1 Money, instead gain 4 Happiness', 400), // warning: paradox if this and allowance are active.
    'collegeFriend': new StoreItem('Make a new College Friend', 'Double Happiness per second', 400),
    'graduate':   new StoreItem('Graduate', 'Level up!', 400, (prevState) => { return { level: 5 } }),
  },
  5: {
    'career':     new StoreItem('Get a Career', '+10 Money per click. Lose all friends.', 400),
    'getMarried': new StoreItem('Get Married', 'Double Money per click and Money per second', 400),
    'house':      new StoreItem('Buy a House', 'If you would gain 1 Money, instead gain 4 Happiness', 400),
    'children':   new StoreItem('Have Children', 'Double Happiness per second', 400),
    'retire':     new StoreItem('Retire', 'Level up!', 400, (prevState) => { return { level: 6 } })
  }
}
