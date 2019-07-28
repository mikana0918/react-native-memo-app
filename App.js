import React, {Component} from 'react';
import {Header} from 'react-native-elements'
import { StyleSheet, Text, View,Button, AsyncStorage,TouchableOpacity,TextInput,ScrollView,} from 'react-native';
import axios from 'axios';
import Modal from "react-native-modal";

import Note from './Note';


export default class memoList extends React.Component {
  constructor(props){
    super(props),
    this.state = { 
      noteArray: [],
      noteArrayB: [],
      noteText: '',
      isModalVisible: false,
      theKey:0,
      text: '',
      api:[]
    }
    this.addNote = this.addNote.bind(this)
    this.editNote = this.editNote.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.fetchDBAndUpdate = this.fetchDBAndUpdate.bind(this)
    
  }

//  url_BASE = 'http://localhost:8888/5.7/public/api/notes'
 url_BASE = 'http://localhost:8888/laravel-REST-API/public/api/notes'

 //componentWillMountはライフサイクル内で、これは手動でビューをアップデートしたいとき
fetchDBAndUpdate () {
  axios.get(this.url_BASE)
       .then(res => {
         fetchedData = res.data
         this.setState({api:res.data})            
        
         //2回目以降は呼ばれたらまず初期化する
        this.state.noteArray.length = 0

        //API fetchしたリスト要素をfor文でlength分だけ回す
        for(var i=0;i<this.state.api.length;i++){
          var apiVer = Object.values(this.state.api[i])

          var id = this.state.api[i]['id']
          var note = this.state.api[i]['note']
          var date = this.state.api[i]['date']
         
          //二重になるので別配列へ
          this.state.noteArrayB.push({
            'id' : id,
            'date': date,
            'note': note
            });
            // console.warn(this.state.noteArray)
          this.setState({ noteArray: this.state.noteArrayB})
        }})
       .catch(function(error) {
        console.log('API取得エラー: ' + error.message);
        });
        this.forceUpdate()
 }

  //コンポーネントが準備中の時に、APIの情報をステート[]に入れて表示させる
componentWillMount(){
  axios.get(this.url_BASE)
       .then(res => {
         fetchedData = res.data
         this.setState({api:res.data})            
         console.warn(this.state.api)
        
        //2回目以降は呼ばれたらまず初期化する
        this.state.noteArray.length = 0
        //API fetchしたリスト要素をfor文でlength分だけ回す
        for(var i=0;i<this.state.api.length;i++){
          var apiVer = Object.values(this.state.api[i])

          var id = this.state.api[i]['id']
          var note = this.state.api[i]['note']
          var date = this.state.api[i]['date']
         
          this.state.noteArray.push({
            'id' : id,
            'date': date,
            'note': note
            });
            // console.warn(this.state.noteArray)
          this.setState({ noteArray: this.state.noteArray})
        }})
       .catch(function(error) {
        console.log('API取得エラー: ' + error.message);
        });
        
}


  toggleModal () {
    this.setState({ isModalVisible : !this.state.isModalVisible})
  }

 
  addNote(){
    // if(this.state.noteText)
      var d = new Date();
      axios.post(this.url_BASE, {
        date: d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(),
        note: this.state.noteText
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      
      //DBを取得して画面をリフレッシュ♪
      this.fetchDBAndUpdate ()
     
    }
          
    

  deleteNote(id) {
        //delete the note, then UPDATE DB
        //DELETE    | api/notes/{note}      | notes.destroy
        //キーをアドレスで渡す必要あり
        //keyにデータベース番号
        axios.delete('http://localhost:8888/laravel-REST-API/public/api/notes/'+id, {
           foo: 'bar' 
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      //DBを取得して画面をリフレッシュ♪
      this.fetchDBAndUpdate ()
  }

  editNote(id) {
    //edit the note, then UPDATE DB
    //PUT|PATCH | api/notes/{note}   | notes.update
 
    axios.put('http://localhost:8888/laravel-REST-API/public/api/notes/'+id, 
    {
      note: this.state.text
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    //DBを取得して画面をリフレッシュ♪
    this.fetchDBAndUpdate ()
  }



  //編集後のリターンキーでモーダルをカチカチスイッチングする
    endEditing(){
      if(this.state.text){    
        this.toggleModal()
        this.editNote(id)
      }
  }
 

  render(){
    lists = [];
   
    for(i=0;i<this.state.noteArray.length;i++){
      id = this.state.noteArray[i]['id'],
      note = this.state.noteArray[i]['note'],
      date = this.state.noteArray[i]['date'],

      lists.push(
        <Note key={id} keyval={id} val={id}  note={note} date ={date}
        deleteMethod={()=> this.deleteNote(id)}
        editMethod={()=> {
          this.editNote(id);
          this.toggleModal();
          this.endEditing()
        }} 
        />   );}

    return(
    <View>
      <Header
      centerComponent={{ text: 'Memo', style: {
         color: '#fff',
         flex:0,
         } }}>
      </Header>
      
      <Modal isVisible = {this.state.isModalVisible}
             style = {color = 'white'}>

          <View style={Styles.modalBase}>
            <Text style = {{
              color : 'white',
              fontSize: 16}}>
                Type things you edit</Text>

            <TextInput
              style = {Styles.modalInput}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
              onEndEditing={() => this.endEditing()}> 
            </TextInput>

            <View style = {{flexDirection: 'row', alignItems:'center'}}>
              <Button title="Hide" onPress={this.toggleModal} />
            </View>

          </View>
       </Modal>

        

      <ScrollView style = {Styles.scrollContainer}> 
      {lists}
      {/* {         
        this.state.noteArray.map((val,key) => (
          <Note key={key} keyval={key} val={val} 
          deleteMethod={()=> this.deleteNote(key)}
          editMethod={()=> {this.editNote(key);this.toggleModal();this.endEditing(key)}} 
          />))
      } */}

      {/* {         
                axios.get(this.url_BASE)
                .then(res => {
                  fetchedData = res.data
                  this.setState({api:res.data})            
                  
                  //API fetchしたリスト要素をfor文でlength分だけ回す
                  for(i=0;i<this.state.api.length;i++){
                    <Note key={id} keyval={id} val={id} 
                  deleteMethod={()=> this.deleteNote(id)}
                  editMethod={()=> {this.editNote(id);this.toggleModal();this.endEditing(id)}} 
                  />
                    var apiVer = Object.values(this.state.api[i])

                    var id = this.state.api[i]['id']
                    var note = this.state.api[i]['note']
                    var date = this.state.api[i]['date']
                  
                    this.state.noteArray.push({
                      'id' : id,
                      'date': date,
                      'note': note
                      });
                    this.setState({ noteArray: this.state.noteArray})
                  }})
                .catch(function(error) {
                  console.log('API取得エラー: ' + error.message);
                  })

                  

      } */}

               

          <View key={this.props.keyval} 
                style={Styles.note}>
          {/* <Text style = {Styles.noteText}>{this.props.val.date}</Text> */}
          {/* <Text style = {Styles.noteText}>{this.state.noteText}</Text> */}
          </View>
          
          {/* <TouchableOpacity onPress={this.props.deleteMethod} style={Styles.noteDelete}>
          {/* <Text style={Styles.noteDeleteText}>D</Text>  */}
          {/* </TouchableOpacity> */} 
          
       </ScrollView>

       <View style = {Styles.footer}>

          <TextInput 
          style={Styles.TextInput}
          onChangeText = {(noteText)=> this.setState({noteText})}
          value= {this.state.noteText}
          placeholder='>note'
          placeholderTextColor= 'white'
          underlineColorAndroid = 'transparent'>
          </TextInput>
          
          <TouchableOpacity
          onPress = {this.addNote.bind(this)}
          style = {Styles.addButton}>
          <Text style ={Styles.addButtonText}>+</Text>
          </TouchableOpacity>

        </View>

      </View>
          );    
        }
      }
      
      const Styles = StyleSheet.create({
        TextInput:{
          alignSelf: 'stretch',
          color: '#fff',
          padding: 20,
          backgroundColor: '#252525',
          borderTopWidth: 2,
          borderTopColor: '#ededed',
          bottom: 0,
          justifyContent: 'flex-end',
          position: 'relative'
        },
        addButton: {
          position: 'absolute',
          zIndex: 11,
          right: 20,
          right:20,
          bottom: 20,
          backgroundColor: '#E91E63',
          width: 90,
          height:90,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 8,
        },
        addButtonText:{
          color: '#fff',
          fontSize: 24,
        },
        scrollContainer:{
          bottom:0,
          width: '100%',
          height: '90%',
        },
        footer:{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right:0,
          zIndex: 10,
          justifyContent: 'center', 
          alignItems: 'center',
          justifyContent: 'flex-end'
        },
        modalBase: {
          justifyContent: 'center', 
          alignItems: 'center',
          flex: 1,
          textDecorationColor: 'white',
        },
        modalInput: {
          marginTop: 10,
          color:'white',
          height: '5%',
          fontSize:20,
          width:'90%',
          borderColor: 'white',
          textDecorationColor: 'white'
        }
      })
      
      
      
      