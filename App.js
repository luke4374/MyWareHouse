import React, { Component } from 'react'
import { Text, View ,FlatList, Button, Image, StyleSheet} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Stack = createStackNavigator();
const SettingsStack = createStackNavigator();

class Home extends React.Component {
  constructor(props){
    super(props)
    this.max=4
    this.state={data:[],albums:[]}
}

componentDidMount(){
    fetch("http://www.cjlly.com:3041/record",{method:"GET"})
    .then(resp=>resp.json())
    .then(albums=>{
        this.setState({albums:albums})
    })
}

_goDetails=()=>{
  this.props.navigation.navigate("Details")
}

_del=id=>{
  let data=this.state.albums.splice(0)
  let index=data.findIndex(album=>album.id===id)
  data.splice(index,1)
  this.setState({albums:data})
}

_renderItem=({item})=>{
    return (
        <View style={style.container}>
          <TouchableOpacity style={style.container} onPress={this._goDetails}>
            <View style={style.Lone}>
              <Text style={{color:'red',fontSize:20}}>{item.id}</Text>
            </View>
            <View>
              <Image style={style.Ltwo} source={{uri:item.img}} />
            </View>
            <View style={style.Rthree}>
              <Text style={style.Rthree}>{item.name}</Text>
            </View>
            </TouchableOpacity>   
            <View style={style.Rfour}>
            <Button title="删除" onPress={()=>this._del(item.id)}/>
            </View>
        </View>
    )
}

_ItemSeparatorComponent=()=>{
  return <View style={{height:1,backgroundColor:"gray"}}></View>
}
_refresh=()=>{
    let d=Math.floor(Math.random()*100+100)
    let data=this.state.data.splice(0)
    data.unshift(d)
    this.setState({data:data})
}
_reachEnd=()=>{
    let data=this.state.data.splice(0)
    data.push(++this.max)
    this.setState({data:data})
}
  render() {
    return (
      <View>
      <FlatList
          keyExtractor={({item,index})=>index}
          ItemSeparatorComponent={this._ItemSeparatorComponent}
          data={this.state.albums} 
          renderItem={this._renderItem}
          refreshing={false}
          onRefresh={this._refresh}
          onEndReached={this._reachEnd}
          onEndReachedThreshold={0.2}
      />
      </View>
    )

  }
}
class Details extends React.Component{
  render(){
    return (
      <SettingsStack.Navigator initialRouteName="详情">
        <SettingsStack.Screen name="BlueTooth" component={BlueTooth}/>
        <Stack.Screen name="流行音乐排行榜" component={Home}/>
      </SettingsStack.Navigator>
    )
  }
}


export default class App extends Component {

  componentDidMount(){
    console.disableYellowBox = true;
  }

    render() {
        return (
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="流行音乐排行榜" component={Home}/>
                <Stack.Screen name="详情" component={Details}/>
              </Stack.Navigator>
            </NavigationContainer>

        )
    }
    
}

const style = StyleSheet.create({
    container:{
      flexDirection:"row",
      margin:3,
      width:'100%'
    },
    Lone:{
      width:25,
      height:70,
      flexDirection:'row'
    },
    Ltwo:{
      flexDirection:'column',
      width:80,
      height:80
    },
    Rthree:{
      flexDirection:'row',
      width:'60%',
      height:80,
      justifyContent:'center',
      alignSelf:'center',
      fontSize:16,
      textAlign:"center",
      textAlignVertical:'center'
    },
    Rfour:{
      alignSelf:'center',
      height:30,
      flexDirection:'row-reverse'
    }
})