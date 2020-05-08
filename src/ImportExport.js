import {GolemTestFact, GolemAnimationFact, LibraryFact, OneIngredientFact,
  TwoIngredientFact, RivalPublicationFact} from './Facts.js'

import _ from 'lodash'
import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import Modal from 'antd/lib/modal'
import Button from 'antd/lib/button'

import querystring from 'querystring'

// TODO this system of using the class names as strings is really fragile
function typeString(fact) {
  if (fact instanceof TwoIngredientFact) {
    return "TwoIngredientFact"
  } else if (fact instanceof OneIngredientFact) {
    return "OneIngredientFact"
  } else if (fact instanceof RivalPublicationFact) {
    return "RivalPublicationFact"
  } else if (fact instanceof LibraryFact) {
    return "LibraryFact"
  } else if (fact instanceof GolemTestFact) {
    return "GolemTestFact"
  } else if (fact instanceof GolemAnimationFact) {
    return "GolemAnimationFact"
  }
}
const classDict = {
  "TwoIngredientFact": TwoIngredientFact,
  "OneIngredientFact": OneIngredientFact,
  "RivalPublicationFact": RivalPublicationFact,
  "LibraryFact": LibraryFact,
  "GolemTestFact": GolemTestFact,
  "GolemAnimationFact": GolemAnimationFact
}

function showExportDialog(expansion, factlist) {
  let location = window.location

  let payload = {expansion: expansion}
  _.forEach(factlist, (fact, idx) => {
    payload['fact'+idx] = JSON.stringify(fact)
    payload['type'+idx] = typeString(fact)
  })

  let url = location.origin + location.pathname + "?" + querystring.stringify(payload)

  Modal.info({
    title: 'Export',
    content: (
      <div>
        URL to load this app with the current
        expansion choice and fact list:
        <br/>
        <CopyToClipboard text={url}>
          <Button>Copy to clipboard</Button>
        </CopyToClipboard>
        {url}
      </div>
    ),
  })
}

function deserializeFact([type, seed]) {
  return Object.assign(new classDict[type](), JSON.parse(seed))
}

export {deserializeFact, showExportDialog}
