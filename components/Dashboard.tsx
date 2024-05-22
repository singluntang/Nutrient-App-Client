import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Props {
                  navigation: any,
                  route: any,
                }

const Dashboard: React.FC<Props> = (props) => {

  const IconMenuBook = () => <Icon name="menu-book" size={90} color="#C70039" />;
  const IconRestaurant = () => <Icon name="restaurant-menu" size={90} color="#C70039" />;
  const McIconsClipBoard = () => <MaterialCommunityIcons name="clipboard-list-outline" size={90} color="#C70039" />;
  const FaListAlt = () => <FontAwesome name="list-alt" size={90} color="#C70039" />; 

  React.useEffect(() => {

  });

  return (
    <SafeAreaView style={styles.container}> 
        <View>
            <Text style={[styles.textLabel,{color: '#3085C3'}]}>Welcome {props.route.params.user[0].userName}!</Text>
        </View>
        <View style={styles.UpperContainer}>
            <View style={styles.UpperLeft}>
                <View>                 
                    <TouchableOpacity onPress={() => props.navigation.navigate('CreateIngredient',{userId: props.route.params.user[0].userId,edit: false})}>
                          <IconMenuBook />
                    </TouchableOpacity>              
                </View>
                <View>
                      <Text style={styles.textLabel}>Create Ingredients</Text>
                </View>
            </View>
            <View style={styles.UpperRight}>
                <View>
                    <TouchableOpacity onPress={() => props.navigation.navigate('CreateMenu',{userId: props.route.params.user[0].userId,edit: false})}>
                          <IconRestaurant />
                    </TouchableOpacity>
                </View>
                <View>
                      <Text style={styles.textLabel}>Create Menu</Text>
                </View>    
            </View>
        </View>
        <View style={styles.LowerContainer}>
            <View style={styles.LowerLeft}>
                <View>
                  <TouchableOpacity onPress={() => props.navigation.navigate('ListIngredients',{user: props.route.params.user})}>
                      <McIconsClipBoard/>
                  </TouchableOpacity>
                </View>
                <View>
                      <Text style={styles.textLabel}>List Ingredients</Text>
                </View>
            </View>
            <View style={styles.LowerRight}>
                <View>
                  <TouchableOpacity onPress={() => props.navigation.navigate('ListMenus',{userId: props.route.params.user[0].userId})}>
                        <FaListAlt />
                  </TouchableOpacity>
                </View>
                <View>
                      <Text style={styles.textLabel}>List Menus</Text>
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
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#FFF',
  },
  UpperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    width: '95%', 
    padding: 30,  
  },
  LowerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%', 
    padding: 30, 
  },  
  UpperLeft: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    borderColor:'#000', 
    elevation: 3,
    padding: 20,
  },  
  UpperRight: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    borderColor:'#000',
    elevation: 3,
    padding: 20,
  },
  LowerLeft: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    borderColor:'#000',
    elevation: 3,
    padding: 20,
  },  
  LowerRight: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    borderColor:'#000',
    elevation: 3,
    padding: 20,
  },
  textLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#C70039",
    textAlign: 'center'
  },
});


export default Dashboard;