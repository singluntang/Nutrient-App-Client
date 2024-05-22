import React, { useState } from 'react';
import {TextInput, ScrollView, StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import { config } from '../utils/config'
import { v4 as uuidv4 } from 'uuid';
import { useIsFocused } from '@react-navigation/native'
import { Menu } from '../model/index'
import Entypo from 'react-native-vector-icons/Entypo';


interface Props {
    navigation: any,
    route: any,
  }

const ListMenus: React.FC<Props> = (props) => {

  const eEdit = <Entypo name="cross" size={25} color="#FFFFFF" />;

  const isFocused = useIsFocused()
  const [menu, setMenu] = useState<Menu[]>([]);
  const [menuname, setMenuName] = useState<string>('');
  const [nodata, setNoData] = useState<string>(''); 
  const [summerizeduseringredients, setSummerizedUserIngredients] = useState<any[]>([]);
  const [firstLoading, SetFirstLoading] = useState<Boolean>(true);

  const getSummerizedUserIngredients = async () => {
    const headers = {
      'Accept': 'application/json',
      'Authorization': Math.random().toString(36).substr(-8)
    }

    return new Promise((resolve, reject) => {

              try {
                fetch(`http://${config.apiAddress}:${config.apiPort}/get_summerizeduserIngredients?userId=${props.route.params.userId.toLowerCase().trimEnd()}`, { headers })
                  .then(res => res.json())
                  .then(data => {
                    if (data.length === 0) {
                      setNoData("No Data, Please Create It")
                      resolve([])
                    }
                    return data
                  })
                  .then((summerizedmenuingredient: any[]) => {         
                    resolve(summerizedmenuingredient)
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

  const getMenu = async (menuId: string) => {
    const headers = {
      'Accept': 'application/json',
      'Authorization': Math.random().toString(36).substr(-8)
    }

    return new Promise((resolve, reject) => {

              try {
                fetch(`http://${config.apiAddress}:${config.apiPort}/get_menu?userId=${props.route.params.userId.toLowerCase().trimEnd()}&menuId=${menuId}`, { headers })
                  .then(res => res.json())
                  .then(data => {
                    if (data.length === 0) {
                      setNoData("No Data, Please Create It")
                      resolve([])
                    }
                    return data
                  })
                  .then((menu: any[]) => {         
                    resolve(menu)
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


  const deleteUserIngredientMenu = (menuId: string) => {
    const headers = {
      'Accept': 'application/json',
      'Authorization': uuidv4().toString(36).substr(-8)
    }

    return new Promise((resolve, reject) => {

              try {
                  fetch(`http://${config.apiAddress}:${config.apiPort}/delete_UserMenuIngredient?menuId=${menuId}&userId=${props.route.params.userId.toLowerCase().trimEnd()}`
                  ,{ method: 'DELETE', headers })
                  .then(res => res.json())
                  .then((status) => resolve(true))
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
            getSummerizedUserIngredients().then((summerizedmenuingredient: any) => setSummerizedUserIngredients(summerizedmenuingredient))
        }     
        catch (err: unknown) {
            if (typeof err === "string") {
                console.log(err.toUpperCase())
            } else if (err instanceof Error) {
                console.log(err.message)
            }
        } 
        // console.log("first loading: ", firstLoading)
        SetFirstLoading(false)
    }
    else {
      SetFirstLoading(true)
    }

    // console.log("summerizeduseringredients: ", summerizeduseringredients)
    // console.log("firstLoading: ", firstLoading)
  },[isFocused]);

  
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
                        onChangeText={text => setMenuName(text)}
                        value={menuname}
                        style={styles.input}
                    />                    
                </View>
          </View>
          <View>
                <Text style={styles.textLabel}>{nodata}</Text>
          </View>
              {
                  summerizeduseringredients.filter(item => item.menuName.toLowerCase().substring(0, menuname.length) === menuname.toLowerCase())               
                    .map(item => 
                        <View key={uuidv4()} style={styles.menuIngredientContainer}>
                              <View key={uuidv4()}  style={{width: "95%", backgroundColor: "#C70039", borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
                                  <View style={styles.header}>
                                      <View style={{width: "87%"}}>
                                        <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 16,color: "#FFF",textAlign: "center"}]}>{item.menuName} - Summary</Text>
                                      </View>
                                      <View style={{width: "8%"}}>
                                          <TouchableOpacity key={uuidv4()} onPress={() => deleteUserIngredientMenu(item.menuId)
                                                          .then((status) => getSummerizedUserIngredients().then((summerizedmenuingredient: any) => setSummerizedUserIngredients(summerizedmenuingredient)))}>
                                              {eEdit}
                                          </TouchableOpacity>
                                      </View>
                                  </View>
                              </View>
                              <View key={uuidv4()} style={[styles.menuIngredientContent, {width: "95%"}]}>
                                  <View key={uuidv4()} style={styles.rowContentContainer}>
                                        <View key={uuidv4()} style={{width: "37.5%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14,  textAlign: "right"}]}>Protein:</Text>
                                        </View>
                                        <View key={uuidv4()} style={{width: "10%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.Protein}</Text>
                                        </View>
                                        <View key={uuidv4()} style={{width: "37.5%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>Carbonhydrate:</Text>
                                        </View>
                                        <View key={uuidv4()} style={{width: "10%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.Carbonhydrate}</Text>
                                        </View>
                                  </View>
                                  <View key={uuidv4()} style={styles.rowContentContainer}>
                                        <View key={uuidv4()} style={{width: "37.5%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>Sugar:</Text>
                                        </View>
                                        <View key={uuidv4()} style={{width: "10%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.Sugar}</Text>
                                        </View>
                                        <View key={uuidv4()} style={{width: "37.5%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>Fat:</Text>
                                        </View>
                                        <View key={uuidv4()} style={{width: "10%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.Fat}</Text>
                                        </View>
                                  </View>
                                  <View key={uuidv4()} style={styles.rowContentContainer}>
                                        <View key={uuidv4()} style={{width: "37.5%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>Sodium:</Text>
                                        </View>
                                        <View key={uuidv4()} style={{width: "10%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.Sodium}</Text>
                                        </View>
                                        <View key={uuidv4()} style={{width: "37.5%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>Calcium:</Text>
                                        </View>
                                        <View key={uuidv4()} style={{width: "10%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.Calcium}</Text>
                                        </View>
                                  </View>
                                  <View key={uuidv4()} style={styles.rowContentContainer}>
                                        <View key={uuidv4()} style={{width: "37.5%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>Cholesterol:</Text>
                                        </View>
                                        <View key={uuidv4()} style={{width: "10%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.Cholesterol}</Text>
                                        </View>
                                        <View key={uuidv4()} style={{width: "37.5%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>Fibre:</Text>
                                        </View>
                                        <View key={uuidv4()} style={{width: "10%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.Fibre}</Text>
                                        </View>
                                  </View>
                                  <View key={uuidv4()} style={styles.rowContentContainer}>
                                        <View key={uuidv4()} style={{width: "37.5%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>SaturateFat:</Text>
                                        </View>
                                        <View key={uuidv4()} style={{width: "10%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.SaturateFat}</Text>
                                        </View>
                                        <View key={uuidv4()} style={{width: "37.5%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>TransFat:</Text>
                                        </View>
                                        <View key={uuidv4()} style={{width: "10%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.TransFat}</Text>
                                        </View>
                                  </View>
                                  <View key={uuidv4()} style={styles.rowContentContainer}>
                                        <View key={uuidv4()} style={{width: "37.5%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>Iron:</Text>
                                        </View>
                                        <View key={uuidv4()} style={{width: "10%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.Iron}</Text>
                                        </View>
                                        <View key={uuidv4()} style={{width: "37.5%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>Zinc:</Text>
                                        </View>
                                        <View key={uuidv4()} style={{width: "10%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.Zinc}</Text>
                                        </View>
                                  </View>
                                  <View key={uuidv4()} style={styles.rowContentContainer}>
                                        <View key={uuidv4()} style={{width: "37.5%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>Magnesium:</Text>
                                        </View>
                                        <View key={uuidv4()} style={{width: "10%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.Magnesium}</Text>
                                        </View>
                                        <View key={uuidv4()} style={{width: "37.5%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>Potasium:</Text>
                                        </View>
                                        <View key={uuidv4()} style={{width: "10%"}}>
                                            <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.Potasium}</Text>
                                        </View>
                                  </View>
                                  <View key={uuidv4()} style={[styles.footerContainer,{backgroundColor: "#C70039"}]}>
                                        <View key={uuidv4()} style={{width: "30%", backgroundColor: "#C70039", borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                                            <TouchableOpacity key={uuidv4()} onPress={() => getMenu(item.menuId).then((menu: any) => 
                                                                                                                        props.navigation.navigate('CreateMenu',
                                                                                                                                                        {"userId": menu[0].userId, 
                                                                                                                                                        "edit": true, 
                                                                                                                                                        "menu": menu[0]}))}
                                                                                                                                                        >
                                                <Text key={uuidv4()} style={[styles.textLabel, {marginRight: 10, fontSize: 15, color: "#FFF", textAlign: "right"}]}>More detail...</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View key={uuidv4()} style={{width: "40%", backgroundColor: "#C70039", borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                                          <Text key={uuidv4()} style={[styles.textLabel, {marginRight: 10, fontSize: 15, color: "#FFF", textAlign: "right"}]}>Calorie: {item.Calorie}</Text>
                                        </View>
                                  </View>
                              </View>
                        </View>
                        )
                  }  
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
    backgroundColor: '#FFF',
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
  menuIngredientContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: "95%",
    marginTop: 20
  },
  menuIngredientContent: {
    backgroundColor: "#F1EFEF",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  },
  rowContentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%"
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "95%",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  }
});

export default ListMenus;