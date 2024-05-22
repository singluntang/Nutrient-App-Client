import React, { useState } from 'react';
import {TextInput, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { IngredientUnit, Ingredient, Menu, UserMenuIngredient } from '../model'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../utils/config'
import { Dropdown } from 'react-native-element-dropdown';
import { getMenuUpdateCount } from "../utils/help"
import Entypo from 'react-native-vector-icons/Entypo';

interface Props {
    navigation: any,
    route: any,
  }

const CreateMenu: React.FC<Props> = (props) => {

  const eEdit = <Entypo name="cross" size={25} color="#FFFFFF" />;

  const {edit, menu} = props.route.params
  const [unit, SetUnit] = useState<string>('');
  const [ingredient, SetIngredient] = useState<string>('');
  const [ingredientdata, SetIngredientData] = useState<any[]>([]); 
  const [usermenuingredient, SetUserMenuIngredient] = useState<any[]>([]); 
  const [menuingredient, SetMenuIngredient] = useState<Ingredient[]>([]); 
  const [unitdata, SetUnitData] = useState<any[]>([]);
  const [ingredientunits, SetIngredientUnits] = useState<IngredientUnit[]>([]); 
  
  const [menuCreated, SetMenuCreated] = useState<Boolean>(false);
  const [validate, SetValidate] = useState<Boolean>(false);
  const [firstLoading, SetFirstLoading] = useState<Boolean>(true);
  
  const [userId, SetUserId] = useState<string>(edit ? menu.userId : props.route.params.userId);
  const [menuId, SetMenuId] = useState<string>(edit ? menu.menuId : uuidv4());
  const [menuname, SetMenuName] = useState<string>(edit ? menu.menuName : '');
  const [remark, setRemark] = useState<string>(edit ? menu.menuRemark : '');
  const [updCount, setUpdCount] = useState<number>(edit ? Number(menu.updCount) : 0);
  const [createat, setCreateAt] = useState<number>(edit ? menu.createAt : '');

  const [portion, SetPortion] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const ValidateFields = () => {
    if (menuname !== "" && menuname !== undefined){
        SetValidate(true)
    }
    else {
         setErrorMsg("Validation Error - Missing Required Fields!")
    }
  }

  const ValidateMenuIngredient = () => {

    if (ingredient !== "" && ingredient !== undefined){
      if (unit !== "" && unit !== undefined){
        if(portion !== 0 && portion !== undefined) {
           return true
        }
        else {
          setErrorMsg("Validation Error - Portion should not be zero!")
        }
      }
      else
      {
          setErrorMsg("Validation Error - Unit should be Selected!")
      }
    }
    else {
         setErrorMsg("Validation Error - Ingredient should be Selected!")
    }
    return false
  }

  const HandleMenu = () => {
    ValidateFields()
  }

  const deleteMenuIngredient = (menuId: string, ingredientId: string) => {
    const headers = {
      'Accept': 'application/json',
      'Authorization': uuidv4().toString(36).substr(-8)
    }

    return new Promise((resolve, reject) => {

              try {
                  fetch(`http://${config.apiAddress}:${config.apiPort}/delete_MenuIngredient?ingredientId=${ingredientId}&menuId=${menuId}&userId=${props.route.params.userId.toLowerCase().trimEnd()}`
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

const onHandleUpdate = () => {

  return new Promise((resolve, reject) => {
      getMenuUpdateCount(menuId).then((count) => {
            if(count === updCount) {
              onHandleMenuSubmit()
              .then(() => SetMenuCreated(true))
            }
            else {
              resolve("Record Outdated, Please Refresh.")
            }
      })
    })
}

const onHandleUserMenuIngredientSubmit = () => {

    const headers = {
      'Accept': 'application/json',
      'Authorization': Math.random().toString(36).substr(-8)
    }

    const usermenuingredient: UserMenuIngredient = {
          "menuId": menuId,
          "ingredientId": ingredient,
          "userId": userId,
          "unitId": unit,
          "menuPortion": portion,
          "menuRemark": remark,
          "updCount": edit ? updCount + 1 : 0,
          "createAt": Date()
      }    

      return new Promise((resolve, reject) => {
                try {
                    fetch(`http://${config.apiAddress}:${config.apiPort}/create_usermenuingredient`, {
                      method: 'POST',
                      headers: {
                        ...headers,
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(usermenuingredient)
                    }).then(res => {
                      if (res.status !== 201) {
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

 const onHandleMenuSubmit = () => {
          const headers = {
            'Accept': 'application/json',
            'Authorization': Math.random().toString(36).substr(-8)
          }

          const menu: Menu = {
                "menuId": menuId,
                "userId": userId,
                "menuName": menuname,
                "menuRemark": remark,
                "updCount": edit ? updCount + 1 : 0,
                "createAt": Date()
            }    

            if (!edit) {
                return new Promise((resolve, reject) => {
                      try {
                          fetch(`http://${config.apiAddress}:${config.apiPort}/create_menu`, {
                            method: 'POST',
                            headers: {
                              ...headers,
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(menu)
                          }).then(res => {
                            if (res.status !== 201) {
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
                else{
                    return new Promise((resolve, reject) => {
                      try {
                          fetch(`http://${config.apiAddress}:${config.apiPort}/update_menu`, {
                            method: 'PATCH',
                            headers: {
                              ...headers,
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(menu)
                          }).then(res => {
                            if (res.status !== 201) {
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
      }

const LoadUserMenuIngredients = async () => {

  const headers = {
      'Accept': 'application/json',
      'Authorization': Math.random().toString(36).substr(-8)
    }

    await new Promise((resolve, reject) => {
      try {
          fetch(`http://${config.apiAddress}:${config.apiPort}/get_calculateduserIngredients?userId=${props.route.params.userId.toLowerCase().trimEnd()}&menuId=${menuId}`, { headers })
          .then(res => res.json())
          .then((data: any[]) => {
            SetUserMenuIngredient(data)           
          })
          .then(() => {
              SetIngredientData(ingredientdata.filter((item: any) => item.value !== ingredient)) 
          })
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

const LoadIngredientUnits = async () => {

    const headers = {
        'Accept': 'application/json',
        'Authorization': Math.random().toString(36).substr(-8)
      }

      await new Promise((resolve, reject) => {
        try {
            fetch(`http://${config.apiAddress}:${config.apiPort}/get_ingredientunit`, { headers })
            .then(res => res.json())
            .then((data: IngredientUnit[]) => {
                SetIngredientUnits(data)           
            })
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

  const LoadIngredient = async () => {

    const headers = {
        'Accept': 'application/json',
        'Authorization': Math.random().toString(36).substr(-8)
      }

      await new Promise((resolve, reject) => {
        try {
            fetch(`http://${config.apiAddress}:${config.apiPort}/get_userIngredients?userId=${props.route.params.userId.toLowerCase().trimEnd()}`, { headers })
            .then(res => res.json())
            .then(data => {
              if (data.length === 0) {
                resolve([])
              }
              return data
            })
            .then((ingredient: any) => {        
                SetMenuIngredient(ingredient)
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

  const LoadNotSelectedIngredient = async () => {

    const headers = {
        'Accept': 'application/json',
        'Authorization': Math.random().toString(36).substr(-8)
      }

      await new Promise((resolve, reject) => {
        try {
            fetch(`http://${config.apiAddress}:${config.apiPort}/get_notselecteduserIngredients?userId=${props.route.params.userId.toLowerCase().trimEnd()}&menuId=${menuId}`, { headers })
            .then(res => res.json())
            .then(data => {
              if (data.length === 0) {
                resolve([])
              }
              return data
            })
            .then((ingredient: any) => {        
                SetMenuIngredient(ingredient)
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

  const checkNumeric = (text: any) => {
      if(!isNaN(text)){
        return text
      }
      else {
        return 0
      }
  }


  React.useEffect(() => {

    if (validate && !menuCreated) {
        if(edit){
          onHandleUpdate()
          .then((errorMsg: any) => setErrorMsg(errorMsg))
        }
        else {
          onHandleMenuSubmit()
          .then(() => SetMenuCreated(true))
        }
    }

    if (firstLoading) {
        try {
            if(edit){
              LoadUserMenuIngredients()
            } 
            LoadIngredientUnits()

            if(edit){
              LoadNotSelectedIngredient().then(() => SetFirstLoading(false)) 
            }
            else{
              LoadIngredient().then(() => SetFirstLoading(false))
            }  
        }
        catch (err: unknown) {
            if (typeof err === "string") {
                console.log(err.toUpperCase())
            } else if (err instanceof Error) {
                console.log(err.message)
            }
        }       
    }
    
    if(!firstLoading && unitdata.length === 0) {    
        let dataUnit: any = []; 
        dataUnit = ingredientunits.map(unit => 
            [{
                "label": unit.unitName, "value": unit.unitId
            }]
        ) 
        if (dataUnit.length > 0) { 
          SetUnitData(dataUnit.map((unit: any) => unit[0])) 
        }
    }

    if(!firstLoading && ingredientdata.length === 0) {    
        let dataIngredient: any = []; 

        dataIngredient = menuingredient.map(ingredient => 
            [{
                "label": ingredient.ingredientName, "value": ingredient.ingredientId
            }]
        )
        
        if (dataIngredient.length > 0) { 
          SetIngredientData(dataIngredient.map((ingredient: any) => ingredient[0])) 
        }
    }


    // console.log("createmenu Menu updCount: ", updCount)
  });

  return (
    <ScrollView>
        <SafeAreaView style={styles.container}>
            {
              menuCreated && 
                  (<View style={{marginTop: 30}}>
                      <Text style={[styles.textLabel,{color: '#3085C3'}]}>User Menu Successfully {edit ? "Edited" : "Created"}!</Text>
                  </View>)
            }
            {
              (errorMsg !== "" && errorMsg !== undefined) && 
                  (
                    <View style={{marginTop: 30}}>
                        <Text style={[styles.textLabel,{color: '#C70039'}]}>{errorMsg}</Text>
                    </View>
                  )
            } 
            <View style={[styles.menuContainer,menuCreated && styles.disabled]}>
                <View style={{width: '35%'}}>
                    <Text style={styles.textLabel}>Menu Name</Text>
                </View>
                <View  style={{width: '60%'}}>
                    <TextInput
                        maxLength={100}
                        onChangeText={text => SetMenuName(text)}
                        value={menuname}
                        style={[styles.input,{width: '100%'}]}
                        />                
                </View>        
            </View>
            <View style={[styles.remarkContainer,menuCreated && styles.disabled]}>
                <View style={{width: '35%'}}>
                    <Text style={[styles.textLabel,{textAlign: "left"}]}>Remark</Text>
                </View>
                <View  style={{width: '60%'}}>
                    <TextInput
                        maxLength={200}
                        multiline = {true}
                        numberOfLines = {4}
                        onChangeText={text => setRemark(text)}
                        value={remark}
                        style={[styles.input,{width: '100%'}]}
                        />                
                </View>            
            </View>
            <View style={styles.saveContainer}>
                  <View style={{margin: 20}}>
                      {menuCreated ?
                          <View style={styles.buttonOff} >
                              <Text style={styles.buttonText}>Save</Text>
                          </View>
                          :
                          <TouchableOpacity style={styles.button} disabled={menuCreated ? true : false} onPress={() => HandleMenu()}>
                              <Text style={styles.buttonText}>Save</Text>
                          </TouchableOpacity> 
                      }
                  </View>
            </View>
                <View style={[{width: '90%', backgroundColor: "#AED2FF", borderTopLeftRadius: 10, borderTopRightRadius: 10},edit ? styles.enabled : (!menuCreated ? styles.disabled : styles.enabled)]}>
                                <Dropdown
                                    data={ingredientdata}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    value={ingredient}
                                    style={{width: "80%", alignSelf: "center"}}
                                    onChange={item => {
                                        SetIngredient(item.value);
                                    }}
                                />
                </View>
                <View style={[styles.ingredientContainer,{backgroundColor: "#AED2FF"}, edit ? styles.enabled : (!menuCreated ? styles.disabled : styles.enabled)]}>
                    <View style={{width: '15%'}}>
                        <Text style={styles.textLabel}>Portion:</Text> 
                    </View>
                    <View style={{width: '30%'}}>
                        <TextInput
                                maxLength={5}
                                onChangeText={text => SetPortion(checkNumeric(text))}
                                value={portion.toString()}
                                style={[styles.input,{width: 80}]}
                        />                    
                    </View>
                    <View style={{width: '35%'}}>
                                <Dropdown
                                    data={unitdata}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    value={unit}
                                    onChange={item => {
                                        SetUnit(item.value);
                                    }}
                                />
                    </View> 
                </View>
                <View style={[{padding: 15, width: "90%", backgroundColor: "#AED2FF", borderBottomLeftRadius: 8, borderBottomRightRadius: 8},edit ? styles.enabled : (!menuCreated ? styles.disabled : styles.enabled)]}>
                        <TouchableOpacity style={[styles.button, {width: "60%", alignSelf: "center"}]}
                        onPress={() => ValidateMenuIngredient() && onHandleUserMenuIngredientSubmit().then((status) => status && LoadUserMenuIngredients())}>
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity> 
                </View>

              {usermenuingredient.map(item => 
                <View key={uuidv4()} style={styles.menuIngredientContainer}>
                      <View key={uuidv4()}  style={styles.header}>
                          <View style={{width: "87%"}}>
                              <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 16,color: "#FFF",textAlign: "center"}]}>{item.ingredientName} - Portion {item.menuPortion} {item.unitName}</Text>
                          </View>
                          <View style={{width: "8%"}}>
                                          <TouchableOpacity key={uuidv4()} onPress={() => deleteMenuIngredient(item.menuId, item.ingredientId)
                                                          .then((status: any) => status && LoadUserMenuIngredients())}>
                                              {eEdit}
                                          </TouchableOpacity>
                          </View>
                      </View>
                      <View key={uuidv4()} style={[styles.menuIngredientContent, {width: "90%"}]}>
                          <View key={uuidv4()} style={styles.rowContentContainer}>
                                <View key={uuidv4()} style={{width: "35%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14,  textAlign: "right"}]}>Protein:</Text>
                                </View>
                                <View key={uuidv4()} style={{width: "10%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.Protein}</Text>
                                </View>
                                <View key={uuidv4()} style={{width: "35%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>Carbonhydrate:</Text>
                                </View>
                                <View key={uuidv4()} style={{width: "10%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.Carbonhydrate}</Text>
                                </View>
                          </View>
                          <View key={uuidv4()} style={styles.rowContentContainer}>
                                <View key={uuidv4()} style={{width: "35%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>Sugar:</Text>
                                </View>
                                <View key={uuidv4()} style={{width: "10%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.Sugar}</Text>
                                </View>
                                <View key={uuidv4()} style={{width: "35%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>Fat:</Text>
                                </View>
                                <View key={uuidv4()} style={{width: "10%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.Fat}</Text>
                                </View>
                          </View>
                          <View key={uuidv4()} style={styles.rowContentContainer}>
                                <View key={uuidv4()} style={{width: "35%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>Sodium:</Text>
                                </View>
                                <View key={uuidv4()} style={{width: "10%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.Sodium}</Text>
                                </View>
                                <View key={uuidv4()} style={{width: "35%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>Calcium:</Text>
                                </View>
                                <View key={uuidv4()} style={{width: "10%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.Calcium}</Text>
                                </View>
                          </View>
                          <View key={uuidv4()} style={styles.rowContentContainer}>
                                <View key={uuidv4()} style={{width: "35%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>Cholesterol:</Text>
                                </View>
                                <View key={uuidv4()} style={{width: "10%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.Cholesterol}</Text>
                                </View>
                                <View key={uuidv4()} style={{width: "35%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>Fibre:</Text>
                                </View>
                                <View key={uuidv4()} style={{width: "10%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.Fibre}</Text>
                                </View>
                          </View>
                          <View key={uuidv4()} style={styles.rowContentContainer}>
                                <View key={uuidv4()} style={{width: "35%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>SaturateFat:</Text>
                                </View>
                                <View key={uuidv4()} style={{width: "10%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.SaturateFat}</Text>
                                </View>
                                <View key={uuidv4()} style={{width: "35%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>TransFat:</Text>
                                </View>
                                <View key={uuidv4()} style={{width: "10%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.TransFat}</Text>
                                </View>
                          </View>
                          <View key={uuidv4()} style={styles.rowContentContainer}>
                                <View key={uuidv4()} style={{width: "35%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>Iron:</Text>
                                </View>
                                <View key={uuidv4()} style={{width: "10%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.Iron}</Text>
                                </View>
                                <View key={uuidv4()} style={{width: "35%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>Zinc:</Text>
                                </View>
                                <View key={uuidv4()} style={{width: "10%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.Zinc}</Text>
                                </View>
                          </View>
                          <View key={uuidv4()} style={styles.rowContentContainer}>
                                <View key={uuidv4()} style={{width: "35%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>Magnesium:</Text>
                                </View>
                                <View key={uuidv4()} style={{width: "10%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.Magnesium}</Text>
                                </View>
                                <View key={uuidv4()} style={{width: "35%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>Potasium:</Text>
                                </View>
                                <View key={uuidv4()} style={{width: "10%"}}>
                                    <Text key={uuidv4()} style={[styles.textLabel, {fontSize: 14, textAlign: "right"}]}>{item.Potasium}</Text>
                                </View>
                          </View>
                          <View key={uuidv4()} style={{width: "100%", backgroundColor: "#6499E9", borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                              <Text key={uuidv4()} style={[styles.textLabel, {marginRight: 10, fontSize: 14, color: "#FFF", textAlign: "right"}]}>Calorie: {item.Calorie}</Text>
                          </View>
                      </View>
                </View>
                )
              }                
        </SafeAreaView>
    </ScrollView>
  );
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
  menuContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
  },
  remarkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
  },
  ingredientContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  saveContainer:{
    width: "95%",
  },
  textLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000"
  },
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 45,
  },
  Portion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%'
  },
  buttonOff: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7D7C7C',
    padding: 10,
    borderRadius: 10,    
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000"
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6499E9',
    padding: 10,
    borderRadius: 10,    
  },
  menuIngredientContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: "95%",
    marginTop: 20
  },
  disabled: {
    pointerEvents: "none",
    opacity: 0.3
  },
  enabled: {
    pointerEvents: "auto",
    opacity: 1
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
    width: "90%", 
    backgroundColor: "#6499E9", 
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10,
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});


export default CreateMenu;