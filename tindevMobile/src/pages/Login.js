import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import logo from '../assets/logo.png'
import api from '../services/api'
import AsyncStorage from '@react-native-community/async-storage'

export default function Login ({ navigation }) {

    const [ user, setUser] = useState('')

    useEffect(()=> {
        AsyncStorage.getItem('user').then(user => {
            if(user){
                navigation.navigate('Main', { user })        
            }
        })
    },[])

    async function handleLogin(){
        const response = await api.post('/devs', { username: user })
        const { _id } = response.data
        await AsyncStorage.setItem('user', _id)
        navigation.navigate('Main', { user: _id })
    }

    return (
        <View style={styles.container}>
            <Image source={logo} />

            <TextInput
                autoCapitalize='none' 
                autoCorrect={false}
                placeholder='Digite seu usuário do Github:'
                placeholderTextColor='#999'
                style={styles.input} 
                value={user}
                onChangeText={setUser}
            />

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>
                    Entrar
                </Text>
            </TouchableOpacity> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15
    },
    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#df4723',
        marginTop: 10,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold'
    }
})