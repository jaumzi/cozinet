import React, { useRef, useEffect, memo, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useField } from "@unform/core";
import Icon from "react-native-vector-icons/FontAwesome";
import IconFeather from "react-native-vector-icons/Feather";
import { format } from "date-fns";
import { IconButton } from "./FormButtons";
// import { ptBR } from 'date-fns/locale';

const formStyles = StyleSheet.create({
  iconCalendar: {
    backgroundColor: "#b32c39",
    color: "#fff",
    padding: 6,
    // paddingRight: 4,
    // paddingLeft: 10,
    marginLeft: 8,
    borderRadius: 4,
    textAlign: 'center',
  },
  oneIcon: {
    // flex: 0.1
    width: 42,
    height: 40
  },
  moreIcon: {
    // flex: 0.13
    width: 42,
    height: 40
  },
  hidden: {
    width: 0,
    height: 0
  },
  divInput: {
    paddingTop: 8
  },
  inputText: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderColor: '#5a5a5a',
    borderWidth: 2,
    color: '#5a5a5a',
    fontWeight: 'bold'
  },
  inputErro: {
    paddingLeft: 8,
    paddingRight: 8,
    color: '#d00000',
  },
});

function TextFieldComponent(props) {
  const { name, label, style, ...rest } = props;
  const inputRef = useRef(null);
  const {
    fieldName,
    registerField,
    defaultValue = undefined,
    error
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "_lastNativeText",
      getValue(ref) {
        return ref._lastNativeText || "";
      },
      setValue(ref, value) {
        ref.setNativeProps({ text: value });
        ref._lastNativeText = value;
      },
      clearValue(ref) {
        ref.setNativeProps({ text: "" });
        ref._lastNativeText = "";
      }
    });
  }, [fieldName, registerField]);

  return (
    <>
      <View style={[{ flexDirection: "column", flex: 1 }, formStyles.divInput]}>
        {label && <Text style={{ paddingBottom: 4 }} >{label}</Text>}
        <View style={{ flexDirection: "row" }}>
          <TextInput
            {...rest}
            style={[formStyles.inputText, error && { borderColor: "#d00000" }, style]}
            ref={inputRef}
            defaultValue={defaultValue}
          />
        </View>
        <View>{error && <Text style={formStyles.inputErro}>{error}</Text>}</View>
      </View>
    </>
  );
}
function LongTextFieldComponent(props) {
  return (
    <TextFieldComponent
      {...props}
      multiline
      numberOfLines={4}
      maxLength={220}
    />
  );
}

function DateFiedComponent(props) {
  const { name, label, mode = "date", display, placeholder, ...rest } = props;
  const [state, setState] = useState({
    show: false,
    date: defaultValue || undefined,
    modeDP: mode !== "dateTime" ? mode : "date"
  });
  const { show, date, modeDP } = state;
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue = date, error } = useField(
    name
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "props.value",
      clearValue(ref) {
        ref.setNativeProps({ text: "" });
        ref.value = "";
      }
    });
  }, [fieldName, registerField]);

  return (
    <>
      <View style={[{ flexDirection: "column" }, formStyles.divInput]}>
        {label && <Text style={{ paddingBottom: 4 }} >{label}</Text>}
        <View style={{ flexDirection: "row" }}>
          <Text
            style={[
              formStyles.inputText,
              error && { borderColor: "#d00000" },
              {
                color: date ? "#b32c39" : "#c3c3c3"
              }
            ]}
          >
            {date
              ? `${
                  mode === "date" || mode === "dateTime"
                    ? format(date, "dd/MM/yyyy")
                    : ""
                }${mode === "dateTime" ? " " : ""}${
                  mode === "time" || mode === "dateTime"
                    ? format(date, "HH:mm")
                    : ""
                }`
              : placeholder}
          </Text>
          <TextInput
            {...rest}
            ref={inputRef}
            style={formStyles.hidden}
            value={String(date)}
            editable={false}
          />
          <Icon
            size={25}
            name="calendar"
            style={[
              formStyles.iconCalendar,
              mode === "dateTime" ? formStyles.moreIcon : formStyles.oneIcon
            ]}
            onPress={() =>
              setState(prev => {
                return {
                  ...prev,
                  show: !show,
                  modeDP: "date"
                };
              })
            }
          />
          {mode === "dateTime" && (
            <IconFeather
              size={25}
              name="clock"
              style={[
                formStyles.iconCalendar,
                mode === "dateTime" ? formStyles.moreIcon : formStyles.oneIcon
              ]}
              onPress={() =>
                setState(prev => {
                  return {
                    ...prev,
                    show: !show,
                    modeDP: "time"
                  };
                })
              }
            />
          )}
        </View>
        <View style={{ flexDirection: "row" }}>
          {error && <Text style={formStyles.inputErro}>{error}</Text>}
        </View>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date || new Date()}
          mode={modeDP}
          is24Hour={true}
          display={display || "spinner"}
          onChange={(e, v) => {
            setState({
              ...state,
              date: v || date,
              show: false
            });
          }}
        />
      )}
    </>
  );
}

function SeachTextFiedComponent(props) {
  const { name, label, searchOnpress, searchOnChange, ...rest } = props;
  const inputRef = useRef(null);
  const {
    fieldName,
    registerField,
    defaultValue = undefined,
    error
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "_lastNativeText",
      getValue(ref) {
        return ref._lastNativeText || "";
      },
      setValue(ref, value) {
        ref.setNativeProps({ text: value });
        ref._lastNativeText = value;
      },
      clearValue(ref) {
        ref.setNativeProps({ text: "" });
        ref._lastNativeText = "";
      }
    });
  }, [fieldName, registerField]);

  return (
    <>
      <View style={[{ flexDirection: "column" }, formStyles.divInput]}>
        {label && <Text style={{ paddingBottom: 4 }} >{label}</Text>}
        <View style={{ flexDirection: "row" }}>
          <TextInput
            onChange={e => searchOnChange(e.nativeEvent.text)}
            style={[formStyles.inputText, error && { borderColor: "#d00000" }]}
            ref={inputRef}
            defaultValue={defaultValue}
            {...rest}
          />
          {!!searchOnpress && (
            <IconButton
              icon="search"
              onPress={searchOnpress}
            />
          )}
        </View>
        <View>{error && <Text style={formStyles.inputErro}>{error}</Text>}</View>
      </View>
    </>
  );
}

const TextField = memo(TextFieldComponent);
const LongTextField = memo(LongTextFieldComponent);
const DateField = memo(DateFiedComponent);
const SeachTextFied = memo(SeachTextFiedComponent);

export { TextField, DateField, SeachTextFied, LongTextField };
