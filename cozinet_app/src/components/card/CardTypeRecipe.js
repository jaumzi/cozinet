import React, { memo } from "react";
import { View, Text, Image } from "react-native";
import { Card } from "./Card";
import img from "../../assets/images/logo.png";

function CardTypeRecipeComponent(props) {
  const {
    recipe: { description },
    onPress
  } = props;

  return (
    <>
      <Card onPress={onPress} >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "flex-start",
          }}
        >
          {/* <Image 
          source={img} 
          style={{
            width: '100%',
            height: '100%',
            maxHeight: 100,
            maxWidth: 100,
            padding: 8,
            marginRight: 12,
            backgroundColor: 'green'
          }} /> */}
          <View
            style={{
              width: 100,
              height: 100,
              maxHeight: 100,
              maxWidth: 100,
              padding: 8,
              marginRight: 12,
              backgroundColor: "green",
            }}
          ></View>
          <Text
            style={{
              fontWeight: "bold",
              flex: 1,
              textAlign: "center",
              textAlignVertical: "center",
            }}
          >{`${description}`}</Text>
        </View>
      </Card>
    </>
  );
}
const CardTypeRecipe = memo(CardTypeRecipeComponent);
export default CardTypeRecipe;
