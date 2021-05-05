import React from 'react';
import { View, Text, StyleSheet, Button, Alert, Image } from 'react-native';

class Info extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            content:props.navigation.state.params.content,
            Family:props.navigation.state.params.Family,
            common_name:props.navigation.state.params.common_name,
            Genus:props.navigation.state.params.Genus,
            scientific_name:props.navigation.state.params.scientific_name,
            img:props.navigation.state.params.img
        }
        console.log(props.navigation.state.params.content)
      }
    

    render() {

        return (

            <View style={styles.container}>
                <Image source={{uri:this.state.img}} style={{ width:350, height: 350 , marginBottom:30}}/>
                <Text><Text style={{fontWeight:'bold'}}>Details </Text> -- {this.state.content}</Text>
                <Text><Text style={{fontWeight:'bold'}}>Family </Text> -- {this.state.Family}</Text>
                <Text><Text style={{fontWeight:'bold'}}>Genus </Text> -- {this.state.Genus}</Text>
                <Text><Text style={{fontWeight:'bold',color:'red'}}>Scientific Name </Text> -- <Text style={{fontStyle:'italic'}}>{this.state.scientific_name}</Text></Text>
                <Text><Text style={{fontWeight:'bold', color:'green'}}>Common Name </Text> -- {this.state.common_name}</Text>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Info