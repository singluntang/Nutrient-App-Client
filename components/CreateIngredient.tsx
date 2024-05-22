import React, { useState } from 'react';
import {TextInput, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { IngredientUnit, Ingredient } from '../model'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../utils/config'
import { Dropdown } from 'react-native-element-dropdown';
import { getIngredientUpdateCount } from "../utils/help"

interface Props {
    navigation: any,
    route: any,
  }

const CreateIngredient: React.FC<Props> = (props) => {

  const {edit, ingredient} = props.route.params
  const [unit, SetUnit] = useState<string>(edit ? ingredient.unitId : '');
  const [unitdata, SetUnitData] = useState<any[]>([]); 
  const [ingredientunits, SetIngredientUnits] = useState<IngredientUnit[]>([]); 
  
  const [ingredientCreated, SetIngredientCreated] = useState<Boolean>(false);
  const [validate, SetValidate] = useState<Boolean>(false);
  const [firstLoading, SetFirstLoading] = useState<Boolean>(true);
  const [tap, setTap] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  
  const [userId, SetUserId] = useState<string>(edit ? ingredient.userId : props.route.params.userId);
  const [ingredientId, SetIngredientId] = useState<string>(edit ? ingredient.ingredientId : uuidv4());
  const [ingredientname, SetIngredientName] = useState<string>(edit ? ingredient.ingredientName : '');
  const [portion, SetPortion] = useState<number>(edit ? Number(ingredient.ingredientPortion) : 0);

  const [calorie, setCalorie] = useState<number>(edit ? Number(ingredient.ingredientCalorie) : 0);
  const [protein, setProtein] = useState<number>(edit ? Number(ingredient.ingredientProtein) : 0);
  const [carbonhydrate, setCarbonhydrate] = useState<number>(edit ? Number(ingredient.ingredientCarbonhydrate) : 0);
  const [sugar, setSugar] = useState<number>(edit ? Number(ingredient.ingredientSugar) : 0);
  const [fat, setFat] = useState<number>(edit ? Number(ingredient.ingredientFat) : 0);
  const [sodium, setSodium] = useState<number>(edit ? Number(ingredient.ingredientSodium) : 0);

  const [calcium, setCalcium] = useState<number>(edit ? Number(ingredient.ingredientCalcium) : 0);
  const [cholesterol, setCholesterol] = useState<number>(edit ? Number(ingredient.ingredientCholesterol) : 0);
  const [fibre, setFibre] = useState<number>(edit ? Number(ingredient.ingredientFibre) : 0);
  const [saturateFat, setSaturateFat] = useState<number>(edit ? Number(ingredient.ingredientSaturateFat) : 0);
  const [transFat, setTransFat] = useState<number>(edit ? Number(ingredient.ingredientTransFat) : 0);
  const [iron, setIron] = useState<number>(edit ? Number(ingredient.ingredientIron) : 0);

  const [zinc, setZinc] = useState<number>(edit ? Number(ingredient.ingredientZinc) : 0);
  const [magnesium, setMagnesium] = useState<number>(edit ? Number(ingredient.ingredientMagnesium) : 0);
  const [potasium, setPotasium] = useState<number>(edit ? Number(ingredient.ingredientPotasium) : 0);

  const [remark, setRemark] = useState<number>(edit ? ingredient.ingredientRemark : '');
  const [updcount, setUpdCount] = useState<number>(edit ? Number(ingredient.updCount) : 0);
  const [createat, setCreateAt] = useState<number>(edit ? ingredient.createAt : '');

  const [errorMsg, setErrorMsg] = useState<string>('');

  const ValidateFields = async() => {
    if (ingredientname !== "" && ingredientname !== undefined){
      if (portion !== 0 && portion !== undefined){
          if(unit !== "" && unit !== undefined){
              SetValidate(true)
          }
          else{
              setErrorMsg("Validation Error - Unit should be selected!")
          }
      }
      else {
        setErrorMsg("Validation Error - Portion should not be zero!")
      }
    }
    else {
        setErrorMsg("Validation Error - Missing Required Fields")
    }
  }

  const CreateIngredient = () => {
    ValidateFields()
  }

  const onHandleUpdate = () => {

   return new Promise((resolve, reject) => {
        getIngredientUpdateCount(ingredientId, userId).then((count) => {
              if(count === updcount) {
                onHandleSubmit()
                .then(() => SetIngredientCreated(true))
              }
              else {
                resolve("Record Outdated, Please Refresh.")
              }
        })
      })
  }

 const onHandleSubmit = () => {
          const headers = {
            'Accept': 'application/json',
            'Authorization': Math.random().toString(36).substr(-8)
          }

          const ingredient: Ingredient = {
                "ingredientId": ingredientId,
                "userId": userId,
                "unitId": unit,
                "ingredientName": ingredientname,
                "ingredientPortion": (isNaN(portion)) ? 0 : Number(portion),
                "ingredientCalorie": (isNaN(calorie)) ? 0 : Number(calorie),
                "ingredientProtein": (isNaN(protein)) ? 0 : Number(protein),
                "ingredientCarbonhydrate": (isNaN(carbonhydrate)) ? 0 : Number(carbonhydrate),
                "ingredientSugar": (isNaN(sugar)) ? 0 : Number(sugar),
                "ingredientFat": (isNaN(fat)) ? 0 : Number(fat),
                "ingredientSodium": (isNaN(sodium)) ? 0 : Number(sodium),
                "ingredientCalcium": (isNaN(calcium)) ? 0 : Number(calcium),
                "ingredientCholesterol": (isNaN(cholesterol)) ? 0 : Number(cholesterol),
                "ingredientFibre": (isNaN(fibre)) ? 0 : Number(fibre),
                "ingredientSaturateFat": (isNaN(saturateFat)) ? 0 : Number(saturateFat),
                "ingredientTransFat": (isNaN(transFat)) ? 0 : Number(transFat),
                "ingredientIron": (isNaN(iron)) ? 0 : Number(iron),
                "ingredientZinc": (isNaN(zinc)) ? 0 : Number(zinc),
                "ingredientMagnesium": (isNaN(magnesium)) ? 0 : Number(magnesium),
                "ingredientPotasium": (isNaN(potasium)) ? 0 : Number(potasium),
                "ingredientRemark": "",
                "updCount": edit ? updcount + 1 : 0,
                "createAt": Date()
            }    

            if (!edit) {
                return new Promise((resolve, reject) => {
                      try {
                          fetch(`http://${config.apiAddress}:${config.apiPort}/create_userIngrdient`, {
                            method: 'POST',
                            headers: {
                              ...headers,
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(ingredient)
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
                          fetch(`http://${config.apiAddress}:${config.apiPort}/update_userIngrdient`, {
                            method: 'PATCH',
                            headers: {
                              ...headers,
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(ingredient)
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
        
        SetFirstLoading(false)

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

    const {edit, ingredients} = props.route.params

    // console.log("edit: ", edit)
    // console.log("Ingredients: ", ingredient)

    if (validate && !ingredientCreated) {
        if(edit){
          onHandleUpdate()
        }
        else {
          onHandleSubmit()
          .then(() => SetIngredientCreated(true))
        }
    }

    if (firstLoading) {
        try {
            LoadIngredientUnits()
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
  });

  return (
    <SafeAreaView style={styles.container}>
        {
          ingredientCreated && 
              (<View style={{marginTop: 30}}>
                  <Text style={[styles.textLabel,{color: '#3085C3'}]}>User Ingredient Successfully {edit ? "Edited" : "Created"}!</Text>
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
        <View style={styles.ingredientContainer}>
            <View style={{width: '35%'}}>
                <Text style={styles.textLabel}>Ingredient Name</Text>
            </View>
            <View  style={{width: '60%'}}>
                <TextInput
                    maxLength={100}
                    onChangeText={text => SetIngredientName(text)}
                    value={ingredientname}
                    style={[styles.input,{width: '100%'}]}
                    />                
            </View>        
        </View>
        <View style={styles.portionContainer}>
            <View style={{width: '35%'}}>
                <Text style={[styles.textLabel,{textAlign: "left"}]}>Portion</Text>
            </View>
            <View style={styles.Portion}>
                    <View  style={{width: '30%'}}>
                        <TextInput
                            maxLength={5}
                            onChangeText={text => SetPortion(checkNumeric(text))}
                            value={portion.toString()}
                            style={styles.input}
                            />                
                    </View> 
                    <View  style={{width: '60%'}}>
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
        </View>
        <View style={[styles.ingredientContent,{marginTop: 20}]}>
            <View style={styles.tapContainer}>
                <View style={styles.tapNutrient}>
                    <TouchableOpacity onPress={() => setTap(1)}>
                        <Text style={[styles.textLabel,{color: "#FFF"}]}>Nutrient</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.tapMicroNutrient}>
                    <TouchableOpacity onPress={() => setTap(2)}>
                        <Text style={[styles.textLabel,{color: "#FFF"}]}>MicroNutrient</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.Content}>
            {
              (tap === 1) && (
                <>
                  {
                    (page === 1) &&
                        (<View>
                          <View style={styles.tableRow}>
                              <View style={styles.RowLeft}>
                                  <View style={styles.tableRowLeftLabel}>
                                      <Text style={[styles.textLabel,{textAlign: 'right'}]}>Calorie</Text>
                                  </View>
                                  <View style={styles.tableRowLeftInput}>
                                      <TextInput
                                              maxLength={5}
                                              onChangeText={text => setCalorie(checkNumeric(text))}
                                              value={calorie.toString()}
                                              style={styles.input}
                                              />  
                                  </View>
                              </View>
                              <View style={styles.RowRight}>
                                  <View style={styles.tableRowRightLabel}>
                                      <Text style={[styles.textLabel,{textAlign: 'right'}]}>Protein</Text>
                                  </View>
                                  <View style={styles.tableRowRightInput}>
                                      <TextInput
                                              maxLength={5}
                                              onChangeText={text => setProtein(checkNumeric(text))}
                                              value={protein.toString()}
                                              style={styles.input}
                                              />  
                                  </View>
                              </View>                    
                          </View>
                          <View style={styles.tableRow}>
                              <View style={styles.RowLeft}>
                                  <View style={styles.tableRowLeftLabel}>
                                      <Text style={[styles.textLabel,{textAlign: 'right'}]}>Carbonhydrate</Text>
                                  </View>
                                  <View style={styles.tableRowLeftInput}>
                                      <TextInput
                                              maxLength={5}
                                              onChangeText={text => setCarbonhydrate(checkNumeric(text))}
                                              value={carbonhydrate.toString()}
                                              style={styles.input}
                                              />  
                                  </View>
                              </View>
                              <View style={styles.RowRight}>
                                  <View style={styles.tableRowRightLabel}>
                                      <Text style={[styles.textLabel,{textAlign: 'right'}]}>Sugar</Text>
                                  </View>
                                  <View style={styles.tableRowRightInput}>
                                      <TextInput
                                              maxLength={5}
                                              onChangeText={text => setSugar(checkNumeric(text))}
                                              value={sugar.toString()}
                                              style={styles.input}
                                              />  
                                  </View>
                              </View>                    
                          </View> 
                          <View style={styles.tableRow}>
                              <View style={styles.RowLeft}>
                                  <View style={styles.tableRowLeftLabel}>
                                      <Text style={[styles.textLabel,{textAlign: 'right'}]}>Fat</Text>
                                  </View>
                                  <View style={styles.tableRowLeftInput}>
                                      <TextInput
                                              maxLength={5}
                                              onChangeText={text => setFat(checkNumeric(text))}
                                              value={fat.toString()}
                                              style={styles.input}
                                              />  
                                  </View>
                              </View>
                              <View style={styles.RowRight}>
                                  <View style={styles.tableRowRightLabel}>
                                      <Text style={[styles.textLabel,{textAlign: 'right'}]}>Sodium</Text>
                                  </View>
                                  <View style={styles.tableRowRightInput}>
                                      <TextInput
                                              maxLength={5}
                                              onChangeText={text => setSodium(checkNumeric(text))}
                                              value={sodium.toString()}
                                              style={styles.input}
                                              />  
                                  </View>
                              </View>                    
                          </View>                                    
                        </View>)
                    }
                    {(page === 2) &&
                    (<View>
                      <View style={styles.tableRow}>
                          <View style={styles.RowLeft}>
                              <View style={styles.tableRowLeftLabel}>
                                  <Text style={[styles.textLabel,{textAlign: 'right'}]}>Calcium</Text>
                              </View>
                              <View style={styles.tableRowLeftInput}>
                                  <TextInput
                                          maxLength={5}
                                          onChangeText={text => setCalcium(checkNumeric(text))}
                                          value={calcium.toString()}
                                          style={styles.input}
                                          />  
                              </View>
                          </View>
                          <View style={styles.RowRight}>
                              <View style={styles.tableRowRightLabel}>
                                  <Text style={[styles.textLabel,{textAlign: 'right'}]}>Cholesterol</Text>
                              </View>
                              <View style={styles.tableRowRightInput}>
                                  <TextInput
                                          maxLength={5}
                                          onChangeText={text => setCholesterol(checkNumeric(text))}
                                          value={cholesterol.toString()}
                                          style={styles.input}
                                          />  
                              </View>
                          </View>                    
                      </View>
                      <View style={styles.tableRow}>
                          <View style={styles.RowLeft}>
                              <View style={styles.tableRowLeftLabel}>
                                  <Text style={[styles.textLabel,{textAlign: 'right'}]}>Fibre</Text>
                              </View>
                              <View style={styles.tableRowLeftInput}>
                                  <TextInput
                                          maxLength={5}
                                          onChangeText={text => setFibre(checkNumeric(text))}
                                          value={fibre.toString()}
                                          style={styles.input}
                                          />  
                              </View>
                          </View>
                          <View style={styles.RowRight}>
                              <View style={styles.tableRowRightLabel}>
                                  <Text style={[styles.textLabel,{textAlign: 'right'}]}>SaturateFat</Text>
                              </View>
                              <View style={styles.tableRowRightInput}>
                                  <TextInput
                                          maxLength={5}
                                          onChangeText={text => setSaturateFat(checkNumeric(text))}
                                          value={saturateFat.toString()}
                                          style={styles.input}
                                          />  
                              </View>
                          </View>                    
                      </View> 
                      <View style={styles.tableRow}>
                          <View style={styles.RowLeft}>
                              <View style={styles.tableRowLeftLabel}>
                                  <Text style={[styles.textLabel,{textAlign: 'right'}]}>TransFat</Text>
                              </View>
                              <View style={styles.tableRowLeftInput}>
                                  <TextInput
                                          maxLength={5}
                                          onChangeText={text => setTransFat(checkNumeric(text))}
                                          value={transFat.toString()}
                                          style={styles.input}
                                          />  
                              </View>
                          </View>
                          <View style={styles.RowRight}>
                              <View style={styles.tableRowRightLabel}>
                                  <Text style={[styles.textLabel,{textAlign: 'right'}]}>Iron</Text>
                              </View>
                              <View style={styles.tableRowRightInput}>
                                  <TextInput
                                          maxLength={5}
                                          onChangeText={text => setIron(checkNumeric(text))}
                                          value={iron.toString()}
                                          style={styles.input}
                                          />  
                              </View>
                          </View>                    
                      </View>                                    
                    </View>)                        
                    }
                   {(page === 3) &&
                    (<View>
                      <View style={styles.tableRow}>
                          <View style={styles.RowLeft}>
                              <View style={styles.tableRowLeftLabel}>
                                  <Text style={[styles.textLabel,{textAlign: 'right'}]}>Zinc</Text>
                              </View>
                              <View style={styles.tableRowLeftInput}>
                                  <TextInput
                                          maxLength={5}
                                          onChangeText={text => setZinc(checkNumeric(text))}
                                          value={zinc.toString()}
                                          style={styles.input}
                                          />  
                              </View>
                          </View>
                          <View style={styles.RowRight}>
                              <View style={styles.tableRowRightLabel}>
                                  <Text style={[styles.textLabel,{textAlign: 'right'}]}>Magnesium</Text>
                              </View>
                              <View style={styles.tableRowRightInput}>
                                  <TextInput
                                          maxLength={5}
                                          onChangeText={text => setMagnesium(checkNumeric(text))}
                                          value={magnesium.toString()}
                                          style={styles.input}
                                          />  
                              </View>
                          </View>                    
                      </View>
                      <View style={styles.tableRow}>
                          <View style={styles.RowLeft}>
                              <View style={styles.tableRowLeftLabel}>
                                  <Text style={[styles.textLabel,{textAlign: 'right'}]}>Potasium</Text>
                              </View>
                              <View style={styles.tableRowLeftInput}>
                                  <TextInput
                                          maxLength={5}
                                          onChangeText={text => setPotasium(checkNumeric(text))}
                                          value={potasium.toString()}
                                          style={styles.input}
                                          />  
                              </View>
                          </View>                    
                      </View>                                    
                    </View>)                        
                    }
                  <View style={styles.contol}>
                      <View style={{width: '20%'}}>
                        {(page > 1) ?
                          <TouchableOpacity onPress={() => setPage(page - 1)}>
                              <Text style={[styles.textLabel,{textAlign: 'center'}]}>Back</Text>
                          </TouchableOpacity>
                          :
                          <Text style={[styles.textLabel,{textAlign: 'center', color: "#B4B4B3"}]}>Back</Text>}
                      </View>
                      <View style={{width: '20%'}}>
                          <TouchableOpacity onPress={() => setPage(page + 1)}>
                              <Text style={[styles.textLabel,{textAlign: 'center'}]}>Next</Text>
                          </TouchableOpacity>
                      </View>
                  </View> 
                </>
              )
            }
            </View>
            <View style={styles.saveContainer}>
                <View style={{margin: 20}}>
                    {ingredientCreated ?
                        <View style={styles.buttonOff} >
                            <Text style={styles.buttonText}>Save</Text>
                        </View>
                        :
                        <TouchableOpacity style={styles.button} disabled={ingredientCreated ? true : false} onPress={() => CreateIngredient()}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity> 
                    }
                </View>
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
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: '#FFF',
  },
  ingredientContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
  },
  portionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
  },
  saveContainer:{
    width: "95%",
    backgroundColor: "#F0F0F0"
  },
  textLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000"
  },
  input: {
    height: 40,
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
  ingredientContent: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  tapContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '95%',
  },
  tapNutrient: {
    padding: 20,
    backgroundColor: '#6499E9',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tapMicroNutrient: {
    padding: 20,
    backgroundColor: '#6499E9',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginLeft:10,
  },
  Content: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '95%',
    backgroundColor: '#F0F0F0'
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  RowLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '53%'
  },
  RowRight: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '47%'
  },
  tableRowLeftLabel: {
    width: '51%'
  },
  tableRowLeftInput: {
    width: '2%'
  },
  tableRowRightLabel: {
    width: '44%'
  },
  tableRowRightInput: {
    width: '3%'
  },
  contol: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    margin: 20
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
  buttonOff: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7D7C7C',
    padding: 10,
    borderRadius: 10,    
  },
});


export default CreateIngredient;