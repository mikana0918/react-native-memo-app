import React from 'react';
import { StyleSheet,
         Text, 
         View,
         TouchableOpacity } from 'react-native';
import { withTheme } from 'react-native-elements';

export default class Note extends React.Component{

  render(){  
    return (
      // <View key={this.props.keyval} style={styles.note}>
      //     <Text style = {styles.noteText}>{this.props.val.date}</Text>
      //     <Text style = {styles.noteText}>{this.props.val.note}</Text>

      //     <TouchableOpacity onPress={this.props.editMethod} style={styles.noteEdit}>
      //       <Text style={styles.noteEditText}>Edit</Text>
      //     </TouchableOpacity>

      //     <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
      //       <Text style={styles.noteDeleteText}>Delete</Text>
      //     </TouchableOpacity>
      // </View>

      <View key={this.props.keyval} style={styles.note}>
            <Text style = {styles.noteText}>{this.props.date}</Text>
            <Text style = {styles.noteText}>{this.props.note}</Text>

            <TouchableOpacity onPress={this.props.editMethod} style={styles.noteEdit}>
              <Text style={styles.noteEditText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
              <Text style={styles.noteDeleteText}>Delete</Text>
            </TouchableOpacity>
      </View>
  );

}
}

const styles = StyleSheet.create({
note: {
    position: 'relative',
    padding:20,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#ededed'
},
noteText: {
    paddingLeft: 20,
    borderLeftWidth: 10,
    borderLeftColor: '#E91E63'
},

noteEdit:{
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    top: 10,
    bottom: 10,
    right: 90
},

noteEditText:{
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#75676b',
    padding: 10,
    top: 10,
    bottom: 10,
    color: 'white'
},

noteDelete:{
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    top: 10,
    bottom: 10,
    right: 30
},
noteDeleteText:{
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2980b9',
    padding: 10,
    top: 10,
    bottom: 10,
    color: 'white'
},
});