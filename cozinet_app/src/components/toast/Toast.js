import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
} from 'react-native';
import { CustomizeText } from '../../components/form/CustomizeText';
import { CustomizeButton } from '../form/FormButtons';

const componentStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignContent: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#0004',
    flexDirection: 'column'
  },
  box: {
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4
  },
  actions: {
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 12,
    paddingRight: 12,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#fff'
  },
  textTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff'
  },
  textMsg: {
    marginTop: 20,
    color: '#fff',
    fontWeight: '400'
  }
});

const verifyTypes = type => {
  let styles = {};
  switch (type) {
    case 'error':
      styles = {
        backgroundColor: '#f43636'
      };
      break;
    case 'success':
      styles = {
        backgroundColor: '#35b13a'
      };
      break;
    case 'warning':
      styles = {
        backgroundColor: '#ff9800'
      };
      break;
    case 'info':
      styles = {
        backgroundColor: '#2196f3'
      };
      break;
    default:
      // info
      styles = {
        backgroundColor: '#2196f3'
      };
      break;
  }
  return styles;
};

function Toast(props) {
  const { notification, close } = props;

  const typeStyles = verifyTypes(notification && notification.type);

  return (
    <Modal animationType="slide" transparent={true} visible={!!notification}>
      <View style={componentStyles.overlay}>
        <View style={[componentStyles.box, typeStyles]}>
          <CustomizeText style={componentStyles.textTitle} strong>
            {(notification && notification.title) || ''}
          </CustomizeText>

          {notification && notification.msg && (
            <CustomizeText style={componentStyles.textMsg} strong>
              {notification.msg}
            </CustomizeText>
          )}
        </View>
        <View style={[componentStyles.actions, typeStyles]}>
          <CustomizeButton type="default-secondary" onPress={close}>
            Fechar
          </CustomizeButton>
          {!!notification && !!notification.action && (
            <CustomizeButton
              type="default-secondary"
              onPress={notification.action.action}
              style={{
                borderColor: '#fff',
                borderWidth: 1,
                borderRadius: 4
              }}
              textStyle={[
                {
                  fontSize: 14
                }
              ]}
            >
              {notification.action.name}
            </CustomizeButton>
          )}
        </View>
      </View>
    </Modal>
  );
}
export default Toast;
