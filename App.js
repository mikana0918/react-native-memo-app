import React, {Component} from 'react';
import { ListItem,
         Header } from 'react-native-elements'
import { 
  StyleSheet, 
  Text, 
  View,
  Button, 
  Dimensions,
  AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import { TextInput } from 'react-native-gesture-handler';

//list[]のセッター
function listSetter (name, subtitle) {
  list.push 
  (
    {
      name,
      subtitle,
    }
  )
};

//【TODO】recycler viewの実装
//listの中でlistItemをRecycler Viewで回す
const list = [
  {
    name: 'yesterday',
    avatar_url: 'https://static.thenounproject.com/png/177447-200.png',
    subtitle: 'all my trouble seems so far away'
  },
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
]



//ページクラス①
class memoList extends React.Component {
  //navのヘッダー非表示
  static navigationOptions = {
    header: null,
    };
constructor(props){
  super(props),
  this.state = {
  }
  getData = async () => {

    try{
      const value = await AsyncStorage.getItem('title','body');
      if(value !== null){
        listSetter(title.value,body.value)
      }else{
        Alert.alert('no data fetched');
      }
    }catch(error){
      console.log(error);
    }

  }

}

  render(){
    return(
      //ホーム画面ヘッダー
      <View
      style = {StyleSheet.listContainer}>
      <Header
      //leftComponent={{ icon: 'menu', color: '#fff' }}
      centerComponent={{ text: 'Memo', style: { color: '#fff' } }}
      rightComponent={{ 
        icon: 'home', 
        color: '#fff',
        onPress: () => this.props.navigation.navigate('addMemo')
        }}
      />
      {
        list.map((l, i) => (
          <ListItem
            key={i}
            leftAvatar={{ source: { uri: l.avatar_url } }}
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
  //navのヘッダー非表示
  static navigationOptions = {
  header: null,
  };

  //【TODO】これをローカルに保存したい
  constructor(props){
    super(props)
    this.state = {
      title: '',
      value: '',
      body: ''
    }
    //アロー関数使っていないので
    this._storeData = this._storeData.bind(this)
    
  };

  async storeItem([key, item],[key,item]) {
    try {
        //we want to wait for the Promise returned by AsyncStorage.setItem()
        //to be resolved to the actual value before returning the value
        var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
        return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  }
//データの保存をする
  // 【理想】onChangeテキストが変更されたら、右上に完了テキストが表示され、プッシュでTOPに表示されるようにしたい
  //　【現実】謎のUIと実装
    render(){
      return(
        <View>
          <Header
            //rightComponent={{ icon: 'done', color: '#fff' }}
            centerComponent={{ text: 'Create New Memo', style: { color: '#fff' } }}
            leftComponent={{ 
              icon: 'home', 
              color: '#fff',
              onPress: () => this.props.navigation.navigate('Home')
              }}
            />

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

            <Button
              title="Save"
              type="outline"
              //タイトルとボディをデータベースへ渡す
              onPress= {
                () => this._storeData(['title','{title}'],['body','{body}'])
              }
            />
            
        </View>
        
      );

  }
  }

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

  //ページ追加後、エラー
const RootStack = createStackNavigator(
  {
    Home: memoList,
    addMemo: addMemo,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);


