import * as React from 'react'

function useLocalStorageState(
  key,
  defaultValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage)
    }
    return defaultValue
  })
  React.useEffect(() => {
    window.localStorage.setItem(key, serialize(state))
  }, [key, serialize, state])
  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)
  function handleChange(event) {
    setName(event.target.value)
    console.log(window.localStorage.getItem('name'))
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Greg" />
}

export default App
