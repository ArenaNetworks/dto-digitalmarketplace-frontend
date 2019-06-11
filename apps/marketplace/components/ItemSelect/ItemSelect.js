import React from 'react'

import ItemSelectInput from './ItemSelectInput'
import ItemSelectResultsList from './ItemSelectResultsList'
import ItemSelectSummary from './ItemSelectSummary'

const ItemSelect = props => {
  const {
    description,
    emptyResultsMessage,
    handleRemoveItem,
    handleSearchChange,
    handleSearchClick,
    id,
    inputValue,
    items,
    label,
    minimumSearchChars,
    placeholder,
    resultIsEmpty,
    resultListItems,
    selectedItems,
    showSearchButton,
    summaryHeading
  } = props

  return (
    <React.Fragment>
      <ItemSelectInput
        description={description}
        handleSearchChange={handleSearchChange}
        handleSearchClick={handleSearchClick}
        id={id}
        inputValue={inputValue}
        label={label}
        placeholder={placeholder}
        showSearchButton={showSearchButton}
      />
      {inputValue.length >= minimumSearchChars && (
        <ItemSelectResultsList
          emptyResultsMessage={emptyResultsMessage}
          items={items}
          resultIsEmpty={resultIsEmpty}
          resultListItems={resultListItems}
          keywords={inputValue}
        />
      )}
      {Object.keys(selectedItems).length > 0 && (
        <ItemSelectSummary
          handleRemoveItem={handleRemoveItem}
          selectedItems={selectedItems}
          summaryHeading={summaryHeading}
        />
      )}
    </React.Fragment>
  )
}

export default ItemSelect
