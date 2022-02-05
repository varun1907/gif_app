import { StyleSheet, TextInput, TouchableOpacity, FlatList, StatusBar, ActivityIndicator } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Colors from '../constants/Colors';
import { useState, useRef, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { endpoints, API_KEY } from '../constants/endpoints';
import TrendingSearchTerms from '../components/TrendingSearchTerms';
import TrendingGifs from '../components/TrendingGifs';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [searchString,setsearchString] = useState('')
  const [focussed,setfocussed] = useState(false)
  const [data, setdata] = useState([])
  const [trendingSearch, settrendingSearch] = useState([])
  const [selectedTrending,setselectedTrending] = useState('')
  const [refreshing,setrefreshing] = useState(false)
  const [page,setpage] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    getTrendingSeachTerms().then((data) => {
      settrendingSearch(data.slice(0,10))
    }).catch(err => console.log(err))

    getGifsFromApiAsync(false,false)  
  }, [])

  const refresh = () => {
    setrefreshing(true)
    setpage(0)
    getGifsFromApiAsync(searchString ? true : false,false,true)
  }
  useEffect(() => {
    if(page > 0 && !refreshing){
      setrefreshing(true)
      getGifsFromApiAsync(searchString?true:false,true)
    }
    
  }, [page])
  const objectToQueryString = (obj:any) => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }
  const getTrendingSeachTerms = async () => {
    const finalEndpoint=`${endpoints.trending_search}?api_key=${API_KEY}`
    console.log(finalEndpoint)
    try {
      const response = await fetch(finalEndpoint);
      const json = await response.json();
      return json.data;
    } catch (error) {
      console.error(error);
    }
  };
  const getGifsFromApiAsync = async (from_search=false,append:boolean,initial_search=false,query='') => {
    const params = {
      api_key:API_KEY,
      q:query ? query : searchString,
      limit:20,
      lang:'en',
      offset:initial_search ? 0 : page*20
    }
    const serializedResult  = objectToQueryString(params)
    const finalEndpoint=`${from_search ? endpoints.search : endpoints.trending}?${serializedResult}`
    console.log(finalEndpoint)
    try {
      const response = await fetch(finalEndpoint);
      const json = await response.json();
      const jsonData = json.data
      setrefreshing(false)
      if(append){
        let tempData=[...data,...jsonData]
        console.log('--->>>',from_search,tempData)
        setdata(tempData)
      }else{
        setdata(jsonData)
      }

     
      return json.data;
    } catch (error) {
      console.error(error);
    }
  };
  const renderItem = ({ item,index }) => (
    <TrendingSearchTerms 
    key={index} 
    trendingTerms={item} 
    isSelected={selectedTrending === item}  
    onPress={() => {
      if(item === selectedTrending){
        setselectedTrending('')
      }else{
        setsearchString(item)
        inputRef.current?.blur();
        setselectedTrending(item)
        getGifsFromApiAsync(true,false,true,item)
      }
    }}
  />
  );
  return (
    <View style={styles.container}>
      <View style={[styles.header,{marginTop:StatusBar.currentHeight}]}>
        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            onChangeText={(text) => {
              setsearchString(text)
              setselectedTrending('')
            }}
            value={searchString}
            placeholder="Searh GIFs"
            onSubmitEditing={refresh}
            placeholderTextColor={Colors.white}
            onFocus={() => setfocussed(true)}
            onBlur={() => setfocussed(false)}
          />

          {!focussed && <MaterialCommunityIcons name="dots-vertical" size={24} color={Colors.white} />}
        </View>
          {focussed && <TouchableOpacity style={{paddingRight:10}} onPress={() => {
            // setsearchString('')
            inputRef.current?.blur()
            setfocussed(false)
          }}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>}
      </View>
      <>
      <Text style={styles.heading}>Trending Search</Text>
      <FlatList 
        data={trendingSearch}
        horizontal
        style={{maxHeight:50}}
        contentContainerStyle={{paddingHorizontal:20}}
        keyExtractor={item => item}
        renderItem={renderItem}
      />
      
      </>
      {refreshing &&  <ActivityIndicator size="small" color="#0000ff" />}
      {!focussed && <>
        <Text style={styles.heading}>{searchString ? '' : 'Trending'}</Text>
      <TrendingGifs 
        data={data}   
        loadNext={() => {
        if(!refreshing)
        setpage(prev => prev+1)
      }} />
      </>
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  header:{
    height:80,
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:Colors.headerBg,
    marginTop:20
  },
  inputContainer:{
    height:60,
    marginHorizontal:15,
    flexDirection:'row',
    alignItems:'center',
    flex:1,
    paddingVertical:10,
    backgroundColor:Colors.white_rgba(0.3),
  },
  input:{
    height: 40,
    margin: 12,
    padding: 10,
    fontWeight:'bold',
    color:Colors.white,
    fontSize:20,
    flex:0.98
  },
  cancelText:{
    fontWeight:'400',
    color:Colors.white,
    fontSize:15,
  },
  trendingContainer:{
    flexDirection:'row',
    flexWrap:'wrap',
    paddingHorizontal:20
  },
  heading:{
    color:Colors.black,
    fontSize:20,
    fontWeight:'bold',
    paddingHorizontal:20,
    marginVertical:10
  }
});
