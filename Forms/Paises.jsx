import { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Image, Alert } from 'react-native';
import listaPaises from "../api/listaPaises";
import axios from 'axios';

axios.defaults.url = 'https://restcountries.com/v3.1/';

const Paises = () => {
    const [paises, setPaises] = useState(null);
    const [query, setQuery] = useState('');

    async function getPais() {
        try {
            if (query === '') {
                const response = await axios.get('all');
                console.log(response.data);
                setPaises(response.data);
            } else {
                console.log(query);
                const response = await axios.get(`name/${query}`);
                console.log(response.data);
                setPaises(response.data);
            }
        } catch (error) {
            console.log(error);
            Alert.alert('', "País não encontrado!");
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textbox}
                placeholder="Digite o nome do país"
                onChangeText={(pais) => setQuery(pais)}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => getPais()}>
                <Text style={styles.buttonText}>Pesquisar</Text>
            </TouchableOpacity>
            {paises && <Listagem paises={paises} />}
        </View>
    )
}

export default Paises;

const Listagem = ({ paises }) => {
    return (
        <ScrollView style={styles.container}>
            {paises.map(pais => (
                <View style={{ flexDirection: "row" }}>
                    <Image
                        source={{ uri: pais.flags.png }}
                        style={{ width: 30, height: 20 }}
                    />
                    <Text> {pais.name.common} - {pais.region}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => getPais()}
                    >
                        <Text style={styles.buttonText}>Visualizar</Text>
                    </TouchableOpacity>
                </View>

            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    },
    textbox: {
        width: '60%',
        height: 40,
        padding: 8,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 4,
    },
    button: {
        backgroundColor: '#007bff',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
        marginHorizontal: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
});
