import React, {Component} from 'react';
import { ListItem,
  Header,
  FormLabel, 
  FormInput, 
  FormValidationMessage,
} from 'react-native-elements'
import { 
  StyleSheet, 
  Text, 
  View,
  Button, 
  AsyncStorage,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

import Note from './Note';
import Modal from "react-native-modal";

export default class memoList extends React.Component {
  constructor(props){
    super(props),
    this.state = { 
      noteArray: [],
      noteText: '',
      isModalVisible: false,
      theKey:0,
      text: ''
    }
    this.addNote = this.addNote.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    
  }

  toggleModal () {
    this.setState({ isModalVisible : !this.state.isModalVisible})
  }


  addNote(){
    if(this.state.noteText){
      var d = new Date();
      this.state.noteArray.push({
        'date': d.getFullYear() + 
        "/" + (d.getMonth() + 1) + 
        "/" + d.getDate(),
        'note': this.state.noteText
      });
      this.setState({ noteArray: this.state.noteArray})
      this.setState({ noteText: ''});
    }
    }

  deleteNote(key) {
    this.state.noteArray.splice(key, 1);
    this.setState({ noteArray: this.state.noteArray})
  }

  editNote(key) {
    this.setState({theKey: key})
  }


  endEditing(key){
    
      if(this.state.text){    
      var d = new Date();
      this.state.noteArray[this.state.theKey]=({
        'date': d.getFullYear() + 
        "/" + (d.getMonth() + 1) + 
        "/" + d.getDate(),
        'note': this.state.text
        });
        this.setState({ noteArray: this.state.noteArray})
        this.setState({ text: ''});
      }
  }
 

  render(){
 
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
              onEndEditing={() => this.endEditing()}></TextInput>


            <View style = {{flexDirection: 'row', alignItems:'center'}}>
              {/* <Button title="Edit" onPress={
                // this.state.noteArray[0].push({
                //   'note': this.state.text
                // })
                 this.editNote
                } /> */}
              <Button title="Hide" onPress={this.toggleModal} />
            </View>

          </View>
       </Modal>

        

      <ScrollView style = {Styles.scrollContainer}> 
      {         
        this.state.noteArray.map((val,key) => (
          <Note key={key} keyval={key} val={val} 
          deleteMethod={()=> this.deleteNote(key)}
          editMethod={()=> {this.editNote(key);this.toggleModal();this.endEditing(key)}} 
          />
          ))
      }
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
      
      
      
      