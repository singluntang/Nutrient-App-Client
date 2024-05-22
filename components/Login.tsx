import React, { useState } from 'react';
import {TextInput, Button, StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import { User } from '../model'
import { config } from '../utils/config'
import { useIsFocused } from '@react-navigation/native'


interface Props {navigation: any}

const Login: React.FC<Props> = (props) => {

  const [user, setUser] = useState<User[]>(
        [{
          "userId": '',
          "userName": '',
          "userEmail": '',
          "userPassword": '',
          "userRemark": '',
          "updCount": 0,
          "createAt": Date()
        }]
  );

  const isFocused = useIsFocused();
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [login, setLogin] = useState<Boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const Login = () => {
    const headers = {
      'Accept': 'application/json',
      'Authorization': Math.random().toString(36).substr(-8)
    }

    return new Promise((resolve, reject) => {

              let loginUser: User = {
                                        "userId": '',
                                        "userName": '',
                                        "userEmail": '',
                                        "userPassword": '',
                                        "userRemark": '',
                                        "updCount": 0,
                                        "createAt": Date()
                                      }
              try {
                  fetch(`http://${config.apiAddress}:${config.apiPort}/get_user?username=${username.toLowerCase().trimEnd()}&password=${password.toLowerCase().trimEnd()}`, { headers })
                  .then(res => res.json())
                  .then(data => {
                    if (data.length === 0) {
                      setErrorMsg("User does not Exists!")
                      resolve([])
                    }
                    return data
                  })
                  .then((user: User[]) => {         
                    resolve(user)
                  })
                  // .then(() => resolve(true))
              }
              catch (err: unknown) {
                    if (typeof err === "string") {
                      console.log(err.toUpperCase())
                    } else if (err instanceof Error) {
                      console.log(err.message)
                    }
                }
      })
  }

  React.useEffect(() => {

    // console.log("Login User is: ", user)

  });

  
  return (           
      <SafeAreaView style={styles.container}>  
                {
                  (!login) && 
                      (<View>
                          <Text style={[styles.textLabel,{color: '#C70039'}]}>{errorMsg}</Text>
                      </View>)
                }
                <View style={styles.userContainer}>
                      <View style={{width: '30%'}}>
                            <Text style={styles.textLabel}>Username:</Text>
                      </View>
                      <View style={{width: '70%'}}>
                            <TextInput
                                  maxLength={100}
                                  onChangeText={text => setUserName(text)}
                                  value={username}
                                  style={styles.input}
                                />
                      </View>              
                </View>
                <View style={styles.passwordContainer}>
                      <View style={{width: '30%'}}>
                            <Text style={styles.textLabel}>Password:</Text>                
                      </View>  
                      <View style={{width: '70%'}}>
                            <TextInput
                                        maxLength={30}
                                        onChangeText={text => setPassword(text)}
                                        value={password}
                                        secureTextEntry={true}
                                        style={styles.input}
                                      />                
                      </View>                      
                </View>
                <View style={styles.buttonContainer}>
                      <View style={{width: '25%'}}>
                          <TouchableOpacity style={styles.button}                                   
                                  onPress={() => {
                                    Login()
                                    .then((user: any) => ((user.length > 0) ? props.navigation.navigate('Dashboard',{user: user})  :  setLogin(false)))                                      
                                   }}>
                              <Text style={styles.buttonText}>Log In</Text>
                          </TouchableOpacity> 
                      </View> 
                      <View style={{width: '25%', marginLeft: 10}}>
                          <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('CreateUser')}>
                              <Text style={styles.buttonText}>Sign Up</Text>
                          </TouchableOpacity>                                     
                      </View>                                 
                </View>
      </SafeAreaView>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#FFF'
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  }, 
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  }, 
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '80%',
  },
  textLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6499E9',
    padding: 10,
    borderRadius: 10,    
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFF"
  }
});

export default Login;