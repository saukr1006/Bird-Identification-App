import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button,ActivityIndicator, Colors } from 'react-native-paper';
import firebase from '../config/firebaseconfig';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';


class Profile extends React.Component {

    state = {
        image_src: '',
        title: 'bird image',
        content: '',
        final_result: '',
        prob: '',
        Family: '',
        scientific_name: '',
        img: '',
        Genus: '',
        common_name: '',
        loading:false
    }

    handleSignout = () => {
        firebase.auth().signOut()
        this.props.navigation.navigate('Login')
    }

    // deleteUser = () => {
    //     var user = Firebase.auth().currentUser;
    //     user.delete().then(() => {
    //         this.props.navigation.navigate('Login')
    //     }).catch(function (error) {
    //         console.log('this is the error')
    //     });
    // }

    onClickImagePress = async () => {                        // Function for image capture from camera and prediction
        let result = await ImagePicker.launchCameraAsync();
        this.setState({ loading: true })
        this.setState({ prob: '' })
        if (!result.cancelled) {
            let localUri = result.uri;
            let filename = localUri.split('/').pop();
            const base64 = await FileSystem.readAsStringAsync(localUri, { encoding: 'base64' });

            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            let form_data = new FormData();

            form_data.append('title', this.state.title);
            form_data.append('content', base64);
            this.setState({ image_src: result.uri })
            let url = 'http://192.168.1.103/api/posts/';        //// Change the IP to with your own IP address
            await axios.post(url, form_data, {
                headers: {
                    'content_type': 'multipart/form-data'
                }
            })
                .then(res => {
                    this.setState({ final_result: res.data.bird_name })
                    const probability = 'Probability - ' + res.data.probability.toString().slice(0, 4) + '%';
                    this.setState({ prob: res.data.probability })
                    console.log(res.data);
                })
                .catch(err => console.log(err))
        }
    }

    onChooseImagePress = async () => {          // Function for selecting image from gallery and prediction

        let result = await ImagePicker.launchImageLibraryAsync();
        this.setState({ loading: true })
        this.setState({ prob: '' })
        if (!result.cancelled) {
            let localUri = result.uri;
            let form_data = new FormData();
            let url = 'http://192.168.1.103/api/posts/';   // Change the IP to with your own IP address

            const base64 = await FileSystem.readAsStringAsync(localUri, { encoding: 'base64' });
            
            form_data.append('title', this.state.title);
            form_data.append('content', base64);
            
            this.setState({ image_src: result.uri })
            
            await axios.post(url, form_data, {
                headers: {
                    'content_type': 'multipart/form-data'
                }
            })
                .then(res => {
                    this.setState({ final_result: res.data.bird_name })
                    this.setState({ loading: false })
                    const probability = 'Probability - ' + res.data.probability.toString().slice(0, 4) + '%';
                    this.setState({ prob: probability });
                    this.setState({ content: res.data.bird_details.content })
                    this.setState({ Family: res.data.bird_details.Family })
                    this.setState({ Genus: res.data.bird_details.Genus })
                    this.setState({ common_name: res.data.bird_details.common_name })
                    this.setState({ img: res.data.bird_details.image })
                    this.setState({ scientific_name: res.data.bird_details.scientific_name })
                })
                .catch(err => console.log(err))

        }
    }

    information = () => {
        this.props.navigation.navigate('Info', {
            content: this.state.content,
            Family: this.state.Family,
            common_name: this.state.common_name,
            Genus: this.state.Genus,
            img: this.state.img,
            scientific_name: this.state.scientific_name
        })
        this.setState({ final_result: '' })
        this.setState({ prob: '' })
        this.setState({ image_src: '' })
    }


    render() {
        return (
            <View style={styles.container}>
                {this.state.image_src == '' ? <Image source={require('../assets/test1.jpeg')} style={{ width: 400, height: 400 }} /> :
                    <Image source={{ uri: this.state.image_src }} style={{ width: 400, height: 400 }} />}
                <View style={styles.button}>
                    <View style={styles.buttontext}>
                        <Button icon="camera" mode="contained" onPress={this.onClickImagePress} >
                            Capture
                        </Button>
                    </View>
                    <View style={styles.buttontext}>
                        <Button icon="camera" mode="contained" onPress={this.onChooseImagePress} >
                            Gallery
                        </Button>
                    </View>
                    <View style={styles.buttontext}>
                        <Button mode="contained" onPress={this.handleSignout} >
                            Logout
                        </Button>
                    </View>

                </View>

                <ActivityIndicator animating={this.state.loading} color={Colors.red800} />

                <Text style={styles.answer1}>{this.state.final_result}</Text>
                <Text style={styles.answer2}>{this.state.prob}</Text>

                {this.state.prob == '' ? null : <Button title="Get More Info" onPress={this.information} >Get More Info</Button>}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    button: {
        flexDirection: 'row',
        padding: 10,
        justifyContent:'space-around'
    },
    buttontext: {
        marginHorizontal: 10
    },
    answer1: {
        fontWeight: 'bold',
        fontSize: 30
    },
    answer2: {
        fontWeight: 'bold',
        fontSize: 20
    }
})

export default Profile