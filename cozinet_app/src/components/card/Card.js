import React, { memo } from "react";
import { View } from "react-native";
import styles from "../../assets/stylesheet";
import { TouchableHighlight } from "react-native-gesture-handler";

function CardComponent(props) {
  const { children, style, onPress } = props;
  const Element = onPress ? TouchableHighlight : View;
  return (
    <Element
      onPress={() => {
        onPress();
        console.log("press");
      }}
      underlayColor="#cecece"
      style={[
        styles.shadow(),
        {
          backgroundColor: "#fff",
          marginTop: 8,
          borderRadius: 4,
        },
      ]}
    >
      <View
        style={[
          {
            flex: 1,
            paddingVertical: 8,
            paddingHorizontal: 10,
            borderRadius: 4,
          },
          style,
        ]}
      >
        {children}
      </View>
    </Element>
  );
}

const Card = memo(CardComponent);

export { Card };
