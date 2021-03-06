import {certainty} from './Enums.js'
import {MyIcon} from './MyIcon.js'

import React from 'react'
import Checkbox from 'antd/lib/checkbox'

import _ from 'lodash'

function mkAntdRows(data, classifier) {
  return _.map(data, (row, index) => {
    let v = _.toPlainObject(row)
    v.index = index
    v.hedge = classifier(row)
    return v
  })
}

function mkTableCell(cellInfo, sealStrength, condition) {
  let extra = <div/>
  if (condition(cellInfo)) {
    if (sealStrength === certainty.CERTAIN) {
      extra = <div style={{display: 'inline-block'}}>
                <MyIcon imageDir="seals" name="gold"/>
              </div>
    } else if (sealStrength === certainty.HEDGE) {
      extra = <div style={{display: 'inline-block'}}>
                <MyIcon imageDir="seals" name="gray"/>
              </div>
    }
  }

  return <div>{toPercentageString(cellInfo)}{extra}</div>
}

function toPercentageString(v) {
  let percentage = Math.round(v * 100, 0)
  if (percentage === 0 && v !== 0) {
    percentage = "<1"
  } else if (percentage === 100 && v !== 1) {
    percentage = ">99"
  }
  return ""+percentage
}

function CheckboxSelector({itemList, values, imageDir, callback}) {
  return <div style={{display: "inline-block", padding: 10}}>
    {itemList.map((name, index) =>
      <IconCheckbox
        checked={values[index]}
        imageDir={imageDir}
        name={name}
        key={name}
        callback={() => callback(index)}
      />
    )}
  </div>
}

function IconCheckbox({callback, checked, imageDir, name}) {
  return <Checkbox onChange={callback} checked={checked}>
    {<MyIcon imageDir={imageDir} name={name}/>}
  </Checkbox>
}

// A special case of useState where the state is an array of Bools which start as 
// false and the only callback for interacting with it is to negate elements by index.
function useFlipBitsArrayState(arraySize) {
  const [state, setState] = React.useState(Array(arraySize).fill(false))
  const flipStateBit = (idx) => {
    setState(flipBit(state, idx))
  }
  return [state, flipStateBit]
}
function flipBit(oldBitSet, index) {
  let newBitSet = _.slice(oldBitSet)
  newBitSet[index] = !oldBitSet[index]
  return newBitSet
}

export {toPercentageString, mkAntdRows, mkTableCell, CheckboxSelector, useFlipBitsArrayState}
