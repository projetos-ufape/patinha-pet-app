import React from "react";
import { Text } from "react-native";

import { styles } from "./styles";
import { Card } from "react-native-paper";

type CardEmptyListProps = {
  text: string;
};

export function CardEmptyList({ text }: CardEmptyListProps) {
  return (
    <Card mode="elevated">
      <Card.Content style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </Card.Content>
    </Card>
  );
}
