import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomModal from '../../components/CustomModal';
import { View } from 'react-native';

const onClick = jest.fn();
const Children = () => (<View></View>);

describe('<CustomModal />', () => {
  it('should match the snapshot', () => {    
    const rendered = render(<CustomModal isVisible={true} setVisibility={onClick} children={<Children />}/>);
    expect(rendered).toMatchSnapshot();
  });
})