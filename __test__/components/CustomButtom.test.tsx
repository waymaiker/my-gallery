import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from '../../components/CustomButton';

const onClick = jest.fn();

describe('<CustomButton />', () => {
  it('should match the snapshot', () => {    
    const rendered = render(<CustomButton action={onClick}/>);
    expect(rendered).toMatchSnapshot();
  });

  it('should display label "Click Here"', () => {
    const rendered = render(<CustomButton action={onClick} text="Click Here"/>);
    const textComponent = rendered.getByTestId('custom-button');
    expect(textComponent.props.children).toMatchSnapshot()
  });

  it('should display a Disabled button', () => {
    const rendered = render(<CustomButton action={onClick} isDisabled={true}/>);
    const textComponent = rendered.getByTestId('custom-button');

    fireEvent.press(textComponent)
    
    expect(onClick).toBeCalledTimes(0)
    expect(textComponent.props.style.opacity).toEqual(0.5)
  });

  it('Button should be clickable', () => {
    const rendered = render(<CustomButton action={onClick} isDisabled={false}/>);
    const textComponent = rendered.getByTestId('custom-button');

    fireEvent.press(textComponent)
    
    expect(onClick).toBeCalledTimes(1)
    expect(textComponent.props.style.opacity).toEqual(1)
  });
})