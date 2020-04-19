import React, { memo } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Card } from 'src/components/card/Card';
import { format } from 'date-fns';

function CardMensagemItemComponent(props) {
  const {
    mensagem: {
      mensagem,
      isResposta,
      createdAt,
      Usuario: { nome }
    }
  } = props;

  const data = new Date(createdAt);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: !isResposta ? 'flex-end' : 'flex-start'
      }}
    >
      <Card
        style={{
          flex: 1,
          backgroundColor: !isResposta ? '#b32c3923' : '#2196f377',
          maxWidth: '80%'
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: 'bold',
            marginBottom: 4,
            color: '#0006'
          }}
        >
          {nome}
        </Text>
        <Text
          style={{
            fontSize: 15
          }}
        >
          {mensagem}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: 'right',
            color: '#0006'
          }}
        >
          {format(data, 'dd/MM/yy HH:mm')}
        </Text>
      </Card>
    </View>
  );
}

const CardMensagemItem = memo(CardMensagemItemComponent);

export default CardMensagemItem;
