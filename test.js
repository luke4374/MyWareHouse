import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Button, Text } from 'react-native'

const Stack = createStackNavigator()
const SettingsStack = createStackNavigator()

class Home extends React.Component {

  _goSettings = () => {
    
    this.props.navigation.navigate("Settings" )
  }
  render() {
    return (
      <View>
        <Text style={{ fontSize: 22, color: 'red' }}>Home!!!</Text>
        <Button onPress={this._goSettings} title="go settings" />
      </View>
    )

  }
}

class Settings extends React.Component {
  render() {
    return (
      <SettingsStack.Navigator initialRouteName="BlueTooth">
        <SettingsStack.Screen name="Wifi" component={Wifi} />
        <SettingsStack.Screen name="BlueTooth" component={BlueTooth} />
      </SettingsStack.Navigator>
    )
  }
}
class Wifi extends React.Component {
  render() {
    return (
      <View>
        <Text>Wifi：{this.props.route.params.uname}</Text>
        <Button onPress={()=>this.props.navigation.navigate("BlueTooth")} 
        title="go blueTooth" />
      </View>
    )
  }
}
class BlueTooth extends React.Component {
  render() {
    return <Text>BlueTooth</Text>
  }
}


export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
