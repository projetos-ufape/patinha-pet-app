import { useNavigation } from "@react-navigation/native";
import React, { ReactNode } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { StackRouterProps } from "../../routers/stack";

type ButtonIconProps = TouchableOpacityProps & {
  icon: ReactNode;
  route?: "Config";
  onPress?: () => void;
};

// user route caso deseje que a função do navegador seja ir para alguma tela, se não será goBack padrão
export function ButtonIcon({
  icon,
  route,
  onPress,
  ...props
}: ButtonIconProps) {
  const navigation = useNavigation<StackRouterProps>();
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.6}
      onPress={
        onPress
          ? onPress
          : () => {
              route ? navigation.push(route) : navigation.goBack();
            }
      }
    >
      {icon}
    </TouchableOpacity>
  );
}
