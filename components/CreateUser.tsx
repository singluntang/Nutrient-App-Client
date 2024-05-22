import React, { useState } from 'react';
import {TextInput, Button, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { User } from '../model'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../utils/config'

interface Props {navigation: any}

const CreateUser: React.FC<Props> = (props) => {

  const [username, SetUserName] = useState<string>('');
  const [password, SetPassword] = useState<string>('');
  const [email, SetEmail] = useState<string>('');
  const [confirmPassword, SetConfirmPassword] = useState<string>('');
  const [loginCreated, SetLoginCreated] = useState<Boolean>(false);
  const [validate, SetValidate] = useState<Boolean>(false);
  const [firstLoading, SetFirstLoading] = useState<Boolean>(true);


  const ValidateFields = async() => {
    if (username !== "" && username !== undefined){
      if (email !== "" && email !== undefined){
        if (password !== "" && password !== undefined){
          if (password === confirmPassword){
              SetValidate(true)
          }
        }
      }
    }
  }

  const SignUp = () => {
    firstLoading && SetFirstLoading(false)
    ValidateFields()
  }

 const onHandleSubmit = () => {
          const headers = {
            'Accept': 'application/json',
            'Authorization': Math.random().toString(36).substr(-8)
          }

          const user: User = {
            "userId": uuidv4(),
            "userName": username.trimEnd(),
            "userEmail": email.trimEnd(),
            "userPassword": password.trimEnd(),
            "userRemark": '',
            "updCount": 0,
            "createAt": Date()
            }    

            return new Promise((resolve, reject) => {
                  try {
                      fetch(`http://${config.apiAddress}:${config.apiPort}/create_user`, {
                        method: 'POST',
                        headers: {
                          ...headers,
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(user)
                      }).then(res => {
                        if (res.status == 201) {
                          resolve(true)
                        }
                        else {
                          resolve(false)
                        }
                      })
                      .then(() => resolve(true))
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

    if (validate && !loginCreated) {
        onHandleSubmit()
        .then((status) => status && SetLoginCreated(true))
    }

  }, [validate]);

  return (
    <SafeAreaView style={styles.container}>
        {
          loginCreated && 
              (<View>
                  <Text style={[styles.textLabel,{color: '#3085C3'}]}>User Successfully Created!</Text>
              </View>)
        }
        {
          (!validate && !firstLoading) && 
              (
                <>
                  <View>
                      <Text style={[styles.textLabel,{color: '#C70039'}]}>Validation Error!</Text>
                  </View>
                  <View>
                      <Text style={[styles.textLabel,{color: '#C70039'}]}>Either Missing Fields or Confirm Password not the same!</Text>
                  </View>
                </>
              )
        }        
        <View style={styles.userContainer}>
              <View style={{width: '30%'}}>
                    <Text style={styles.textLabel}>Username:</Text>
              </View>
              <View style={{width: '70%'}}>
                    <TextInput
                          maxLength={100}
                          onChangeText={text => SetUserName(text)}
                          value={username}
                          style={styles.input}
                        />
              </View>              
        </View>
        <View style={styles.userContainer}>
              <View style={{width: '30%'}}>
                    <Text style={styles.textLabel}>Email:</Text>
              </View>
              <View style={{width: '70%'}}>
                    <TextInput
                          maxLength={100}
                          onChangeText={text => SetEmail(text)}
                          value={email}
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
                                onChangeText={text => SetPassword(text)}
                                value={password}
                                secureTextEntry={true}
                                style={styles.input}
                              />                
              </View>                      
        </View>
        <View style={styles.passwordContainer}>
              <View style={{width: '30%'}}>
                    <Text style={styles.textLabel}>Confirm Password:</Text>                
              </View>  
              <View style={{width: '70%'}}>
                    <TextInput
                                maxLength={30}
                                onChangeText={text => SetConfirmPassword(text)}
                                value={confirmPassword}
                                secureTextEntry={true}
                                style={styles.input}
                              />                
              </View>                      
        </View>
        <View style={styles.buttonContainer}>
              <View style={{width: '25%'}}>
                    <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Login')}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>                                  
              </View> 
              <View style={{width: '25%', marginLeft: 10}}>
                      <TouchableOpacity style={styles.button} disabled={loginCreated ? true : false} onPress={() => SignUp()}>
                          <Text style={styles.buttonText}>Sign Up</Text>
                      </TouchableOpacity>              
              </View>                                 
        </View>
    </SafeAreaView>
  );
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
    color: "#000"
  }
});


export default CreateUser;