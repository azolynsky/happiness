import React from 'react'
import StoreItem from '../models/storeItem'
import { cloneDeep, findLast, flatten, forEach, map, mapValues, sumBy } from 'lodash'

export default items = [
  {
    'pacifier':   new StoreItem('Pacifier', '+1 Happiness/sec', 10, 0, '👶'),
    'blankie':    new StoreItem('Blankie', '+2 Happiness/sec at night', 100, 0, '🌜'),
    'bottle':     new StoreItem('Bottle', 'Lowers cost to be a Big Kid', 200, 0, '🍼', (prevState) => {
      let newStateItems = map(prevState.items, cloneDeep)
      newStateItems[0]['bigKid'].baseCost = 50
      return { items: newStateItems }
    }),
    'bigKid':     new StoreItem('Be a Big Kid', 'Level up!', 3000, 0, '🧒', (prevState) => { return { level: 1 } }),
  },
  {
    'toys':       new StoreItem('Toys', '+2 Happiness per click', 300, 0, '🚂'),
    'friend':     new StoreItem('Make a Friend', 'Double Happiness per click', 1500, 0, '👫'),
    'school':     new StoreItem('Go to School', 'Level up!', 3000, 0, '🏫', (prevState) => { return { level: 2 } }),
  },
  {
    'allowance':  new StoreItem('Allowance', 'Generate money instead of happiness (toggle)', 3000, 0, '💵'),
    // 'candy':      new StoreItem('Candy', '4x Happiness per click for 1 hour', 400, '🍭'),
    'bike':       new StoreItem('Bike', '+10 Happiness per second', 0, 1000, '🚲'),
    'teenager':   new StoreItem('Become a Teenager', 'Level up!', 400, 0, '👱‍', (prevState) => { return { level: 3 } }),
  },
  {
    'firstJob':   new StoreItem('First Job', 'Clicking only gets you Money now', 400),
    'girlfriend': new StoreItem('Girlfriend', '+100 Happiness per second', 400),
    'car':        new StoreItem('Car', 'For every 10 Money you spend, gain 1 Happiness per second', 400),
    'college':    new StoreItem('Go to College', 'Level up!', 400, (prevState) => { return { level: 4 } }),
  },
  {
    'secondJob':  new StoreItem('Second Job', '2x Money per click', 400),
    'habit':      new StoreItem('Develop a Habit', 'If you would gain 1 Money, instead gain 4 Happiness', 400), // warning: paradox if this and allowance are active.
    'collegeFriend': new StoreItem('Make a new College Friend', 'Double Happiness per second', 400),
    'graduate':   new StoreItem('Graduate', 'Level up!', 400, (prevState) => { return { level: 5 } }),
  },
  {
    'career':     new StoreItem('Get a Career', '+10 Money per click. Lose all friends.', 400),
    'married':    new StoreItem('Get Married', 'Double Money per click and Money per second', 400),
    'house':      new StoreItem('Buy a House', 'If you would gain 1 Money, instead gain 4 Happiness', 400),
    'children':   new StoreItem('Have Children', 'Double Happiness per second', 400),
    'retire':     new StoreItem('Retire', 'Level up!', 400, (prevState) => { return { level: 6 } }),
  }
]
