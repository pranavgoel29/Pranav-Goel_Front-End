//  'memo' is is not being used anywhere after modifying the code so we can avoid importing it.
// import React, { useState, useEffect, memo } from "react";

import React, { useState, useEffect } from "react";
import "./list.css";
import PropTypes from "prop-types";

// Single List Item
const WrappedSingleListItem = ({ index, isSelected, onClickHandler, text }) => {
  return (
    <li
      className="li"
      style={{ backgroundColor: isSelected ? "green" : "red" }}
      // The onClick event was not passed correctly. It should be onClick={() => onClickHandler(index)} and not onClick={onClickHandler(index)}. To pass a parameter in a function in the 'onClick' event the attribute should be returned by an arrow function.
      onClick={() => onClickHandler(index)}
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  // Index and isSelected should be set as required props
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

// Here, memo is of no use so we can simply remove it

// const SingleListItem = memo(WrappedSingleListItem);
const SingleListItem = WrappedSingleListItem;

// List Component
const WrappedListComponent = ({ items }) => {
  // Swap the order of the setSelectedIndex and selectedIndex variables in the useState hook.
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: "left" }}>
      {items &&
        items.map((item, index) => (
          <SingleListItem
            // Each child in a list should have a unique "key" prop. In WrappedListComponent, the key prop was missing in SingleListItem component. This can lead to performance issues when rendering large lists.
            key={index}
            onClickHandler={() => handleClick(index)}
            text={item.text}
            index={index}
            // isSelected prop should pass a boolean value
            isSelected={index === selectedIndex}
          />
        ))}
    </ul>
  );
};

// Syntax errors - 'array' should be 'arrayOf' and 'shapeOf' should be 'shape'
WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};

// The default value for items in WrappedListComponent should not be null . It should be set to an array as we are mapping on this prop in the WrapoedListComponent and passing it's value to the SingleListItem
WrappedListComponent.defaultProps = {
  items: [{ text: "Item 1" }, { text: "Item 2" }],
};

// Here, memo is of no use so we can simply remove it

// const List = memo(WrappedListComponent);
const List = WrappedListComponent;

export default List;
