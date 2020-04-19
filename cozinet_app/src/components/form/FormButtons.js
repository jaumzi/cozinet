import React from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconAntDesign from "react-native-vector-icons/AntDesign";

const stylesButtons = StyleSheet.create({
  btnFormOutlined: {
    flexDirection: "row",
    borderColor: "#bd0f20",
    borderWidth: 1,
    borderRadius: 4,
  },
  btnFormOutlined_text: {
    color: "#bd0f20",
    textAlign: "center",
    textDecorationLine: "none",
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  btnFormContained: {
    flexDirection: "row",
    backgroundColor: "#bd0f20",
    borderRadius: 4,
  },
  btnFormContained_text: {
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
    textDecorationLine: "none",
    textTransform: "uppercase",
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  btnFormContainedSecondary: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  btnFormContainedSecondary_text: {
    color: "#000",
    textAlign: "center",
    textAlignVertical: "center",
    textDecorationLine: "none",
    textTransform: "uppercase",
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  btnForm: {
    flexDirection: "row",
  },
  btnForm_text: {
    color: "#bd0f20",
    textAlign: "center",
    textDecorationLine: "none",
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  btnFormSecondary: {
    flexDirection: "row",
  },
  btnFormSecondary_text: {
    color: "#fff",
    textAlign: "center",
    textDecorationLine: "none",
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  btn: {
    paddingTop: 14,
    paddingBottom: 14,
  },
  btnDense: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  btnIcon: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginLeft: 8,
    borderRadius: 4,
  },
});

function verifyType(type) {
  let result = {};
  switch (type) {
    case "primary":
      result = {
        btnStyle: stylesButtons.btnFormContained,
        textStyle: stylesButtons.btnFormContained_text,
        underlayColor: "#bd0f20cc",
      };
      break;
    case "primary-secondary":
      result = {
        btnStyle: stylesButtons.btnFormContainedSecondary,
        textStyle: stylesButtons.btnFormContainedSecondary_text,
        underlayColor: "#bd0f20cc",
      };
      break;
    case "outlined":
      result = {
        btnStyle: stylesButtons.btnFormOutlined,
        textStyle: stylesButtons.btnFormOutlined_text,
        underlayColor: "#bd0f2066",
      };
      break;
    case "secondary":
      result = {
        btnStyle: stylesButtons.btnFormSecondary,
        textStyle: stylesButtons.btnFormSecondary_text,
        underlayColor: "#bd0f2015",
      };
      break;
    default:
      result = {
        btnStyle: stylesButtons.btnForm,
        textStyle: stylesButtons.btnForm_text,
        underlayColor: "#bd0f2015",
      };
      break;
  }
  return result;
}
function verifyIconType(icon) {
  let result = {};
  switch (icon) {
    case "AntDesign":
      result = IconAntDesign;
      break;
    case "MaterialIcons":
      result = Icon;
      break;

    default:
      result = Icon;
      break;
  }
  return result;
}

function CustomizeButton(props) {
  const { children, type = "primary", style, textStyle, fullWidth } = props;

  const typeButton = verifyType(type);

  return (
    <TouchableHighlight
      {...props}
      style={[
        typeButton.btnStyle,
        type === "dense" ? stylesButtons.btnDense : stylesButtons.btn,
        fullWidth && {
          flex: 1,
          justifyContent: "center",
        },
        style,
      ]}
      underlayColor={typeButton.underlayColor}
    >
      <Text style={[typeButton.textStyle, textStyle]}>{children}</Text>
    </TouchableHighlight>
  );
}
function IconButton(props) {
  const {
    icon,
    iconType = "MaterialIcons",
    type = "primary",
    iconStyles,
    onPress,
    size,
  } = props;
  const typeButton = verifyType(type);
  const Element = verifyIconType(iconType);
  // console.log(styles.shadow(2));
  return (
    // <View style={[]}>
      <TouchableHighlight
        {...props}
        style={[typeButton.btnStyle, stylesButtons.btnIcon]}
        underlayColor={typeButton.underlayColor}
      >
        <Element
          size={size || 25}
          name={icon}
          onPress={onPress}
          style={[
            typeButton.textStyle,
            iconStyles,
            {
              fontSize: size || 25,
            },
          ]}
        />
      </TouchableHighlight>
    // </View>
  );
}

export { CustomizeButton, IconButton };
