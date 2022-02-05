import React from 'react'
import { View } from 'react-native'
import MasonryList from '@react-native-seoul/masonry-list';
import ProgressiveImage from './ProgressiveImage';
import Colors from '../constants/Colors';


const TrendingGifs = ({data,loadNext}:any) => {

    const renderItem = (item:any) => {
        const randomBool = Math.random()
        return (
            <View style={{
                height: randomBool < 0.33 ? 140 : randomBool < 0.7 ? 175 : 190,
                backgroundColor: Colors.imageBg,
                borderRadius:10,
                margin:5,
                overflow: 'hidden'
            }}>
            <ProgressiveImage
            style={{ height: randomBool < 0.33 ? 140 : randomBool < 0.7 ? 175 : 190}}
                source={item?.images?.preview_gif?.url}
            />
            </View>
        )
    } 


    return (
      <MasonryList
            data={data}
            keyExtractor={(item:any) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => renderItem(item)}
            contentContainerStyle={{paddingHorizontal:15,}}
            // refreshing={isLoadingNext}
            // onRefresh={() => refetch({first: ITEM_CNT})}
            onEndReachedThreshold={0.1}
            onEndReached={loadNext}
            />
    )
}

export default TrendingGifs
