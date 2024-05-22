import React, { useState } from 'react';
import {TextInput, ScrollView, StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import { User } from '../model'
import { config } from '../utils/config'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { Ingredient } from '../model'
import { v4 as uuidv4 } from 'uuid';
import { useIsFocused } from '@react-navigation/native'


interface Props {
    navigation: any,
    route: any,
  }

const ListIngredients: React.FC<Props> = (props) => {

  const isFocused = useIsFocused()
  const AdDelete = () => <AntDesign name="delete" size={25} color="#C70039" />; 
  const Fedit = () => <Feather name="edit" size={25} color="#6499E9" />;
  const [noingredients, setNoingredients] = useState<string>(''); 
  const [ingredientname, setIngredientName] = useState<string>('');
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [firstLoading, SetFirstLoading] = useState<Boolean>(true);

  const getIngredients = () => {
    const headers = {
      'Accept': 'application/json',
      'Authorization': Math.random().toString(36).substr(-8)
    }

    return new Promise((resolve, reject) => {

              try {
                  fetch(`http://${config.apiAddress}:${config.apiPort}/get_userIngredients?userId=${props.route.params.user[0].userId.toLowerCase().trimEnd()}`, { headers })
                  .then(res => res.json())
                  .then(data => {
                    if (data.length === 0) {
                      setNoingredients("No Ingredients, Please Create It")
                      resolve([])
                    }
                    return data
                  })
                  .then((ingredient: any[]) => {         
                    resolve(ingredient)
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

  const deleteIngredient = (ingredientId: string) => {
    const headers = {
      'Accept': 'application/json',
      'Authorization': uuidv4().toString(36).substr(-8)
    }

    return new Promise((resolve, reject) => {

              try {
                  fetch(`http://${config.apiAddress}:${config.apiPort}/delete_userIngredient?ingredientId=${ingredientId}&userId=${props.route.params.user[0].userId.toLowerCase().trimEnd()}`
                  ,{ method: 'DELETE', headers })
                  .then(res => res.json())
                  .then((status) => resolve(status))
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

    if (firstLoading) {
        try {
            getIngredients().then((ingredients: any) => setIngredients(ingredients))
        }
        catch (err: unknown) {
            if (typeof err === "string") {
                console.log(err.toUpperCase())
            } else if (err instanceof Error) {
                console.log(err.message)
            }
        }
        SetFirstLoading(false)
    }
    else {
      SetFirstLoading(true)
    }

    // console.log("ingredients: ", ingredients)
    // console.log("firstLoading: ", firstLoading)

  }, [isFocused]);

  
  return ( 
    <ScrollView>          
      <SafeAreaView style={styles.container}>  
          <View style={styles.searchContainer}>
                <View style={styles.searchLabel}>
                     <Text style={styles.textLabel}>Search:</Text>
                </View>
                <View style={styles.searchInput}>
                    <TextInput
                        maxLength={100}
                        onChangeText={text => setIngredientName(text)}
                        value={ingredientname}
                        style={styles.input}
                    />                    
                </View>
          </View>
          <View>
                <Text style={styles.textLabel}>{noingredients}</Text>
          </View>
          <View  style={styles.resultContainer}>
          {
            ingredients.filter(item => item.ingredientName.toLowerCase().substring(0, ingredientname.length) === ingredientname.toLowerCase())
                        .map(ingredient => 
                    <View key={uuidv4()} style={styles.resultContent}>
                        <View key={uuidv4()} style={styles.ingredientName}>
                            <Text key={uuidv4()}>{ingredient.ingredientName} - {ingredient.ingredientPortion}({ingredient.unitName})</Text>
                        </View>
                        <View key={uuidv4()}  style={styles.ingredientDelete}>
                            <TouchableOpacity key={uuidv4()} onPress={() => deleteIngredient(ingredient.ingredientId)
                                                                                .then(() => getIngredients().then((ingredients: any) => setIngredients(ingredients)))}>
                                <AdDelete key={uuidv4()} />
                            </TouchableOpacity>
                        </View>
                        <View key={uuidv4()}  style={styles.ingredientEdit}> 
                            <TouchableOpacity key={uuidv4()} onPress={() => props.navigation.navigate('CreateIngredient', {userId: props.route.params.user[0].userId,
                                                                                                                           edit: true,
                                                                                                                           ingredient: {
                                                                                                                                        "ingredientId": ingredient.ingredientId,
                                                                                                                                        "userId": props.route.params.user[0].userId,
                                                                                                                                        "unitId": ingredient.unitId,
                                                                                                                                        "ingredientName": ingredient.ingredientName,
                                                                                                                                        "ingredientPortion": ingredient.ingredientPortion,
                                                                                                                                        "ingredientCalorie": ingredient.ingredientCalorie,
                                                                                                                                        "ingredientProtein": ingredient.ingredientProtein,
                                                                                                                                        "ingredientCarbonhydrate": ingredient.ingredientCarbonhydrate,
                                                                                                                                        "ingredientSugar": ingredient.ingredientSugar,
                                                                                                                                        "ingredientFat": ingredient.ingredientFat,
                                                                                                                                        "ingredientSodium": ingredient.ingredientSodium,
                                                                                                                                        "ingredientCalcium": ingredient.ingredientCalcium,
                                                                                                                                        "ingredientCholesterol": ingredient.ingredientCholesterol,
                                                                                                                                        "ingredientFibre": ingredient.ingredientFibre,
                                                                                                                                        "ingredientSaturateFat": ingredient.ingredientSaturateFat,
                                                                                                                                        "ingredientTransFat": ingredient.ingredientTransFat,
                                                                                                                                        "ingredientIron": ingredient.ingredientIron,
                                                                                                                                        "ingredientZinc": ingredient.ingredientZinc,
                                                                                                                                        "ingredientMagnesium": ingredient.ingredientMagnesium,
                                                                                                                                        "ingredientPotasium": ingredient.ingredientPotasium,
                                                                                                                                        "ingredientRemark": ingredient.ingredientRemark,
                                                                                                                                        "updCount": ingredient.updCount,
                                                                                                                                        "createAt": ingredient.createAt
                                                                                                                                    }
                                                                                                                           })}>                    
                                <Fedit key={uuidv4()} />
                            </TouchableOpacity>
                        </View>
                    </View>
            )
          }
          </View>
      </SafeAreaView>
      </ScrollView>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: '#FFF'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%'
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%' 
  },
  searchLabel: {
    width: '20%'
  },
  textLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000"
  },
  searchInput: {
    width: '80%'
  },
  resultContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
  },
  resultContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    margin: 10,
  },
  ingredientName: {
    width: '80%'
  },
  ingredientDelete: {
    width: '10%'
  },
  ingredientEdit: {
    width: '10%'
  }
});

export default ListIngredients;