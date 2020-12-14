
import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './pages/Login';
import Presentation from './pages/Presentation';
import Register from './pages/Register';
import Home from './pages/Home';
import Apointment from './pages/Apointment';
import Project from './pages/Project';
import NewProject from './pages/NewProject';
import Profile from './pages/Profile';
import { Entypo, Foundation, FontAwesome } from '@expo/vector-icons';
import Team from './pages/Teams';
import NewTeam from './pages/NewTeam';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff'
  },
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <Entypo name="stopwatch" size={size} color={color} />
          } else if (route.name === 'Apontamentos') {
            return <FontAwesome name="calendar" size={size} color={color} />
          } else if (route.name === 'Projetos') {
            return <Foundation name="clipboard-pencil" size={size} color={color} />
          } else if (route.name === 'Times') {
            return <FontAwesome name="users" size={size} color={color} />
          } else if (route.name === 'Perfil') {
            return <FontAwesome name="user" size={size} color={color} />
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Projetos" component={Project} />
      <Tab.Screen name="Apontamentos" component={Apointment} />
      <Tab.Screen name="Times" component={Team} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="Presentation">
        <Stack.Screen name="Presentation" component={Presentation} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Novo Projeto" component={NewProject} />
        <Stack.Screen name="Novo Time" component={NewTeam} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;