import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button,Image } from 'react-native';
import Firebase from '../config/firebaseconfig';
import { ActivityIndicator, Colors } from 'react-native-paper';


class Login extends React.Component {
    state = {
        email: '',
        password: '',
        errormsg:'',
        loading:false
    }

    handleLogin = () => {
        const { email, password } = this.state

        Firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => 
                this.props.navigation.navigate('Profile'),
                this.wait(),
                this.setState({loading:true})
            )
            .catch(error => {
                let err = error.toString().replace('Error: ','')
                this.setState({ errmsg: err })
                //console.log(error.toString().replace('Error: ',''))
            })
    }

    wait = () => {
        setTimeout(() => {
            this.setState({email:''}),
            this.setState({password:''})
            this.setState({loading:false})
          }, 3000);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/Pakshi.jpg')} style={{ width: 200, height: 200 }}/>
                <TextInput
                    style={styles.inputBox}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    placeholder='Email'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    placeholder='Password'
                    secureTextEntry={true}
                />
                <ActivityIndicator animating={this.state.loading} color={Colors.red800} />
                <Text>{this.state.loading?'Loading...':null} </Text>
                <Text style={styles.err}>{this.state.errmsg}</Text>
                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <Button
                    title="Don't have an account yet? Sign up"
                    onPress={() => this.props.navigation.navigate('Signup')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#F6820D',
        borderColor: '#F6820D',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonSignup: {
        fontSize: 12
    },
    err:{
        color:'red',
        marginTop:10,
        fontWeight: 'bold'
    }
})

export default Login