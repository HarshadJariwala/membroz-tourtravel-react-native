import changeNavigationBarColor from "react-native-navigation-bar-color";
import NavigationApp from "./src/navigation/navigation";
import * as COLOR from "./src/styles/colors";
import React from "react";

const App = () => {

  //SET BOTTOM TAB NAVIGATION
  AppBootomNavigationColor();
  return (
    <NavigationApp />
  )
}

const AppBootomNavigationColor = async () => {
  try {
    const response = await changeNavigationBarColor(COLOR.BLACK);
    console.log(response);//{success: true}
  } catch (e) {
    console.log(e) // {success : false}
  }
};

export default App;