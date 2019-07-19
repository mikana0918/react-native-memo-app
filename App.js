import React, {Component} from 'react';
import { ListItem,
         Header,
         FormLabel, 
         FormInput, 
         FormValidationMessage } from 'react-native-elements'
import { 
  StyleSheet, 
  Text, 
  View,
  Button, 
  Dimensions,
  AsyncStorage
  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import { TextInput } from 'react-native-gesture-handler';
import Toast, {DURATION} from 'react-native-easy-toast'
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import Storage from 'react-native-storage';
import { apisAreAvailable } from 'expo';

const storage = new Storage({
  storageBackend: AsyncStorage
})

const retrieveData = async str => {
  try {
    const value = await AsyncStorage.getItem(str)
    if (value !== null) {
      return value
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}

// const storeData = async (key, value) => {
//   try {
//     await AsyncStorage.setItem(key, value)
//   } catch (error) {

//   }
// }
//ページクラス①
class memoList extends React.Component {
  static navigationOptions = {
    header: null,
    };
  constructor(props){
    super(props),
    this.state = {
     title: '',
     body: '',
     list: [
        {
        name: 'tomorrow',
        avatar_url: 'https://static.thenounproject.com/png/177447-200.png',
        subtitle: 'will be good'
        },
        {
        name: 'today',
        avatar_url: 'https://static.thenounproject.com/png/177447-200.png',
        subtitle: 'is sunny'
        },
        {
          name: 'yesterday',
          avatar_url: 'https://static.thenounproject.com/png/177447-200.png',
          subtitle: 'ahhhh'
        },
        {
          name: 'yesterday',
          avatar_url: 'https://static.thenounproject.com/png/177447-200.png',
          subtitle: 'ahhhh'
        },
           ],
     some: ''
    }
  }
  
//propか関数を渡す
  componentDidMount = () => {
    // this.setInitialState()    
   
  }

  setInitialState = async () => {
    const initialState = await retrieveData('addMemo')
    if (initialState) {
      const parsedState = await JSON.parse(initialState)
      parsedState.forEach(function(value){

      })
      this.setState(parsedState)
    }
  }
  
  render(){
    // console.warn(list)
    return(
    <View
      style = {StyleSheet.listContainer}>
      <Header
      centerComponent={{ text: 'Memo', style: { color: '#fff' } }}
      rightComponent={{ 
        icon: 'home', 
        color: '#fff',
        onPress: () => this.props.navigation.navigate('addMemo')
        }}
      />
      
      {
        
        this.state.list.map((l, i) => (
          <ListItem
          extraData
            key={i}
            leftAvatar={{ source: { uri: 'https://static.thenounproject.com/png/177447-200.png' } }}
            title={l.name}
            subtitle={l.subtitle}
          />
        ))
      }   
        
  </View>
    );
  }
}

//ページクラス②
class addMemo extends React.Component {
  static navigationOptions = {
  header: null,
  };
  constructor(props){
    super(props);
    obj = new memoList();
    this.state = {
      title:'',
      body: ''
    };
  }

  callAddMEMO = () => {
    obj.componentDidMount()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state !== prevState) {
     storage.save({
      key: 'addMemo',
      data: {
        title: this.state.title,
        body: this.state.body,
      }
     }) 
    }
  }
  

render(){
  return(
    <View>
      <Header
        centerComponent={{ text: 'Create New Memo', style: { color: '#fff' } }}
        leftComponent={{ 
          icon: 'home', 
          color: '#fff',
          onPress: () => this.props.navigation.navigate('Home')
          }}
        rightComponent={{
          icon: 'save', 
          color: '#fff',
          onPress: () => {this.props.navigation.navigate('Home', {Note:{title:this.state.title, body:this.state.body}})

}}} />   

            <TextInput
            placeholder='Title'
            onChangeText={(title) => this.setState({title})}
           // value= {text}
            style =  {{
            marginTop: 250,
            marginLeft: 20,
            marginRight: 20,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 50,}}></TextInput>

            <TextInput
            placeholder='Body'
            onChangeText={(body) => this.setState({body})}
           // value= {text}
            style =  {{
            marginLeft: 20,
            marginRight: 20,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 50,}}></TextInput>

         
    </View>
  )}}

//まとめクラス
export default class App extends React.Component {
  //入力したテキストをどこで管理するか、、
  constructor(props){
    super(props)
    //initialize state
    this.state = {}
  }

  render() {
    return <AppContainer />;
  }}

//navigatorのconfig
const RootStack = createStackNavigator(
  {
    Home: memoList,
    addMemo: addMemo,
  },
  { 
    transitionConfig: () => {
      return {
        transitionSpec: {
          duration: 500
        }
      };
    },
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);


