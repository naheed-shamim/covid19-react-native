

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const CustomButton = props => {

    const { title, onPress } = props

    return (<TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>)
}

const styles = StyleSheet.create({
    container: { backgroundColor: '#0cf', margin: '5%', alignItems: 'center', borderRadius: 10 },
    text: { color: 'white', padding: '5%', fontSize: 18, fontWeight: 'bold' }
})