import React from 'react';
// import { getRandomInt, compareNumbers } from '../../services/utils';
// import Slider from '../Slider';
// import Ad from 'components/Ad';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View
} from 'react-native';

export function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// custom sort otherwise you'll get 1, 10, 2, 20
export function compareNumbers (a, b) {
  return a - b;
}


export default class Lottery extends React.Component {
  state = {
    min: 1,
    max: 49,
    amount: 7,
    selected: []
  }

  handleChange = e => {
    let val = +e.target.value;

    if (e && e.target && e.target.name) {
      if (e.target.name === 'max' && val <= this.state.min) {
        val = this.state.min + 1;
      }

      this.state[e.target.name] = +val;
      this.generate();
    }
  }

  generate = () => {
    let newSelection = [];
    for (let i = 0; i < this.state.amount; i++) {
      let num = getRandomInt(this.state.min, this.state.max);

      while (newSelection.indexOf(num) >= 0) {
        num = getRandomInt(this.state.min, this.state.max);
      }
      newSelection.push(num);
    }

    this.setState({ selected: newSelection });
  }

  componentWillMount () {
    this.generate();
  }

  renderNumber (num, i) {
    return (
      <Text className='lottery__number' key={ i }>{ num }</Text>
    );
  }

  render () {
    return (
      <View className='lottery'>
          <Text htmlFor='min'>Min</Text>
          <TextInput type='number'
            name='min'
            step='1'
            min='-500'
            max='500'
            placeholder='0'
            onChange={ this.handleChange }
            value={ this.state.min } />

          <Text htmlFor='max'>Max</Text>
          <Text type='number'
            name='max'
            step='1'
            min='-500'
            max='500'
            placeholder='500'
            onChange={ this.handleChange }
            value={ this.state.max } />

        <Button className='button lottery__button' onPress={ this.generate } title='Generate' />

        <Text className='lottery__numbers'>{ this.state.selected.sort(compareNumbers).map(this.renderNumber) }</Text>

        <Text className='lottery_info'>This will generate the specified number of random numbers between
        the set minimum and maximum (inclusive), with no duplicates.</Text>
      </View>
    );
  }
}
