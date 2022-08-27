import { Button, View } from "@ant-design/react-native";
import { InputItemPropsType } from "@ant-design/react-native/lib/input-item/PropsType";
import { Formik } from "formik";
import { useCallback, useState } from "react";
import Input from "../../molecules/Input";
import * as Yup from 'yup';
import { IconNames } from "@ant-design/react-native/lib/icon";

interface InputPasswordConfig extends Pick<InputItemPropsType, 'type'> {
  icon: IconNames;
}
const lock: InputPasswordConfig = {
  type: 'password',
  icon: 'lock'
}
const unlock: InputPasswordConfig = {
  type: 'visible-password',
  icon: 'unlock'
}
interface Credential {
  email: string;
  password: string;
}

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('O campo email é obrigatório'),
  password: Yup.string()
    .min(6, 'O minímo é 6 dígitos')
    .max(20, 'O maxímo é 20 dígitos')
    .required('O campo senha é Obrigatório'),
});


export default function LoginForm() {
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [credential, setCredential] = useState({} as Credential)
  const AlteredVisiblePassword = useCallback(() => {
    return visiblePassword ? lock : unlock
  }, [visiblePassword])
  return (
    <View>
      <Formik
        initialValues={credential}
        onSubmit={values => {
          setCredential(values)
          console.log(values)
        }}
        validationSchema={SignInSchema}
      >{({ handleChange, handleSubmit, values, errors, touched , dirty}) => (
        <View>
          <Input
            placeholder="Digite seu e-mail"
            type="email-address"
            iconName={"mail"}
            onChange={handleChange('email')}
            value={values.email}
            error={!!errors.email && touched.email && dirty}
          />
          <Input
            placeholder="Digite sua senha"
            type={AlteredVisiblePassword().type}
            iconName={AlteredVisiblePassword().icon}
            iconAction={() => setVisiblePassword((current) => !current)}
            onChange={handleChange('password')}
            value={values.password}
            error={!!errors.password && touched.password && dirty}
          />
          <Button type="ghost" onPress={handleSubmit as any}>Login</Button>
        </View>
      )}
      </Formik>
    </View>
  )
}