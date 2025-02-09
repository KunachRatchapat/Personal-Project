import React from 'react';
import { View,Text,StyleSheet } from 'react-native';

const Total = ({ totalAmount }) => {
    return(
        <View style={style.container}>
            <Text style={style.text}>TotalPrice: {totalAmount}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop:10,
        marginBottom: 5,
    },
    
    text: {
         
    }
})