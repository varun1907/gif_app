import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors'

const TrendingSearchTerms = ({trendingTerms,isSelected,onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container,{backgroundColor:isSelected?Colors.headerBg:Colors.gray}]}>
            <Text style={{color:isSelected?Colors.white:Colors.black}}>{trendingTerms}</Text>
        </TouchableOpacity>
    )
}

export default TrendingSearchTerms

const styles = StyleSheet.create({
    container:{
       paddingHorizontal:10,
       height:30,
       borderRadius:10,
       justifyContent:'center',
       alignItems:'center',
       marginRight:5,
       marginVertical:5
    }
})
