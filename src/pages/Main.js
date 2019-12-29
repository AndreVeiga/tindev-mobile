import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import logo from '../assets/logo.png'
import like from '../assets/like.png'
import dislike from '../assets/dislike.png'
import api from '../services/api'
import AsyncStorage from '@react-native-community/async-storage'

export default function Main({ navigation }) {
    const id = navigation.getParam('user')
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: { user: id }
            })
            setUsers(response.data)
        }
        loadUsers()
    }, [id])

    function handleEmpty() {
        return (
            <Text style={styles.empty}>Acabou :( </Text>
        )
    }

    function handleDislike(){

    }

    async function handleLike(id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: id }
        })
    }

    function handleUsers() {
        return (
            <>
                {users.map((user, index) => (
                    <View key={user._id} style={[styles.card], { zIndex: users.length - index }}>
                        {console.log(user.avatar)}
                        <Image style={styles.avatar} source={{ uri: user.avatar }} />
                        <View style={styles.footer}>
                            <Text style={styles.name}>{user.name}</Text>
                            <Text style={styles.bio} numberOfLines={3} >
                                {user.bio}
                            </Text>
                        </View>
                    </View>
                ))}
            </>
        )
    }

    async function handleLogout(){
        await AsyncStorage.clear()
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image source={logo} style={styles.logo} />
            </TouchableOpacity>
            <View style={styles.cardContainer}>
                {users.length ? handleUsers() : handleEmpty()}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Image source={dislike} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Image source={like} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500
    },
    card: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    footer: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
        lineHeight: 18
    },
    avatar: {
        flex: 1,
        height: 300
    },
    logo: {
        marginTop: 30
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 30
    },

    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2
    },
    empty: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#999'
    }
})