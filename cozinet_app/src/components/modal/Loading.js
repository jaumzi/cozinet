import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { CustomizeText } from '../form/CustomizeText';

const componentStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#0004'
  },
  box: {
    margin: 20,
    paddingTop: 60,
    paddingBottom: 60,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
    borderRadius: 4
  },
  textLoading: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000'
  }
});

function Loading(props) {
  const { children, text, open } = props;

  return (
      <Modal animationType="slide" transparent={true} visible={open}>
        <View style={componentStyles.overlay}>
          <View style={componentStyles.box}>
            <CustomizeText style={componentStyles.textLoading} strong>
              {children || text}
            </CustomizeText>
          </View>
        </View>
      </Modal>
  );
}


export default Loading;
