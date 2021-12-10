import {
  render, screen, fireEvent,
} from '@testing-library/react';
import Form from './App';
import Button from './components/Form/Button';

describe('<Form/>', () => {
  it('should render', () => {
    render(<Form />);
    expect(screen.queryByText('Payment')).toBeInTheDocument();
    expect(screen.queryByLabelText('Email')).toBeInTheDocument();
    expect(screen.queryByLabelText('Card information')).toBeInTheDocument();
    expect(screen.queryByLabelText('Name on card')).toBeInTheDocument();
    expect(screen.queryByText('Country or region')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText('0000 0000 0000 0000'),
    ).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('MM/YY')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('CVC')).toBeInTheDocument();
    expect(screen.queryByText('Country')).toBeInTheDocument();
    expect(screen.queryByText('Pay €55.00')).toBeInTheDocument();
  });
  it('should input email focused ', () => {
    render(<Form />);
    fireEvent.click(screen.getByLabelText('Email'));
    expect(screen.queryByPlaceholderText('Email')).toHaveFocus();
  });
  it('should input email value ', () => {
    render(<Form />);
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'aaa@aaa.com' },
    });
    expect(screen.queryByDisplayValue('aaa@aaa.com')).toBeInTheDocument();
  });
  it('should input card number value ', () => {
    render(<Form />);
    fireEvent.change(screen.getByPlaceholderText('0000 0000 0000 0000'), {
      target: { value: '3456 3467 6576 0098' },
    });
    expect(
      screen.queryByDisplayValue('3456 3467 6576 0098'),
    ).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('MM/YY'), {
      target: { value: '08/21' },
    });
    expect(screen.queryByDisplayValue('08/21')).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('CVC'), {
      target: { value: '777' },
    });
    expect(screen.queryByDisplayValue('777')).toBeInTheDocument();
  });
  it('should input on card name value ', () => {
    render(<Form />);
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Alex Smith' },
    });
    expect(screen.queryByDisplayValue('Alex Smith')).toBeInTheDocument();
  });
  it('should change dropdown value ', () => {
    render(<Form />);
    fireEvent.click(screen.getByText('Country'));
    expect(screen.queryAllByLabelText('dropdown list')[0]).toBeInTheDocument();
    fireEvent.click(screen.getAllByText('Latvia')[0]);
    expect(screen.queryByText('Country')).not.toBeInTheDocument();
  });
});

describe('<Button />', () => {
  it('should render', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Pay €55.00</Button>);
    fireEvent.click(screen.getByText('Pay €55.00'));
    expect(onClick).toBeCalled();
    expect(screen.queryByText('Pay €55.00')).toBeInTheDocument();
  });
});
