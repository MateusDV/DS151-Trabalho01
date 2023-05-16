import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Image, Alert } from 'react-native';
import PaisesApiClient from "../api/api";

const Paises = ({ navigate }) => {
    const [paises, setPaises] = useState(null);
    const [query, setQuery] = useState('');

    const client = new PaisesApiClient('https://restcountries.com/v3.1/');

    useEffect(() => {
        async function getPais() {
            let response = '';
            console.log(query);
            try {
                if (query === '') {
                    response = await client.obterTodosPaises();
                } else {
                    response = await client.pesquisarPaises(query);
                }
                console.log(response);
                setPaises(response);
            } catch (error) {
                console.log(error);
                Alert.alert('', "País não encontrado!");
            }
        }
        getPais().catch(console.error);
    }, [query]);

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
            {paises && <Listagem paises={paises} navigate={navigate} />}
        </View>
    )
}

export default Paises;

const Listagem = ({ paises, navigate }) => {
    return (
        <ScrollView style={styles.container}>
            {paises.map(pais => (
                <TouchableOpacity
                    style={{ flexDirection: "row", margin: 10 }}
                    key={pais.name.common}
                    onPress={() => navigate('pais', pais.name.common)}
                >
                    <Image
                        source={{ uri: pais.flags.png }}
                        style={{ width: 90, height: 60 }}
                    />
                    <Text> {pais.name.common} - {pais.region}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        padding: 30,
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
