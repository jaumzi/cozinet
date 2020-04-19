import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    letterSpacing: 0.5
  },
  strong: {
    fontWeight: 'bold'
  },
  textColorPrimary: {
    color: '#bd0f20'
  },
  textColorSecondary: {
    color: '#fff9'
  },
  h1: {
    fontSize: 20
  },
  h2: {
    fontSize: 18
  },
  h3: {
    fontSize: 15
  },
});

function CustomizeText(props) {
  const { children, type = 'h2', primary = true, secondary = false, strong, style, ...rest } = props;

  return (
    <Text
      {...rest}
      style={[
        styles.text,
        primary && !secondary ? styles.textColorPrimary : styles.textColorSecondary,
        strong ? styles.strong : {},
        styles[type],
        style
      ]}
    >
      {children}
    </Text>
  );
}

export { CustomizeText };
