import { View, Text } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { AvatarText } from "../../components/AvatarText";
import { InvalidFormText } from "../../components/Form/InvalidFormText";
import { TextInput } from "../../components/TextInput";
import { styles } from "./styles";
import { APPTHEME } from "../../styles/theme";
import { NewPetProps } from "../../lib/props/NewPetProps";
import { RadioPet } from "../../components/RadioPet";
import { Select } from "../../components/Select";
import { DatePicker } from "../../components/DatePicker";
import { Button } from "../../components/Button";
import { withKeyboardAwareScrollView } from "../../components/withKeyboardAwareScrollView";
import { maskNumberPositive } from "../../utils/masks";
import { useState } from "react";
import { catBreeds, dogBreeds } from "../../utils/breeds";
import { api } from "../../services/api";
import { errorHandler } from "../../utils/errorHandler";

type FormNewPet = {
  name: string;
  type: "CAT" | "DOG";
  race: string;
  weight?: string;
  height?: string;
  birth?: Date;
};

function NewPet() {
  const [isDogBreeds, setIsDogBreeds] = useState(true);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormNewPet>({ defaultValues: { type: "DOG" } });

  const submit = handleSubmit((data) => {
    const newPet: NewPetProps = {
      ...data,
      height:
        data.height !== undefined && data.height !== ""
          ? Number(data.height)
          : undefined,
      weight:
        data.weight !== undefined && data.weight !== ""
          ? Number(data.weight)
          : undefined,
    };
    console.log(newPet);

    api
      .post("/pet/adicionar", newPet)
      .then((retorno) => {
        console.log("succes: ", retorno);
      })
      .catch((err) => {
        errorHandler(err);
      });
  });

  return (
    <View style={styles.container}>
      <View style={styles.contentInputs}>
        <AvatarText
          label="N"
          size={104}
          backgroundColor={APPTHEME.colors.primary}
        />
        <View style={styles.input}>
          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="Nome"
                value={value}
                maxLength={9}
                onChangeText={onChange}
                keyboardType="number-pad"
                error={errors.name ? true : false}
              />
            )}
            rules={{
              required: true,
            }}
          />
          {errors.name && <InvalidFormText title={"Informe o nome"} />}
        </View>
        <View style={styles.inputRadio}>
          <Text style={styles.title}>Espécie</Text>
          <Controller
            name="type"
            control={control}
            render={({ field: { value, onChange } }) => (
              <RadioPet
                pet={value}
                setPet={(data) => {
                  if (data === "DOG") {
                    setIsDogBreeds(true);
                  } else {
                    setIsDogBreeds(false);
                  }
                  setValue("race", "");
                  onChange(data);
                }}
              />
            )}
            rules={{
              required: true,
            }}
          />
        </View>
        <View style={styles.input}>
          <Controller
            name="race"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                opcoes={isDogBreeds ? dogBreeds : catBreeds}
                placeholder="Raça"
                value={value}
                onChange={onChange}
                error={errors.race ? true : false}
              />
            )}
            rules={{ required: true }}
          />
          {errors.race && <InvalidFormText title="Informe a raça" />}
        </View>
        <View style={styles.input}>
          <Controller
            name="birth"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker onChange={onChange} />
            )}
          />
        </View>
        <View style={styles.contentRow}>
          <View style={styles.inputRow}>
            <Controller
              name="height"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  label="Altura (cm)"
                  value={value ? String(value) : ""}
                  onChangeText={(text) => {
                    const number = maskNumberPositive(text);
                    onChange(number !== undefined ? number : value);
                  }}
                  keyboardType="number-pad"
                  error={errors.height ? true : false}
                />
              )}
            />
          </View>
          <View style={styles.inputRow}>
            <Controller
              name="weight"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  label="Peso (Kg)"
                  value={value ? String(value) : ""}
                  onChangeText={(text) => {
                    const number = maskNumberPositive(text);
                    onChange(number !== undefined ? number : number);
                  }}
                  keyboardType="number-pad"
                  error={errors.weight ? true : false}
                />
              )}
            />
          </View>
        </View>
      </View>
      <Button onPress={submit}>Adicionar</Button>
    </View>
  );
}

export default withKeyboardAwareScrollView(NewPet);
