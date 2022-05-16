import { proxy, snapshot, subscribe as valtioSubscribe } from 'valtio'
import { Beverage } from './types'

export interface TapStore {
  taps: Beverage[]
  filteredTaps: Beverage[]
  cart: Beverage[]
  searchText: string
  alcoholLimit: number
}

const store = proxy<TapStore>({
  taps: [],
  searchText: '',
  alcoholLimit: 10,
  filteredTaps: [],
  cart: [],
})

const filter = () => {
  const searchRE = new RegExp(store.searchText, 'i')

  return store.taps
    .filter(({ beverageName, abv }) => beverageName.match(searchRE) && abv < store.alcoholLimit)
    .slice(0, 15)
}

export const load = (client: string): void => {
  fetch(`http://localhost:8080/${client}.json`)
    .then(resp => resp.json())
    .then((taps: Beverage[]) => {
      store.taps = taps
      store.filteredTaps = filter()
    })
}

export const setSearchText = (text: string) => {
  store.searchText = text
  store.filteredTaps = filter()
}

export const setAlcoholLimit = (limit: number) => {
  store.alcoholLimit = limit
  store.filteredTaps = filter()
}

export const addToCart = (beverage: Beverage) => {
  store.cart.push(beverage)
}

export const subscribe = (
  callback: (state: TapStore) => void
): (() => void) => {
  callback(snapshot(store) as TapStore)
  return valtioSubscribe(store, () => callback(snapshot(store) as TapStore))
}

export default store
