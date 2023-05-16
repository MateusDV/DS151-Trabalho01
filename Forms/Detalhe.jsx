import { useState, useEffect } from "react";
import { Text, StyleSheet, View, Image, Linking, TouchableOpacity } from "react-native";
import PaisesApiClient from "../api/api";

const Detalhe = ({ navigate, nome }) => {
    const [dados, setDados] = useState(null);

    const client = new PaisesApiClient('https://restcountries.com/v3.1/');

    useEffect(() => {
        async function getDados() {
            response = await client.pesquisarPaises(nome);
            setDados(response[0]);
        }
        getDados().catch(console.error);
    });

    const openGoogleMaps = () => {
        Linking.openURL(dados.maps.googleMaps);
    };

    if (dados == null) {
        return <Text>Carregando...</Text>
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigate('home', null)}>
                <Text style={styles.buttonText}>{'< Back'}</Text>
            </TouchableOpacity>
            <Image source={{ uri: dados.flags.png }} style={styles.flagImage} />
            <Text style={styles.countryName}>{dados.name.common}</Text>
            <Text style={styles.officialName}>{dados.name.official}</Text>
            <Text style={styles.region}>Region: {dados.region}</Text>
            <Text style={styles.languages}>
                Languages: {Object.values(dados.languages).join(", ")}
            </Text>
            <Text style={styles.population}>Population: {dados.population}</Text>
            <TouchableOpacity style={styles.button} onPress={openGoogleMaps}>
                <Text style={styles.buttonText}>Open in Google Maps</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
    },
    flagImage: {
        width: 200,
        height: 120,
        marginBottom: 16,
    },
    countryName: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    officialName: {
        fontSize: 18,
        marginBottom: 8,
    },
    nativeName: {
        fontSize: 18,
        marginBottom: 8,
    },
    region: {
        fontSize: 16,
        marginBottom: 8,
    },
    currencies: {
        fontSize: 16,
        marginBottom: 8,
    },
    languages: {
        fontSize: 16,
        marginBottom: 8,
    },
    population: {
        fontSize: 16,
    },
    button: {
        backgroundColor: "#007bff",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
        margin: 16,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
    },
});


export default Detalhe;