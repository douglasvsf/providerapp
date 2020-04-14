import React, { forwardRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { Container, TInput, FInput, FixedPlaceholder } from './styles';

function Input({ style, icon, fixedplaceholder, ...rest }, ref) {
  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={20} color="rgba(255, 255, 255, 0.8)" />}
      {fixedplaceholder ? (
        <>
          <FixedPlaceholder>{fixedplaceholder}</FixedPlaceholder>
          <FInput {...rest} ref={ref} />
        </>
      ) : (
        <TInput {...rest} ref={ref} />
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
