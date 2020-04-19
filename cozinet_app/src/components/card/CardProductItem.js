import React, {memo} from 'react';
import { View, Text } from 'react-native';
import { Card } from 'src/components/card/Card';

function CardProductItemComponent(props) {
  const {
    produto: { nome, un_medida, preco, quantidade, marca }
  } = props;

  return (
    <>
      <Card>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Text>{`${nome}${marca ? ` - ${marca}` : ''}`}</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 8,
              justifyContent: 'flex-end'
            }}
          >
            <Text
              style={{
                fontWeight: 'bold'
              }}
            >
              {`${quantidade} ${un_medida} por`}
            </Text>
            <Text
              style={{
                color: 'green',
                fontWeight: 'bold'
              }}
            >
              {` R$ ${preco}`}
            </Text>
          </View>
        </View>
      </Card>
    </>
  );
}
const CardProductItem = memo(CardProductItemComponent);
export default CardProductItem;
