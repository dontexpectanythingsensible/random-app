import React from 'react';

export const Coin = props => (
  <Text className={ `coin coin--${ props.value }` }>{ props.value }</Text>
);

Coin.propTypes = {
  value: React.PropTypes.string.isRequired
};
