import React, { useState } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function BoxCollapse(props) {
  const { title, children, open } = props;
  const [state, setState] = useState({
    openList: open || false
  });
  const { openList } = state;
  return (
    <View
      style={{
        paddingVertical: 4
      }}
    >
      <TouchableHighlight
        onPress={() => {
          setState({
            ...state,
            openList: !openList
          });
        }}
        style={[
          openList
            ? {
                borderTopRightRadius: 4,
                borderTopLeftRadius: 4
              }
            : {
                borderRadius: 4
              },
          {
            paddingVertical: 12,
            paddingHorizontal: 8,
            backgroundColor: '#b32c39',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }
        ]}
        underlayColor="#b32c39cc"
      >
        <>
          <Text
            style={{
              color: '#ffcf28',
              fontWeight: 'bold'
            }}
          >
            {title}
          </Text>
          <Icon
            size={14}
            name={!openList ? 'chevron-down' : 'chevron-up'}
            style={{
              color: '#ffcf28',
              marginRight: 4
            }}
          />
        </>
      </TouchableHighlight>

        <View
          style={[
            {
              borderBottomRightRadius: 4,
              borderBottomLeftRadius: 4,
              backgroundColor: '#b32c3933',
              paddingHorizontal: 12,
              paddingBottom: 12,
              paddingTop: 4
            },
            {
              display: openList ? 'flex' : 'none',
            }
          ]}
        >
          {children}
        </View>
    </View>
  );
}

export { BoxCollapse };
