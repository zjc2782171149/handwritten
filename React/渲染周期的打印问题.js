import { useCallback, useEffect, useRef } from 'react';

function Demo () {
  console.log('hello')

  const [value, setValue] = useState(100)
  function clickHandler () {
    setValue(value + 1)
    setValue(value + 1)
    console.log('value1 ', value)
    setValue((value) => value + 1)
    setValue((value) => value + 1)
    console.log('value2 ', value)
  }
  return (
    <div>
      <span>{value}</span>
      <button onClick={clickHandler}>increase</button>
    </div>
  )
}

Demo();