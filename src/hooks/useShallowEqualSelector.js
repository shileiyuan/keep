import R from 'ramda'
import { useSelector, shallowEqual } from 'react-redux'

export default function useShallowEqualSelector(model, keys) {
  return useSelector(state => R.pick(keys, state[model]), shallowEqual)
}
