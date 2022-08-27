import { View, InputItem, Icon } from "@ant-design/react-native";
import { IconNames } from "@ant-design/react-native/lib/icon";
import { InputItemProps } from "@ant-design/react-native/lib/input-item";
import Feather from 'react-native-vector-icons/Feather'
interface PropsInput extends InputItemProps {
  width?: number;
  height?: number;
  iconName ?: IconNames | null;
  iconAction?: () => void;
}

export default function Input({ iconName, iconAction,width = 360, height = 60, placeholder, ...rest }: PropsInput) {
  return (
    <View>
      <InputItem style={{ width, height }} placeholder={placeholder} extra={iconName  && <Icon name={iconName} size={20} onPress={iconAction ? iconAction : () => {}}/>} {...rest}/>
    </View>
  )
}