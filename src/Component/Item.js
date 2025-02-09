import React from "react";
import {View , Text,StyleSheet,TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const Item = ({name,price,onDelete}) => {
    return(
        <View style={Style.Item}>
            <View style={Styles.ItemHeader}>
            <Text style={Styles.name}>{name}</Text>
            <TouchableOpacity onPress={onDelete} style={Styles.IconContainer}>
                <Icon name="trash-can" size={22} color="gray"/>

            </TouchableOpacity>
        </View>
        <Text style={Styles.price}>{price}</Text>
    </View>
    );
};

const Styles = StyleSheet.create({
    Item: {
        backgroundColor:'white',
        padding:20,
        margin:10,
        borderRadius:10,
        shadowColor:'#000',
        shadowOffset:{width: 0,height: 2},
        shadowOpacity:0.2,
        shadowRadius:4,
        elevation:2,

    },

    ItemHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },

    name:{
        fontSize:18,
        fontWeight:'bold',
        marginBottom:10,
    },

    price:{
        fontSize:18,
        fontWeight:'bold',
        marginBottom:10,
    },

    IconContainer:{
        marginTop:20,
    },
});

export default Item;