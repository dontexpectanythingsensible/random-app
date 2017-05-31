import React from 'react';
import { getRandomInt } from '../../services/utils';
import Coin from './Coin';
// import Slider from 'components/Slider';
// import Ad from 'components/Ad';

import {
  Text,
  Button,
  View,
  StyleSheet,
  Slider
} from 'react-native';

const styles = StyleSheet.create({
  coin: {
    color: '#333',
    margin: 5,
    textAlign: 'center'
  },
  button: {
    marginBottom: 2
  }
});

export default class CoinView extends React.Component {
  state = {
    coins: [],
    amount: 2
  }

  flip = () => {
    const coins = [];
    for (let i = 0; i < this.state.amount; i++) {
      coins.push(getRandomInt(0, 1) === 1 ? 'heads' : 'tails');
    }

    this.setState({ coins });
  }

  componentWillMount () {
    this.flip();
  }

  handleChange = e => {
    let val = +e.target.value;

    if (e && e.target && e.target.name) {
      // sync
      this.state[e.target.name] = +val;
      this.flip();
    }
  }

  renderCoin (val, i) {
    return (
      <Text style={ styles.coin } key={ i }>{ val }</Text>
    );
  }

  render () {
    const headCount = this.state.coins.reduce(function (count, coin) {
      if (coin === 'heads') {
        return count + 1;
      }

      return count;
    }, 0);

    return (
      <View className='coin__view'>
        <Slider
          step={1}
          minimumValue={1}
          maximumValue={20}
          onValueChange={ amount => this.setState({ amount }) } />
        <Text>{ this.state.amount }</Text>

        <Button className='button' onPress={ this.flip } title='Again' color='#841584' />

        { this.state.amount > 3
        ? <Text className='coin__count'>
          { `heads: ${ headCount }, tails: ${ this.state.coins.length - headCount }` }
        </Text>
         : null
       }

        { this.state.coins.map(this.renderCoin) }
      </View>
    );
  }
}