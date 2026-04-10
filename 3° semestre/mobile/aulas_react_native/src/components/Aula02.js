import { View, Text, Image, TextInput, Button, TouchableOpacity, StyleSheet } from "react-native"
import Logo from '../assets/logo.png'
import { useState } from "react"
import { LinearGradient, linearGradient } from 'expo-linear-gradient'

export default function Aula02() {
    const [nome, setNome] = useState('')
    return (
        <View>
            <Text style={{ textAlign: 'center' }}>----------------------------------------------------</Text>
            <Text>Aula 02 - componentes basicos</Text>
            <Text>Conhecendo os principais componentes do React Native</Text>
            {/* inserindo imagem da internet */}
            <Image
                source={{ uri: 'https://picsum.photos/300/200' }}
                style={{ width: 300, height: 200 }}
            />
            <Image
                source={require('../assets/logo.png')}
                style={{ width: 50, height: 50 }}
            />
            {/* inserindo imagem referenciando como componente */}
            <Image
                source={Logo}
                style={{ width: 50, height: 50 }}
            />
            <TextInput
                placeholder="digite aqui"
                style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
                onChangeText={setNome}

            />
            <Button
                title="clique aqui"
                onPress={() => console.log(`bem vindo: ${nome}`)}
            />
            <Text>seu nome é: {''}{nome}</Text>

            <TouchableOpacity
                onPress={() => console.log(`bem vindo: ${nome}`)}
                style={estilos.botao}
            >
                <Image 
                source={Logo}
                style={{ width: 25, height: 25 }} />
                <Text style={estilos.botaoTexto}>Botão TouchableOpacity</Text>

            </TouchableOpacity>

            <LinearGradient
                style={{ height: 50 }}
                colors={['transparent', 'red', 'transparent']}

            >

            </LinearGradient>
        </View>
    )
}

const estilos = StyleSheet.create({
    botao: {
        backgroundColor: '#fb00d1', padding: 12, borderRadius: 8, alignItems: 'center'
    },
    botaoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});