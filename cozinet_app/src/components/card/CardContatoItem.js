import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Card } from 'src/components/card/Card';
import { format } from 'date-fns';

function CardContatoItem(props) {
  const {
    contato: { titulo, descricao, createdAt },
    onPress,
    nome
  } = props;

  const dataCriacao = new Date(createdAt);

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor="#b32c3955"
      style={{
        marginTop: 8,
        borderRadius: 4
      }}
    >
      <Card
        style={{
          backgroundColor: '#b32c3929',
          marginTop: 0
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18
          }}
        >
          {titulo}
        </Text>
        <Text style={{ marginTop: 8 }}>{descricao}</Text>
        <View
          style={{
            marginTop: 12,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Text>{format(dataCriacao, 'dd/MM/Y HH:mm')}</Text>
          <Text
            style={{
              fontWeight: 'bold'
            }}
          >
            {nome}
          </Text>
        </View>
      </Card>
    </TouchableHighlight>
  );
}

export { CardContatoItem };
