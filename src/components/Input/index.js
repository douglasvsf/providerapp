import React, { forwardRef, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { Touchable } from '~/components/Touchable';

import { Container, TInput, FInput, FixedPlaceholder } from './styles';

function Input(
  {
    style,
    icon,
    passwordField,
    fixedplaceholder,
    inputStyle,
    iconColor,
    ...rest
  },
  ref
) {
  const validPasswrod = !!passwordField;
  const [showPassword, setShowPassword] = useState(validPasswrod);
  const [iconPassword, setIconPassword] = useState('visibility');

  const togglePassword = () => {
    setShowPassword(previousState => !previousState);

    if (showPassword === true) {
      setIconPassword('visibility-off');
    } else {
      setIconPassword('visibility');
    }
  };

  return (
    <Container style={style}>
      {icon && (
        <Icon
          name={icon}
          size={20}
          color={iconColor || 'rgba(255, 255, 255, 0.8)'}
        />
      )}
      {fixedplaceholder ? (
        <>
          <FixedPlaceholder>{fixedplaceholder}</FixedPlaceholder>
          <FInput {...rest} ref={ref} />
        </>
      ) : (
        <>
          <TInput
            secureTextEntry={showPassword}
            style={inputStyle}
            {...rest}
            ref={ref}
          />
        </>
      )}

      {passwordField && (
        <Touchable onPress={togglePassword}>
          <Icon
            name={iconPassword}
            size={20}
            color={iconColor || 'rgba(255, 255, 255, 0.8)'}
          />
        </Touchable>
      )}
    </Container>
  );
}

Input.propTypes = {
  icon: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Input.defaultProps = {
  icon: null,
  style: {},
};

export default forwardRef(Input);
